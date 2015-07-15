Ext.define('App.view.manage.act.GridActC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.main.MainM',
    ],
    alias: 'controller.gridAct',

    control: {
        '#':{

            edit: function (editor, context) {
                console.log('edit');

                context.grid.getViewModel().getStore('act').sync({
                     failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
                var main = Ext.ComponentQuery.query('main')[0],
                    vm = main.getViewModel(),
                    store = vm.getStore('act');
                store.reload();
            }

        },
        '#instruction': {
            click: function (button) {
                window.open('resources/php/instruction.php?taskname=activity&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        },
        '#refreshGridActS': {
            click: function (button) {
                console.log('click refreshGridActS');

                var gridAct = this.getView();
                gridAct.getViewModel().getStore('act').load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    vm = grid.getViewModel(),
                    store = vm.getStore('act'),
                    newRecord = store.add({
                        timelimit: Utilities.getTool('examtimermin')
                    })[0];
                store.insert(0, newRecord);
                store.sync({
                    success: function () {
                        //newRecord.commit();
                    },
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
                if (selection) {
                    var actid = selection.get('actid'),
                        main = button.up('main'),
                        storeGroup = main.getViewModel().getStore('group');

                    storeGroup.load({
                        callback: function (records, operation, success) {
                            var recGroup = storeGroup.findRecord('actid', actid, 0,false,true,true);
                            // * проверка, что нет видов деятельности в группах
                            if (!recGroup) {
                                var storeAct = grid.getViewModel().getStore('act');
                                storeAct.remove(selection);
                                storeAct.sync({
                                    failure: function () {
                                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                                    },
                                    scope: this
                                });
                            } else {
                                Ext.Msg.alert('Не удалено', 'Есть привязка в группах к данному виду деятельности');
                            }
                        }
                    });
                }
            }
        }
    }
});
