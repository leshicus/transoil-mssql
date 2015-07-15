Ext.define('App.view.manage.spec.GridSpecM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridSpec',
    stores: {
        spec: {
            fields: [],
            autoSync: false,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'resources/php/manage/syncGridSpec.php?act=create',
                    read: 'resources/php/manage/syncGridSpec.php?act=read',
                    update: 'resources/php/manage/syncGridSpec.php?act=update',
                    destroy: 'resources/php/manage/syncGridSpec.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                appendId: false,
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                }
            }
        }
    }
});
