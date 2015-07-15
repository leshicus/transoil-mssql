Ext.define('App.view.manage.question.tree.TreeQuestionM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore',
    ],
    alias: 'viewmodel.treeQuestion',
    stores: {
       treequestion: {
           type:'tree',
           proxy: {
               type: 'ajax',
               url: 'resources/php/manage/getTreeQuestion.php',
               reader: {
                   type: 'json'
               }
           },
           root: {expanded: true, children: [] },
           autoLoad:true,
           listeners: {
               beforeload: function (store, operation, eOpts) {
                   if (store.isLoading()) return false;
               }
           }
        }
    }
});
