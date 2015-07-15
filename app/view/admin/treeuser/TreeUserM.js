Ext.define('App.view.admin.treeuser.TreeUserM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore',
    ],
    alias: 'viewmodel.treeuser',
    stores: {
       treeuser: {
           type:'tree',
           proxy: {
               type: 'ajax',
               url: 'resources/php/admin/getTreeUser.php',
               reader: {
                   type: 'json'
               }
           },
           root: {expanded: true, children: [] },
           autoLoad:true
        }
    }
});
