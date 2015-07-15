Ext.define('App.view.user.test.PanelTestC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panelTest',
    /*onLaunch: function () {
     var me = this;
     var storeCard = Ext.data.StoreManager.lookup('user.CardS');
     // * старт показа вопросов после генерации билета
     storeCard.on('load', me.onStoreCardLoad, me);
     },*/
    control: {
        '#': {},
        '#comboExam': {
            select: function (combo, records, eOpts) {
                console.log('comboExam');
                /* 1. Статус: подана заявка
                 *  2. Задание: опрос на предмет регистрации
                 *  3. Очистка панели Прогресс и Билет prepareForTest
                 * */
                // * очистим панель Прогресс
                var panelTest = this.getView(),
                    panelProgress = panelTest.down('#panelProgress'),
                    counter = new this.answerCounter();
                panelProgress.query('displayfield').forEach(function (item) {
                    if (item.xtype == 'displayfield') {
                        if (item.fieldLabel == "Времени на тест"
                            || item.fieldLabel == "Времени на вопрос"
                            || item.fieldLabel == "Вопрос"
                            || item.fieldLabel == "Результат"
                            || item.fieldLabel == "Ответ") {
                            item.reset();
                        } else {
                            panelProgress.remove(item, true);
                        }
                    }
                });
                // * очистим панель Билет от старого билета
                var panelCard = panelTest.down('#panelCard'),
                    questionAccordion = panelCard.down('#questionAccordion'),
                    question = questionAccordion.down('#question'),
                    answerAccordion = panelCard.down('#answerAccordion');
                question.reset();
                questionAccordion.setTitle('Вопрос');
                answerAccordion.query('radiofield').forEach(function (item) {
                    if (item.xtype == 'radio') {
                        answerAccordion.remove(item, true);
                    }
                });
                var examid = combo.getValue();
                var taskRegStatus = {
                    run: function () {
                        var comboExam = Ext.ComponentQuery.query('#comboExam')[0],
                            examid = comboExam.getValue();
                        Ext.Ajax.request({
                            url: 'resources/php/user/getRegStatus.php?examid=' + examid,
                            success: function (response, options) {
                                var resp = Ext.decode(response.responseText),
                                    cnt = resp.cnt;
                                if (cnt == 1) {
                                    var textStatus = Ext.ComponentQuery.query('#textStatus')[0],
                                        buttonStartTest = Ext.ComponentQuery.query('#startTest')[0];
                                    textStatus.setValue(App.util.Utilities.regString);
                                    textStatus.setFieldStyle(App.util.Utilities.colorStatusTextReg);
                                    Ext.TaskManager.stop(taskRegStatus);
                                    //comboExam.setReadOnly(true);
                                    buttonStartTest.enable();
                                }
                            },
                            failure: function () {
                                Ext.MessageBox.show({
                                    title: 'Ошибка',
                                    msg: 'Не удалось проверить статус заявки на регистрацию',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        });
                    },
                    interval: 1000 * panelTest.regstatint, // в секундах
                    duration: 1000 * 60 * panelTest.regstatdur,
                    scope: this
                };
                Ext.Ajax.request({
                    url: 'resources/php/user/setExam.php?examid=' + examid,
                    success: function (response, options) {
                        var textStatus = panelTest.down('#textStatus');
                        textStatus.setValue(App.util.Utilities.unregString);
                        textStatus.setFieldStyle(App.util.Utilities.colorStatusTextUnreg);
                        Ext.TaskManager.start(taskRegStatus);
                    },
                    failure: function () {
                        App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Не удалось подать заявку на регистрацию');
                    },
                    scope: this
                });
            },
            specialkey: function (combo, e) {
                if (e.getKey() == e.DELETE && combo.readOnly == false) {
                    combo.reset();
                    var textStatus = combo.up('panelTest').down('#textStatus'),
                        buttonStartTest = combo.up('panelTest').down('#startTest');
                    textStatus.reset();
                    buttonStartTest.disable();
                }
            }
        },
        'button[action=starttest]': {
            click: function (button) {
                console.log('action=starttest');

                var panelTest = this.getView(),
                    vmPanelTest = panelTest.getViewModel(),
                    comboExam = panelTest.down('#comboExam'),
                    examid = comboExam.getValue(),
                    me = this;

                // * установка начальных значений
                panelTest.rightAnswersAmount = 0;
                panelTest.passed = false;
                panelTest.questionNumber = 0;
                panelTest.examTimerMin = 0;
                panelTest.examTimerQuestionMin = 0;
                panelTest.setOuterCount();
                panelTest.maxquestion = Utilities.getTool('maxquestion');
                panelTest.minquestion = Utilities.getTool('minquestion');
                panelTest.examTimerMin = Utilities.getTool('examtimermin');
                panelTest.regstatint = Utilities.getTool('regstatint');
                panelTest.regstatdur = Utilities.getTool('regstatdur');
                // * проверить, что экзамен еще не пройден
                Ext.Ajax.request({
                    url: 'resources/php/user/getExam.php?examid=' + examid,
                    success: function (response, options) {
                        var respGetExam = Ext.decode(response.responseText),
                            cnt = respGetExam.cnt;
                        if (cnt != 0) {
                            App.util.Utilities.infoMessage('Внимание', 'Нельзя повторно проходить один и тот же экзамен');
                        } else {
                            // * проверим не снята ли регистрация
                            Ext.Ajax.request({
                                url: 'resources/php/user/getRegStatus.php?examid=' + examid,
                                success: function (response, options) {
                                    var resp = Ext.decode(response.responseText),
                                        cnt = resp.cnt,
                                        timelimit = resp.timelimit;
                                    if (cnt != 0) { // * старт теста
                                        // * генерация билета
                                        var storeCard = panelTest.getViewModel().getStore('card'),
                                            buttonNextQuestion = panelTest.down('#nextQuestion');
                                        buttonNextQuestion.enable();
                                        // * показ вопросов на событие load в storeCard
                                        storeCard.clearFilter();

                                        // * приоритет у глобальных настроек времени экзамена перед Видами деятельности
                                        // * лимит времени по тесту
                                        if (panelTest.examTimerMin == 0)
                                            panelTest.examTimerMin = timelimit;
                                        // * лимит времени по одному вопросу = всего времени / общее число вопросов в билете
                                        panelTest.examTimerQuestionMin = panelTest.examTimerMin / panelTest.maxquestion;
                                        // storeCard.load({params: {examid: examid}});
                                        storeCard.load({
                                            params: {examid: examid},
                                            callback: function (records, operation, success) {
                                                if (success == true) {
                                                    if (records.length > 0) {
                                                        comboExam.setReadOnly(true);
                                                        me.onStoreCardLoad(storeCard);
                                                    } else {
                                                        App.util.Utilities.errorMessage('Ошибка', 'Билет не сформирован: не достаточно вопросов');
                                                    }
                                                } else {
                                                    App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Билет не получен');
                                                }
                                            }
                                        });
                                        vmPanelTest.set({
                                            correct: -1
                                        });
                                    } else {
                                        var textStatus = panelTest.down('#textStatus'),
                                            buttonStartTest = panelTest.down('#startTest');
                                        textStatus.reset();
                                        textStatus.setFieldStyle(App.util.Utilities.colorStatusTextUnreg);
                                        comboExam.setReadOnly(false);
                                        comboExam.reset();
                                        buttonStartTest.disable();
                                        App.util.Utilities.infoMessage('Внимание', 'Вы не зарегистрированы на экзамен');
                                    }
                                },
                                failure: function () {
                                    App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Ошибка проверки статуса регистрации');
                                },
                                scope: this
                            });
                        }
                    },
                    failure: function (response) {
                        App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Ошибка проверки повторного прохождения экзамена');
                    },
                    scope: this
                });
            }
        },
        'button[action=nextquestion]': {
            click: function (button) {
                console.log('action=nextquestion');

                var panelTest = this.getView(),
                    vmTest = panelTest.getViewModel(),
                    panelCard = panelTest.down('#panelCard'),
                    panelProgress = panelTest.down('#panelProgress'),
                    rownum = panelTest.questionNumber,
                    answerAccordion = panelTest.down('#answerAccordion'),
                    arrayAnswers = answerAccordion.query('radiofield'),
                    storeCard = panelTest.getViewModel().getStore('card'),
                    questionRec = storeCard.findRecord('rownum', rownum, 0, false, true, true),
                    answerText = 'нет ответа',
                    buttonNextQuestion = panelTest.down('#nextQuestion'),
                    checkedAnswerId,
                    correct = 0;
                if (questionRec) {
                    var questionId = storeCard.findRecord('rownum', rownum, 0, false, true, true).get('questionid'),
                        questionText = storeCard.findRecord('rownum', rownum, 0, false, true, true).get('questiontext');
                    panelTest.outerIncrement();
                    var answerId = 'userAnswer' + panelTest.getOuterCount();
                    var textAnswer = Ext.create('Ext.form.field.Display', {
                        labelWidth: 130,
                        myCustomText: '<ins>Вопрос:</ins> ' + questionText, // * текст вопроса во всплывающей подсказке
                        id: answerId
                    });
                    buttonNextQuestion.setDisabled(true);
                    // * проверим правильность ответа
                    function getCheckedAnswer(element, index, array) {
                        if (element.checked)
                            checkedAnswerId = element.inputValue;
                    }

                    arrayAnswers.forEach(getCheckedAnswer);
                    this.checkAnswer(checkedAnswerId, questionId);

                    //if (checkedAnswerId) {
                    function findRecordAnswer(rec, id) {
                        if (rec.get('rownum') == rownum &&
                            rec.get('answerid') == checkedAnswerId) {
                            return true;
                        }
                    }

                    var checkedAnswerIndex = storeCard.findBy(findRecordAnswer);
                    if (checkedAnswerIndex != -1) {
                        var checkedAnswerRec = storeCard.getAt(checkedAnswerIndex);
                        correct = vmTest.get('correct');
                        answerText = checkedAnswerRec.get('answertext');
                    }
                    textAnswer.myCustomText = textAnswer.myCustomText + '<br><ins>Ответ:</ins> ' + answerText;
                    // * сохраним результат
                    this.saveResult(questionId, checkedAnswerId);
                    panelProgress.insert(rownum + 4, textAnswer);
                    textAnswer.setFieldLabel(textAnswer.getFieldLabel() + ' №' + rownum);
                    // * прогресс - ответ
                    if (correct == 1) {
                        panelTest.rightAnswersAmount++;
                        textAnswer.setValue(App.util.Utilities.correctString);
                        textAnswer.setFieldStyle(App.util.Utilities.colorStatusTextReg);
                    } else {
                        textAnswer.setValue(App.util.Utilities.uncorrectString);
                        textAnswer.setFieldStyle(App.util.Utilities.colorStatusTextUnreg);
                    }
                    // * отсроченный показ следующего билета
                    this.showNextQuestion(buttonNextQuestion);
                    App.util.Utilities.runnerExamTestQuestion.stopAll();
                    this.runTimerQuestion();
                    //}
                }
            }
        },
        '#refreshComboExam': {
            /* 1. Если комбо Экзамены заблокирован, то проверяем, не снята ли регистрация администратором
             2. Если не заблокирован, то обновим его стор
             * */
            click: function (button) {
                var panelTest = this.getView(),
                    comboExam = panelTest.down('#comboExam'),
                    textStatus = panelTest.down('#textStatus'),
                    examid = comboExam.getValue(),
                    storeCard = panelTest.getViewModel().getStore('card'),
                    textStatus = panelTest.down('#textStatus'),
                    buttonStartTest = panelTest.down('#startTest'),
                    buttonNextQuestion = panelTest.down('#nextQuestion');
                // * обновлять можно только если не сформиррован билет- т.е. не идет экзамен
                if (storeCard.getCount() == 0) {
                    comboExam.reset();
                    comboExam.setReadOnly(false);
                    buttonStartTest.disable();
                    buttonNextQuestion.disable();
                    comboExam.store.load({
                        params: {
                            testMode: 1
                        },
                        callback: function (records, operation, success) {
                            if (success == true) {
                                if (records.length > 0) {
                                    var recordSelected = comboExam.getStore().getAt(0);
                                    Ext.defer(function () {
                                        comboExam.setSelection(recordSelected);
                                    }, 100);
                                }
                            } else {
                                App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Доступные зкзамены не получены');
                            }
                        }
                    });
                    textStatus.reset();
                } else {
                    // * проверим не снята ли регистрация
                    Ext.Ajax.request({
                        url: 'resources/php/user/getRegStatus.php?examid=' + examid,
                        success: function (response, options) {
                            var resp = Ext.decode(response.responseText),
                                cnt = resp.cnt;
                            if (cnt == 0) {
                                textStatus.reset();
                                textStatus.setFieldStyle(App.util.Utilities.colorStatusTextUnreg);
                                comboExam.setReadOnly(false);
                                comboExam.reset();
                                buttonStartTest.disable();
                                buttonNextQuestion.enable();
                                App.util.Utilities.infoMessage('Внимание', 'Вы не зарегистрированы на экзамен');
                            }
                        },
                        failure: function () {
                            App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Ошибка проверки статуса регистрации');
                        },
                        scope: this
                    });
                }
            }
        },
        '#panelCard #answerAccordion radiofield': {
            change: function (radio, newValue, oldValue, eOpts) {
                var panelTest = this.getView(),
                    buttonNextQuestion = panelTest.down('#nextQuestion');
                if (panelTest.passed == 0)
                    buttonNextQuestion.enable();
            }
        },
        // * всплывающие подсказки (вопросы и ответы) при наведении на Вопрос № в Прогрессе
        '#panelProgress field[myCustomText]': {
            boxready: function (field) {
                field.el.on({
                    mouseover: function (e) {
                        Ext.tip.QuickTipManager.register({
                            target: field.getId(), // Target button's ID
                            //anchor: 'bottom',
                            anchor: 'top',
                            dismissDelay: 3000,
                            anchorOffset: 85,
                            text: field.myCustomText // Tip content
                        });
                    },
                    mouseout: function () {
                    }
                });
            }
        }

    },
// * проверить правильность ответа
    checkAnswer: function (answerId, questionId) {
        var request = function () {
            Ext.Ajax.request({
                url: 'resources/php/user/checkAnswer.php',
                params: {
                    answerid: answerId,
                    questionid: questionId
                },
                success: function (response) {
                    var resp = Ext.decode(response.responseText);
                    if (resp) {
                        var panelSelf = Ext.ComponentQuery.query('panelTest')[0],
                            vm = panelSelf.getViewModel();
                        vm.set({
                            correct: resp.correct
                        });
                    } else {
                        var str = 'Не могу проверить ответ.<br>Нет соединения с сервером.<br>Повторить?';
                        Ext.Msg.confirm('Ошибка подключения к базе', str, function (button) {
                            if (button == 'yes') {
                                request();
                            }
                        }, this);
                    }
                },
                failure: function (response) {
                    // var str = 'Не могу проверить ответ.<br>Ошибка соединения с сервером.<br>Повторить?<br>(в противном случае тестирование будет окончено)';
                    var str = 'Не могу проверить ответ.<br>Ошибка соединения с сервером.<br>Повторить?';
                    Ext.Msg.confirm('Ошибка подключения к базе', str, function (button) {
                        if (button == 'yes') {
                            request();
                        }
                    }, this);
                },
                method: 'POST'
            });
        }
        request();
    },
// * запуск таймера теста
    runTimerAll: function () {
        var panelTest = this.getView(),
            textTime = panelTest.down('#textTime'),
            buttonNextQuestion = panelTest.down('#nextQuestion'),
            varExamTimerSec = panelTest.examTimerSec,
            varExamTimerMin = panelTest.examTimerMin,
            taskExamTimerSec = {
                run: function () {
                    if (varExamTimerSec < 0) {
                        this.saveToClass();
                    } else {
                        textTime.setValue(varExamTimerSec + ' секунд');
                        varExamTimerSec -= 1;
                    }
                },
                scope: this,
                interval: 1000, // каждую секунду
                duration: 1000 * varExamTimerSec + 1000 * 50 // * 1000 * 30 - поправка на задержки связанные с временем обновления таймера во время ответа на вопрос
            },
            taskExamTimerMin = {
                run: function () {
                    if (varExamTimerMin < 2) {
                        textTime.setValue(varExamTimerSec + ' секунд');
                        App.util.Utilities.runnerExamTestAll.start(taskExamTimerSec);
                        App.util.Utilities.runnerExamTestAll.stop(taskExamTimerMin);
                    } else {
                        textTime.setValue(varExamTimerMin + ' минут');
                        varExamTimerMin -= 1;
                    }
                },
                scope: this,
                interval: 1000 * panelTest.examTimerSec, // каждую минуту
                duration: 1000 * panelTest.examTimerSec * varExamTimerMin + 1000 * 50
            };
        textTime.setValue(varExamTimerMin + ' минут');
        App.util.Utilities.runnerExamTestAll.start(taskExamTimerMin);
    },
    // * запуск таймера вопросов
    runTimerQuestion: function () {
        var panelTest = this.getView(),
            textTime = panelTest.down('#textTimeQuestion'),
            buttonNextQuestion = panelTest.down('#nextQuestion'),
            varExamTimerSec = panelTest.examTimerSec,
            varExamTimerMin = panelTest.examTimerQuestionMin,
            taskExamTimerSec = {
                run: function () {
                    if (varExamTimerSec < 0) {
                        App.util.Utilities.runnerExamTestQuestion.stop(taskExamTimerSec);
                        if (panelTest.questionNumber < panelTest.maxquestion) {
                            buttonNextQuestion.fireEvent('click', buttonNextQuestion);
                        } else {
                            this.saveToClass();
                        }
                    } else {
                        textTime.setValue(varExamTimerSec + ' секунд');
                        varExamTimerSec -= 1;
                    }
                },
                scope: this,
                interval: 1000, // каждую секунду
                duration: 1000 * varExamTimerSec + 1000 * 50 // * 1000 * 30 - поправка на задержки связанные с временем обновления таймера во время ответа на вопрос
            },
            taskExamTimerMin = {
                run: function () {
                    if (varExamTimerMin < 2) {
                        textTime.setValue(varExamTimerSec + ' секунд');
                        App.util.Utilities.runnerExamTestQuestion.start(taskExamTimerSec);
                        App.util.Utilities.runnerExamTestQuestion.stop(taskExamTimerMin);
                    } else {
                        textTime.setValue(varExamTimerMin + ' минут');
                        varExamTimerMin -= 1;
                    }
                },
                scope: this,
                interval: 1000 * panelTest.examTimerSec, // каждую минуту
                duration: 1000 * panelTest.examTimerSec * varExamTimerMin + 1000 * 50
            };
        textTime.setValue(varExamTimerMin + ' минут');
        App.util.Utilities.runnerExamTestQuestion.start(taskExamTimerMin);
    },
    // * показ 1-го вопроса после загрузки стора билетов
    onStoreCardLoad: function (storeCard) {
        console.log('onStoreCardLoad');

        // * проверим, что в билете необходимое число вопросов
        var panelTest = this.getView(),
            maxRownum = this.getStoreMaxValue(storeCard, 'rownum'), //* число вопросов в билете
            maxquestion = panelTest.maxquestion,
            buttonNextQuestion = panelTest.down('#nextQuestion'),
            startTest = panelTest.down('#startTest');
        if (maxRownum != maxquestion) {
            App.util.Utilities.errorMessage('Ошибка генерации билета', 'Неверное число вопросов в билете. Нужно: ' + maxquestion + ', сгенерировано: ' + maxRownum);
            // * тут нужно сбросить билет, т.к. пользователь не проходил экзамен
            Ext.defer(function () {
                this.cardReset();
            }, 5000, this);
            buttonNextQuestion.setDisabled(true);
        } else {
            this.runTimerAll();
            this.runTimerQuestion();
            this.showCard(1);
            startTest.setDisabled(true);
            // * нельзя проходить самоподготовку во время теста
            var main = panelTest.up('main'),
                buttonSelf = main.down('toolbarUser #selfMI');
            buttonSelf.disable();
        }
    },
    // * нахождение максимального значения поля в сторе
    getStoreMaxValue: function (store, field) {
        var max = 0;
        if (store.getCount() > 0) {
            max = store.getAt(0).get(field); // initialise to the first record's id value.
            store.each(function (rec) // go through all the records
            {
                max = Math.max(max, rec.get(field));
            });
        }
        return max;
    },
    // * смена вопросов и ответов
    showCard: function (num) {
        var panelTest = this.getView(),
            panelCard = panelTest.down('#panelCard'),// * билет
            storeCard = panelTest.getViewModel().getStore('card'),
            questionAccordion = panelCard.down('#questionAccordion'),
            answerAccordion = panelCard.down('#answerAccordion'),
            question = panelCard.down('#question'), // * поле внутри аккордиона Вопрос
            textQuestion = panelTest.down('#textQuestion'); // * Прогресс - Вопрос
        storeCard.clearFilter();
        if (storeCard.count() > 0) {
            var questionText = storeCard.findRecord('rownum', num, 0, false, true, true).get('questiontext'); //* текст вопроса
            // * вопросы
            question.setValue(questionText);
            questionAccordion.setTitle('Вопрос №' + num);
            textQuestion.setValue(num + ' / ' + panelTest.maxquestion);
            panelTest.questionNumber = num;
            // * ответы
            answerAccordion.removeAll(true);
            storeCard.filterBy(function (rec) {
                if (rec.get('rownum') == num)
                    return true;
            });
            storeCard.each(function (r) {
                var answerId = r.get('answerid'),
                    answerText = r.get('answertext');
                answerAccordion.add(
                    {
                        boxLabel: answerText,
                        inputValue: answerId,
                        xtype: 'radio'
                    }
                );
            });
        } else {
            Ext.Msg.alert('Внимание', 'Вопросы не найдены');
        }
    },
    showNextQuestion: function (buttonNextQuestion) {
        var panelTest = this.getView();
        if (panelTest.questionNumber < panelTest.maxquestion) {
            //* следующий вопрос, но только если Результат пустой
            var panelProgress = panelTest.down('#panelProgress'),
                textResult = panelProgress.down('#textResult');
            if (!textResult.getValue()) {
                buttonNextQuestion.setDisabled(false);
                this.showCard(panelTest.questionNumber + 1);
            }
        } else {
            //* сохраним результат в class и остановим таймер экзамена
            this.saveToClass();
        }
    },
    // * сохранить в базу ответ пользователя
    saveResult: function (questionId, answerid) {
        var panelTest = this.getView(),
            comboExam = panelTest.down('#comboExam'),
            examid = comboExam.getValue();
        Ext.Ajax.request({
            url: 'resources/php/user/saveCard.php?examid=' + examid
            + '&questionid=' + questionId
            + '&answerid=' + answerid,
            success: function (response, options) {

            },
            failure: function () {
                App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Ответ не сохранен в базу');
            },
            scope: this
        });
    },
    // * сохранение результата в таблицу class
    saveToClass: function () {
        App.util.Utilities.runnerExamTestAll.stopAll();
        App.util.Utilities.runnerExamTestQuestion.stopAll();
        var panelTest = this.getView();
        if (panelTest.passed == 0) {
            var comboExam = panelTest.down('#comboExam'),
                examid = comboExam.getValue(),
                textResult = panelTest.down('#textResult'),
                result = 0,
                buttonNextQuestion = panelTest.down('#nextQuestion');
            if (panelTest.rightAnswersAmount >= panelTest.minquestion) { // * экзамен сдан
                textResult.setValue(App.util.Utilities.passString);
                textResult.setFieldStyle(App.util.Utilities.colorStatusTextReg);
                result = 1;
            } else {
                textResult.setValue(App.util.Utilities.unpassString);
                textResult.setFieldStyle(App.util.Utilities.colorStatusTextUnreg);
                result = 0;
            }
            panelTest.passed = true;
            buttonNextQuestion.disable();
            Ext.Ajax.request({
                url: 'resources/php/user/saveClass.php?examid=' + examid
                + '&balls=' + panelTest.rightAnswersAmount
                + '&result=' + result,
                success: function (response, options) {
                    App.util.Utilities.infoMessage('Внимание', 'Результаты экзамена сохранены');
                    var storeCard = panelTest.getViewModel().getStore('card');
                    storeCard.removeAll(); // * чтобы после того, как результат сохранен, можно было обновить список экзаменов
                    var main = panelTest.up('main'),
                        buttonSelf = main.down('toolbarUser #selfMI');
                    buttonSelf.enable();
                    App.util.Utilities.runnerExamTestQuestion.stopAll();
                },
                failure: function () {
                    App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Результат экзамена не сохранен в базу');
                },
                scope: this
            });
        }
    },
    // * Отмена билета
    cardReset: function () {
        var panelTest = this.getView(),
            comboExam = panelTest.down('#comboExam'),
            examid = comboExam.getValue();
        Ext.Ajax.request({
            url: 'resources/php/user/resetCard.php?examid=' + examid,
            success: function (response, options) {
                Utilities.errorMessage('Внимание', 'Билет отменен. Перезайдите в систему.');
            },
            failure: function () {
                Utilities.errorMessage('Ошибка подключения к базе', 'Билет не отменен');
            },
            scope: this
        });
    },

    answerCounter: function () {
        if (!this.no) {
            this.no = 0;
        } else {
            this.no = this.no + 1;
        }
    },

    onPrintResults: function (btn) {
        var panelTest = this.getView(),
            comboExam = panelTest.down('#comboExam'),
            examid = comboExam.getValue(),
            params = 'examid=' + examid + '&userid=' + 0;
        window.open('resources/php/admin/pdfOne.php?' + params, '_blank', 'location=0');
    }
});