Ext.define('App.view.admin.tool.FormToolC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.formtool',
    listen: {
        store: {
            '#tool': {
                load: function (store, rec) {
                    console.info('tool loaded');
                    // * загрузим данные в форму
                    var form = this.getView(),
                        record = store.getAt(0);
                    form.getForm().loadRecord(record);
                }
            }
        }
    },
    control: {
        '#maxquestion': {
            change: function (field, newValue, oldValue, eOpts) {
                var storeTool = field.up('form').getViewModel().getStore('tool'),
                    rec = storeTool.getAt(0);
                rec.set('maxquestion', field.getValue());
            }
        },
        '#minquestion': {
            change: function (field, newValue, oldValue, eOpts) {
                var storeTool = field.up('form').getViewModel().getStore('tool'),
                    rec = storeTool.getAt(0);
                rec.set('minquestion', field.getValue());
            }
        },
        '#regstatint': {
            change: function (field, newValue, oldValue, eOpts) {
                var storeTool = field.up('form').getViewModel().getStore('tool'),
                    rec = storeTool.getAt(0);
                rec.set('regstatint', field.getValue());
            }
        },
        '#regstatdur': {
            change: function (field, newValue, oldValue, eOpts) {
                var storeTool = field.up('form').getViewModel().getStore('tool'),
                    rec = storeTool.getAt(0);
                rec.set('regstatdur', field.getValue());
            }
        },
        '#examtimermin': {
            change: function (field, newValue, oldValue, eOpts) {
                var storeTool = field.up('form').getViewModel().getStore('tool'),
                    rec = storeTool.getAt(0);
                rec.set('examtimermin', field.getValue());
            }
        },
        'button[action=save]': {
            click: function (button) {
                console.log('action=save');

                var panel = button.up('form'),
                    storeTool = panel.getViewModel().getStore('tool'),
                    form = panel.getForm(),
                    examtimermin = panel.down('#examtimermin').getValue(),
                    minquestion = panel.down('#minquestion').getValue(),
                    regstatint = panel.down('#regstatint').getValue(),
                    regstatdur = panel.down('#regstatdur').getValue(),
                    maxquestion = panel.down('#maxquestion').getValue();
                if(form.isValid()){
                    if(maxquestion && minquestion && regstatint && regstatdur && examtimermin){
                        if (((examtimermin % maxquestion) == 0 && examtimermin != 0)
                            || examtimermin == 0){
                            storeTool.sync({
                                success: function () {
                                    Ext.Msg.alert('Успех', 'Сохранено');
                                },
                                failure: function () {
                                    Ext.Msg.alert('Ошибка', 'Не сохранено');
                                },
                                scope: this
                            });
                        } else
                            Ext.Msg.alert('Ошибка значения', 'Количество времени на экзамен (' + examtimermin + ') должно быть кратно числу вопросов в билете (' + maxquestion + ')');
                    }else
                        Ext.Msg.alert('Ошибка значения', 'Значение 0 допустимо только для поля Количество времени на экзамен');
                }else
                    Ext.Msg.alert('Ошибка значения', 'Форма заполнена с ошибками');
            }
        }
    }

});
