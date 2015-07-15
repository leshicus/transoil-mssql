Ext.define('App.store.user.CardS', {
    extend: 'Ext.data.Store',
    model: 'App.model.user.CardM',
    //autoLoad: true,
    proxy: {
        type: 'rest',
        url: 'resources/php/user/getCard.php',
        reader: {
            type: 'json'
        }
    }
});