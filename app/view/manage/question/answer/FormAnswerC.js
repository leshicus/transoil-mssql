Ext.define('App.view.manage.question.answer.FormAnswerC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.formanswer',

    control: {
        'button[action=save]': {
            click: function (button) {
                console.log('save button');
                // * первый ответ должен быть всегда верным
                // * признак верности ставится в зависимости от заполненности поля Нормативный документ
                var form = button.up('form'),
                    win = form.up('window'),
                    values = form.getValues(),
                    record = form.getForm().getRecord(),
                    gridQuestion = Ext.ComponentQuery.query('gridQuestion')[0],
                    selectedQuestion = gridQuestion.getSelected(),
                    gridAnswer = Ext.ComponentQuery.query('gridAnswer')[0],
                    storeAnswer = gridAnswer.getViewModel().getStore('answer'),
                    countAnswer = storeAnswer.getCount(),
                    normdoc = values['normdoc'];
                if (selectedQuestion != '') {
                    var questionid = selectedQuestion[0].get('questionid');
                    if (values.answertext) { // * такая вот валидация, allowBlank=false не работает
                        if (!record) { // * создание
                            values['questionid'] = questionid;
                            if (countAnswer == 0) {
                                if (normdoc) { // * ставим галочку верный
                                    values['correct'] = 1;
                                    var newRecord = storeAnswer.insert(0, values)[0];
                                    win.close();
                                } else {
                                    Ext.Msg.alert('Нормативный документ', 'Нормативный документ должен быть указан для первого ответа');
                                }
                            } else {
                                if (normdoc) { // * ставим галочку верный
                                    Ext.Msg.alert('Нормативный документ', 'Нормативный документ должен быть пустым для не первого ответа');
                                } else {
                                    values['correct'] = 0;
                                    var newRecord = storeAnswer.insert(0, values)[0];
                                    win.close();
                                }
                            }
                        } else { // * исправление
                            var correct = record.get('correct');
                            if (correct) { // * ставим галочку верный
                                if (normdoc) { // * ставим галочку верный
                                    record.set(values);
                                    win.close();
                                } else {
                                    Ext.Msg.alert('Нормативный документ', 'Нормативный документ должен быть указан для первого ответа');
                                }
                            } else {
                                if (normdoc) { // * ставим галочку верный
                                    Ext.Msg.alert('Нормативный документ', 'Нормативный документ должен быть пустым для не первого ответа');
                                } else {
                                    record.set(values);
                                    win.close();
                                }
                            }
                        }
                        storeAnswer.sync({
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Экзамен не добавлен');
                            },
                            scope: this
                        });
                    } else {
                        Ext.Msg.alert('Ответ', 'Ответ не может быть пустым');
                    }
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выделен вопрос');
                    win.close();
                }
            }
        },
        'button[action=cancel]': {
            click: function (button) {
                console.log('cancel button');

                button.up('form').getForm().reset();
                button.up('window').close();
            }
        }

    }
});
