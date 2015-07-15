Ext.define('App.store.ComboManidS', {
    extend:'Ext.data.Store',
    model:'App.model.ComboModel',
    proxy:{
        type:'rest',
        url:'resources/php/getManid.php',
        reader:{
            type:'json'
        }
    }
});