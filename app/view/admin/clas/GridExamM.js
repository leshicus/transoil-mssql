Ext.define('App.view.admin.clas.GridExamM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridexam',
    stores: {
        exam: {
            fields: [

            ],
            autoSync: true,
            autoLoad: true,
            idProperty:'examid',
            proxy: {
                type: 'rest',
                api: {
                    create: 'resources/php/admin/syncGridExam.php?act=create',
                    read: 'resources/php/admin/syncGridExam.php?act=read',
                    update: 'resources/php/admin/syncGridExam.php?act=update',
                    destroy: 'resources/php/admin/syncGridExam.php?act=destroy'
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
        },
        tool: {
            fields: [
                {name:'toolid'},
                {name:'maxquestion',type:'int'},
                {name:'minquestion',type:'int'},
                {name:'regstatint',type:'int'},
                {name:'regstatdur',type:'int'},
                {name:'examtimermin',type:'int'}
            ],
            autoSync: true,
            autoLoad: true,
            idProperty:'toolid',
            proxy: {
                type: 'rest',
                api: {
                    read: 'resources/php/admin/syncFormTool.php?act=read',
                    update: 'resources/php/admin/syncFormTool.php?act=update'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false
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
