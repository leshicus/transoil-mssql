Ext.define('App.store.admin.ChartKnowProgressS', {
    extend:'Ext.data.Store',
    fields:[
        {name:'name'},
        {name:'data',type:'int'}
    ],
    proxy:{
        type:'rest',
        url:'resources/php/admin/getChartKnowProgress.php',
        reader:{
            type:'json'
        }
    }
});