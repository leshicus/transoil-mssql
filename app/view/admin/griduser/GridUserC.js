Ext.define('App.view.admin.griduser.GridUserC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.formuser.FormUserV',
        'App.view.admin.menuuser.MenuUserV'
    ],
    alias: 'controller.griduser',

    control: {
        '#': {},
        '#refreshGridUserS': {
            click: function (button) {
                console.log('click refreshGridUserS');

                var gridUser = button.up('grid');
                gridUser.getViewModel().getStore('user').reload();
            }
        },
        'gridUser': {
            celldblclick: function (row, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('celldblclick');

                /*  var tree = this.getView().up('#content').down('treeUser'),
                 selected = tree.getSelected();*/
                var form = Ext.create('App.view.admin.formuser.FormUserV');
                //form.loadRecord(record);
                //if (selected) {
                var /*groupid = selected.raw.groupid,
                 orgid = selected.raw.orgid,
                 actid = selected.raw.actid,*/
                /*main = tree.up('main'),
                 vm = main.getViewModel(),
                 storeSpec = vm.getStore('spec');*/
                    vm = form.getViewModel(),
                    storeSpec = vm.getStore('spec');
                vm.set('theUser', record);
                /*storeSpec.load({
                 callback: function (records, operation, success) {

                 }
                 });*/
                var window = Ext.create('Ext.Window', {
                    frame: true,
                    title: 'Редактирование данных сотрудника',
                    width: 500,
                    height: 300,
                    closable: false,
                    modal: true,
                    layout: 'fit'
                });
                window.add(form);
                window.show();

                //}
            },
            // * чтобы контекстное меню показывалось
            itemcontextmenu: function (view, rec, node, index, e) {
                e.stopEvent();
                var menu = Ext.create('App.view.admin.menuuser.MenuUserV');
                menu.showAt(e.getXY());
                return false;
            }
        },
        'gridUser button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var /*tree = this.getView().up('#content').down('treeUser'),
                 selected = tree.getSelected(),*/
                    grid = this.getView(),
                    vmGrid = grid.getViewModel(),
                    storeUser = vmGrid.getStore('user');
                //if (selected) {
                var newRec = storeUser.add({

                    })[0],
                    form = Ext.create('App.view.admin.formuser.FormUserV'),
                    vm = form.getViewModel(),
                    storeSpec = vm.getStore('spec');
                storeUser.insert(0, newRec);
                vm.set('theUser', newRec);
                /* storeSpec.load({
                 callback: function (records, operation, success) {

                 }
                 });*/
                Ext.defer(function () {
                    var window = Ext.create('Ext.Window', {
                        frame: true,
                        title: 'Редактирование данных сотрудника',
                        width: 500,
                        height: 300,
                        closable: false,
                        modal: true,
                        layout: 'fit'
                    });
                    window.add(form);
                    window.show();
                }, 200);
                // }
            }
        },
        'gridUser button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                // * удаляем несколько пемеченных записей
                if (selection != '') {
                    Ext.each(selection, function (item) {
                        grid.getViewModel().getStore('user').remove(item);
                    });
                    grid.getViewModel().getStore('user').sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                        },
                        scope: this
                    });
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выбран ни один пользователь');
                }
            }
        }

    }
});
