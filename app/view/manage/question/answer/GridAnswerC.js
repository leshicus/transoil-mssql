Ext.define('App.view.manage.question.answer.GridAnswerC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.question.answer.FormAnswerV'
    ],
    alias: 'controller.gridanswer',

    control: {
        '#':{
            celldblclick: function (row, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('celldblclick');

                var form = Ext.create('App.view.manage.question.answer.FormAnswerV');
                form.loadRecord(record);
                var window = Ext.create('Ext.Window', {
                    frame: true,
                    title: 'Редактирование ответа',
                    width: 500,
                    height: 400,
                    closable: false,
                    modal: true,
                    layout: 'fit'
                });
                window.add(form);
                window.show();
            }
        },

        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var gridQuestion = button.up('#content').down('gridQuestion'),
                    selectedQuestion = gridQuestion.getSelected();
                if (selectedQuestion != '') {
                    var form = Ext.create('App.view.manage.question.answer.FormAnswerV');
                    var window = Ext.create('Ext.Window', {
                        frame: true,
                        title: 'Редактирование ответа',
                        width: 500,
                        height: 400,
                        closable: false,
                        modal: true,
                        layout: 'fit'
                    });
                    window.add(form);
                    window.show();
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выделен вопрос');
                }
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('#content').down('gridAnswer'),
                    selection = grid.getSelected();
                // * удаляем несколько пемеченных записей
                if (selection != '') {
                    Ext.each(selection, function (item) {
                        grid.getViewModel().getStore('answer').remove(item);
                        grid.getViewModel().getStore('answer').sync({
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Экзамен не добавлен');
                            },
                            scope: this
                        });
                    });
                }else {
                    Ext.Msg.alert('Ошибка', 'Не выбран ни один ответ');
                }
            }
        }
    }
});
