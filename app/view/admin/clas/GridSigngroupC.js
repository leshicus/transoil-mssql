Ext.define('App.view.admin.clas.GridSigngroupC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridsigngroup',

    control: {
        '#':{
            edit: function (editor, context) {
                console.log('edit');

                context.grid.getViewModel().getStore('signgroup').sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    store = grid.getViewModel().getStore('signgroup'),

                    gridExam = grid.up('#content').down('gridExam'),
                    selectionExam = gridExam.getSelectionModel().getSelection()[0];

                if (selectionExam) {
                    var examid = selectionExam.get('examid'),
                        newRecord = store.insert(0, {examid: examid})[0];
                    //newRecord.set('examid', examid);
                    store.sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Подписант не добавлен');
                        },
                        scope: this
                    });
                }

            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    store = grid.getViewModel().getStore('signgroup'),
                    selection = grid.getSelected();
                store.remove(selection);
                store.sync({
                 failure: function () {
                 Ext.MessageBox.alert('Ошибка', 'Пользователь не удален');
                 },
                 scope: this
                 });
            }
        }
    }
});
