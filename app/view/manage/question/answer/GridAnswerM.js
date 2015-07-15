Ext.define('App.view.manage.question.answer.GridAnswerM', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.gridanswer',
    stores: {
       answer: {
           fields: [
               {name:'correct',type:'bool'}
           ],
           autoLoad: false,
           proxy: {
               type: 'rest',
               api: {
                   create: 'resources/php/manage/syncGridAnswer.php?act=create',
                   read: 'resources/php/manage/syncGridAnswer.php?act=read',
                   update: 'resources/php/manage/syncGridAnswer.php?act=update',
                   destroy: 'resources/php/manage/syncGridAnswer.php?act=destroy'
               },
               reader: {
                   type: 'json'
               },
               writer: {
                   type: 'json',
                   writeAllFields: true
                   //allowSingle:true  // * чтобы всегда передавал массив
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
