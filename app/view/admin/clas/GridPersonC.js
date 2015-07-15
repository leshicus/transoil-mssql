Ext.define('App.view.admin.clas.GridPersonC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.clas.MenuPersonV'
    ],
    alias: 'controller.gridperson',

    control: {
        '#': {
            // * чтобы контекстное меню показывалось
            itemcontextmenu: function (view, rec, node, index, e) {
                e.stopEvent();
                var menu = Ext.create('App.view.admin.clas.MenuPersonV');
                menu.showAt(e.getXY());
                return false;
            }
        },
        'button[action=delete]': {
            click: function (button) {
                var grid = this.getView(),
                    selection = grid.getSelected(),
                    store = grid.getViewModel().getStore('person');
                // * удаляем несколько пемеченных записей
                Ext.each(selection, function (item) {
                    var result = item.get('result');
                    if (result == -1) {
                        store.remove(item);
                    } else {
                        Ext.Msg.alert('Не удалено', 'Сотрудник проходил тест');
                    }
                });
            }
        },

        '#refreshGridPerson': {
            click: function (button) {
                var grid = button.up('grid');
                grid.getViewModel().getStore('person').reload();
            }
        }

    }
});
