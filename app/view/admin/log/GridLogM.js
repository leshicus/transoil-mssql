Ext.define('App.view.admin.log.GridLogM', {
    extend: 'Ext.app.ViewModel',
    requires: [

    ],
    alias: 'viewmodel.gridlog',
    stores: {
        logtype: {
            fields: [
                {name: 'id'},
                {name: 'name'},
            ],
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: 'resources/php/admin/getLogtype.php',
                reader: {
                    type: 'json'
                }
            }
        },
        log: {
            fields: [
                {name: 'logid'},
                {name: 'logdate'},
                {name: 'userid'},
                {name: 'parameter'},
                {name: 'logtypeid'},
                {name: 'fio'},
                {name: 'logtypename'}
            ],
            autoSync: true,
            autoLoad: true,
            idProperty: 'logid',
            proxy: {
                type: 'rest',
                api: {
                    read: 'resources/php/admin/syncGridLog.php?act=read'
                },
                reader: {
                    type: 'json'
                },
                appendId: false,
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                }
            }
        }
    }
});
