Ext.define('App.view.user.test.PanelTestM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.paneltest',
    data:{
        questionMaxInCardSelf:0,
        correct:-1
    },
    stores: {
        exam: {
            fields: [

            ],
            autoLoad: true,
            idProperty:'examid',
            proxy: {
                type: 'rest',
                extraParams: {
                    testMode:1
                },
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
                    writeAllFields:true,
                    encode: true
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
