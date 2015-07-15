Ext.define('App.view.manage.group.GridGroupC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.gridGroup',

    control: {
        '#':{
            edit: function (editor, context) {
                console.log('edit');

                context.grid.getViewModel().getStore('group').sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
                var main = Ext.ComponentQuery.query('main')[0],
                    vm = main.getViewModel(),
                    store = vm.getStore('group');
                store.reload();
            }
        },
        '#instruction': {
            click: function (button) {
                window.open('resources/php/instruction.php?taskname=group&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        },
        '#refreshGridGroupS': {
            click: function (button) {
                console.log('click refreshGridGroupS');

                var gridGroup = this.getView();
                gridGroup.getViewModel().getStore('group').load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    store = grid.getViewModel().getStore('group'),
                    newRecord = store.insert(0,{})[0];
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected(),
                    main = button.up('main'),
                    storeSpec = main.getViewModel().getStore('spec'),
                    storeGroup = grid.getViewModel().getStore('group'),
                    gridQuestion = Ext.create('App.view.manage.question.question.GridQuestionV'),
                    storeQuest = gridQuestion.getViewModel().getStore('question');
                storeSpec.reload();
                storeQuest.load({
                    callback: function (records, operation, success) {
                        if (selection) {
                            var groupid = selection.get('groupid'),
                                recGroup = storeSpec.findRecord('groupid', groupid, 0,false,true,true),
                                recQuest = storeQuest.findRecord('groupid', groupid, 0,false,true,true);
                            if (!recGroup) {
                                if (!recQuest) {
                                    storeGroup.remove(selection);
                                    storeGroup.sync();
                                }else {
                                    Ext.Msg.alert('Не удалено', 'Существуют вопросы привязанные к данной группе');
                                }
                            } else {
                                Ext.Msg.alert('Не удалено', 'Существуют специальности привязанные к данной группе');
                            }
                        }
                    }
                });
            }
        }
    }
});
