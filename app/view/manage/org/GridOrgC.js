Ext.define('App.view.manage.org.GridOrgC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.main.MainM',
    ],
    alias: 'controller.gridOrg',

    control: {
        '#':{
            edit: function (editor, context) {
                console.log('edit');

                context.grid.getViewModel().getStore('org').sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
                /* нужно обновить стор вьюмодела */
                var main = Ext.ComponentQuery.query('main')[0],
                    vm = main.getViewModel(),
                    store = vm.getStore('org');
                store.reload();
            }
        },
        '#refreshGridOrgS': {
            click: function (button) {
                console.log('click refreshGridOrgS');

                var gridOrg = this.getView();
                gridOrg.getViewModel().getStore('org').load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    store = grid.getViewModel().getStore('org'),
                    newRecord = store.add({})[0];
                grid.getViewModel().getStore('org').insert(0, newRecord);
                grid.getViewModel().getStore('org').sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                grid.getViewModel().getStore('org').remove(selection);
                grid.getViewModel().getStore('org').sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            }
        }

    }
});
