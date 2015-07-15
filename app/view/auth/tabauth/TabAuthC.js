Ext.define('App.view.auth.tabauth.TabAuthC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.tabAuth',

    listen: {
        controller: {}
    },

    control: {
        'tabAuth button[action=enter]': {
            click: function (button) {
                console.log('action=enter');
                var form = button.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        waitMsg: 'Авторизация...',
                        success: function (response, action) {
                            // * открыть нужную подсистему
                            var formValues = form.getValues(),
                                subsystem = formValues['comboSystem'],
                                main = button.up('main'),
                                layout = main.getLayout();
                            if (subsystem) {
                                switch (subsystem) {
                                    case 1: // * Тестирование
                                        var toolbarUser = main.down('toolbarUser'),
                                            mainMI = toolbarUser.down('#mainMI'),
                                            buttonSelf = toolbarUser.down('#selfMI');
                                        buttonSelf.enable();
                                        mainMI.toggle(false);
                                        break;
                                    case 2:  // * Администрирование
                                        var toolbarAdmin = main.down('toolbarAdmin'),
                                            mainMI = toolbarAdmin.down('#mainMI');
                                        mainMI.toggle(false);
                                        break;
                                    case 3:  // * Ведение
                                        var toolbarManage = main.down('toolbarManage'),
                                            mainMI = toolbarManage.down('#mainMI');
                                        mainMI.toggle(false);
                                        break;
                                    default:
                                        break;
                                }
                                layout.setActiveItem(subsystem);

                                var html = layout.activeItem.query('#labelUser')[0],
                                    content = layout.activeItem.query('#content')[0];
                                if (content) {
                                    layout.activeItem.remove(content);
                                };
                                html.update(/*'<img src="resources/image/App-user-icon.png">' + ' ' + */action.result.fio);
                            }
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Ошибка', action.result ? action.result.message : 'Нет ответа от сервера');
                        }
                    });
                }
            }
        },
        'tabAuth button[action=refresh]': {
            click: function (button) {
                console.log('action=refresh');

                var form = button.up('form');
                form.getForm().reset();
            }
        },
        'tabAuth button[action=changepassword]': {
            click: function (button) {
                console.log('action=changepassword');

                var form = button.up('form'),
                    values = form.getValues();
                Ext.Ajax.request({
                    url: 'resources/php/changePassword.php',
                    params: {
                        textLogin: values['textLogin'],
                        textOldPassword: values['textOldPassword'],
                        textNewPassword: values['textNewPassword']
                    },
                    success: function (response, options) {
                        var response = Ext.decode(response.responseText),
                            message = response.message;
                        Ext.Msg.alert('Пароль', message);
                    },
                    failure: function (response, options) {
                        var response = Ext.decode(response.responseText),
                            message = response.message;
                        Ext.Msg.alert('Ошибка', message);
                    }
                });
            }
        }
    }
});
