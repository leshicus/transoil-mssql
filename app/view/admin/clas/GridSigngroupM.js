Ext.define('App.view.admin.clas.GridSigngroupM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridsigngroup',
    stores: {
        signgroup: {
            fields: [
                {name: 'signgroupid'},
                {name: 'examid'},
                {name: 'familyname'},
                {name: 'lastname'},
                {name: 'firstname'}
            ],
            proxy: {
                type: 'rest',
                api: {
                    create: 'resources/php/admin/syncGridSigngroup.php?act=create',
                    read: 'resources/php/admin/syncGridSigngroup.php?act=read',
                    update: 'resources/php/admin/syncGridSigngroup.php?act=update',
                    destroy: 'resources/php/admin/syncGridSigngroup.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields:true
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
