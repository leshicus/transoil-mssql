Ext.define('App.view.admin.clas.GridPersonM', {
    extend: 'Ext.app.ViewModel',
    requires: [

    ],
    alias: 'viewmodel.gridperson',
    stores: {
        person: {
            fields: [
                {name: 'examid'},
                {name: 'userid'},
                {name: 'balls'},
                {name: 'result'},
                {name: 'fio'},
                {name: 'login'},
                {name: 'reg'},
                {name: 'timelimit'}
            ],
            autoSync: true,
           // autoLoad: true,
            idProperty:'userid',
            proxy: {
                type: 'rest',
                api: {
                    create: 'resources/php/admin/syncGridPerson.php?act=create',
                    read: 'resources/php/admin/syncGridPerson.php?act=read',
                    update: 'resources/php/admin/syncGridPerson.php?act=update',
                    destroy: 'resources/php/admin/syncGridPerson.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    allowSingle:false,
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
