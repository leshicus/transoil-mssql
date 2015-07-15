Ext.define('App.store.admin.ChartActivityProgressS', {
    extend:'Ext.data.Store',
    fields:[
        {name:'name'},
        {name:'data',type:'int'},
        {name:'result'}
    ],
    proxy:{
        type:'rest',
        url:'resources/php/admin/getChartActivityProgress.php',
        reader:{
            type:'json'
        }
    }
});