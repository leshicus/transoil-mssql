Ext.define('App.view.admin.formuser.FormUserC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.formuser',

    control: {
        'button[action=save]': {
            click: function (button) {
                console.log('save button');

                var form = button.up('form'),
                    win = form.up('window'),
                    values = form.getValues(),
                    grid = Ext.ComponentQuery.query('gridUser')[0],
                //record = form.getForm().getRecord(),
                    storeUser = grid.getViewModel().getStore('user');
                if (form.isValid()) {
                    if (values['userid']) { // * исправление
                        //record.set(values);
                        //form.getViewModel().set('theUser.specid', form.getViewModel().get('specid'));
                        // form.getViewModel().set('theUser.roleid', form.getViewModel().get('roleid'));
                        grid.getViewModel().getStore('user').sync({
                            callback: function (batch, options) {
                                var response = batch.operations[0].request._scope.reader.rawData;
                                if (response) {
                                    if (response.success) {
                                        Utilities.toast('Успех', 'Пользователь сохранен');
                                        storeUser.commitChanges();
                                    } else {
                                        Utilities.errorMessage('Ошибка', response.message);
                                        storeUser.rejectChanges();
                                    }
                                } else {
                                    storeUser.rejectChanges();
                                    Utilities.errorMessage('Ошибка', 'Пользователь не сохранен');
                                }
                            },
                            scope: this
                        });
                    } else { // * новая запись
                        console.info('new');
                        // form.getViewModel().set('theUser.specid', form.getViewModel().get('specid'));
                        // form.getViewModel().set('theUser.roleid', form.getViewModel().get('roleid'));
                        grid.getViewModel().getStore('user').sync({
                            callback: function (batch, options) {
                                var response = batch.operations[0].request._scope.reader.rawData;
                                if (response) {
                                    Utilities.toast('Успех', 'Пользователь сохранен');
                                    storeUser.commitChanges();
                                } else {
                                    storeUser.rejectChanges();
                                    Utilities.errorMessage('Ошибка', 'Пользователь не сохранен');
                                }
                            },
                            scope: this
                        });
                    }
                    win.close();
                } else {
                    storeUser.rejectChanges();
                    Ext.Msg.alert('Форма', 'Форма заполнена не правильно');
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
