Ext.define('App.view.admin.treeuser.TreeUserC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.treeuser',

    control: {
        'treeUser': {
            cellclick: function (tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('treeUser cellclick');
                var treeUser = tree.up('#content').down('treepanel'),
                    gridUser = tree.up('#content').down('grid'),
                    storeUser = gridUser.getViewModel().getStore('user'),
                    selection = treeUser.getSelected();
                if (selection) {
                    var groupid = selection.raw.groupid,
                        actid = selection.raw.actid,
                        orgid = selection.raw.orgid,
                        id = selection.raw.id;

                    gridUser.mask('Загружаем список пользователей...');
                    Ext.defer(function () {
                        storeUser.load({
                            params: {
                                id: id,
                                orgid: orgid,
                                actid: actid,
                                groupid: groupid
                            },
                            callback: function () {
                                gridUser.unmask();
                            }
                        });
                    }, 20);
                }
            },
            render: function (tree) {

            }
        },

        '#refreshTreeUser': {
            click: function (button) {
                var treeUser = button.up('treepanel'),
                    gridUser = treeUser.up('#content').down('grid'),
                    storeUser = gridUser.getViewModel().getStore('user');
                treeUser.getViewModel().getStore('treeuser').load();
            }
        },
        'tool[type=maximize]': {
            click: function (button, e, tree) {
                Utilities.treeCollapse(button, e, tree);
            }
        }
    }
});
