Ext.define('App.view.admin.menuuser.MenuUserC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.menuuser',

    control: {
        '#': {
            show: function (menu) {
                var gridUser = Ext.ComponentQuery.query('gridUser')[0],
                    selection = gridUser.getSelected(),
                    block = selection[0].get('enddate'),
                    menuBlock = menu.down('#menuBlock'),
                    menuUnblock = menu.down('#menuUnblock'),
                    menuResetPassword = menu.down('#menuResetPassword');
                if (block != '00.00.0000 00:00' && block) {
                    menuBlock.disable();
                    menuUnblock.enable();
                } else {
                    menuBlock.enable();
                    menuUnblock.disable();
                }
                menuResetPassword.enable();
            }
        },
        '#menuResetPassword': {
            click: function (button) {
                console.log('click menuResetPassword');

                var grid = Ext.ComponentQuery.query('gridUser')[0],
                    selection = grid.getSelected();
                Ext.Msg.confirm('Сброс пароля', 'Сбросить пароль на начальный?', function (button) {
                    if (button == 'yes') {
                        Ext.each(selection, function (item) {
                            item.set('password', null);
                        });
                        grid.getViewModel().getStore('user').sync({
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                            },
                            scope: this
                        });
                    }
                }, this);

            }
        },
        '#menuBlock': {
            click: function (button) {
                console.log('click menuBlock');

                var grid = Ext.ComponentQuery.query('gridUser')[0],
                    selection = grid.getSelected();
                Ext.Msg.confirm('Блокировка пользователя', 'Заблокировать учетную запись пользователя?', function (button) {
                    if (button == 'yes') {
                        var now = new Date(),
                            date = [App.util.Utilities.reverseDate(now.getDate()), App.util.Utilities.reverseDate(now.getMonth() + 1), now.getFullYear()].join('.')
                                + ' ' + now.getHours() + ':' + now.getMinutes();
                        Ext.each(selection, function (item) {
                            item.set('enddate', date);
                        });
                        grid.getViewModel().getStore('user').sync({
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                            },
                            scope: this
                        });
                    }
                }, this);
            }
        },
        '#menuUnblock': {
            click: function (button) {
                console.log('click menuUnblock');

                var grid = Ext.ComponentQuery.query('gridUser')[0],
                    selection = grid.getSelected();
                Ext.Msg.confirm('Разблокировка пользователя', 'Разблокировать учетную запись пользователя?', function (button) {
                    if (button == 'yes') {
                        Ext.each(selection, function (item) {
                            item.set('enddate', App.util.Utilities.nullDate);
                        });
                        grid.getViewModel().getStore('user').sync({
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                            },
                            scope: this
                        });
                    }
                }, this);

            }
        }
    },
    getMenuResetPassword: function () {
        return this.contextMenu.query('#menuResetPassword')[0];
    },
    getMenuBlock: function () {
        return this.contextMenu.query('#menuBlock')[0];
    },
    getMenuUnblock: function () {
        return this.contextMenu.query('#menuUnblock')[0];
    }
});
