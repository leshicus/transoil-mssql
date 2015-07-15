Ext.define('App.view.admin.tool.FormToolM', {
    extend: 'Ext.app.ViewModel',
    requires: [

    ],
    alias: 'viewmodel.formtool',
    stores: {
        tool: {
            fields: [
                {name:'toolid'},
                {name:'maxquestion',type:'int'},
                {name:'minquestion',type:'int'},
                {name:'regstatint',type:'int'},
                {name:'regstatdur',type:'int'},
                {name:'examtimermin',type:'int'}
            ],
            storeId:'tool',
            autoLoad: true,
            idProperty:'toolid',
            proxy: {
                type: 'ajax',
                api: {
                    read: 'resources/php/admin/syncFormTool.php?act=read',
                    update: 'resources/php/admin/syncFormTool.php?act=update'
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
