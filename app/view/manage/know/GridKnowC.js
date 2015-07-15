Ext.define('App.view.manage.know.GridKnowC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.main.MainM',
    ],
    alias: 'controller.gridKnow',

    control: {
        '#':{
            edit: function (editor, context) {
                console.log('edit');

                context.grid.getViewModel().getStore('know').sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
                var main = Ext.ComponentQuery.query('main')[0],
                    vm = main.getViewModel(),
                    store = vm.getStore('know');
                store.reload();
            }
        },
        '#refreshGridKnowS': {
            click: function (button) {
                console.log('click refreshGridKnowS');

                var gridKnow = this.getView();
                gridKnow.getViewModel().getStore('know').load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    store = grid.getViewModel().getStore('know'),
                    newRecord = store.add({})[0];
                grid.getViewModel().getStore('know').insert(0, newRecord);
                grid.getViewModel().getStore('know').sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            }
        },
        //todo написать проверки на удаление
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                grid.getViewModel().getStore('know').remove(selection);
                grid.getViewModel().getStore('know').sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            }
        }

    }
});
