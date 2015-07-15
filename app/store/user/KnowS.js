Ext.define('App.store.user.KnowS', {
    extend: 'Ext.data.Store',
    model: 'App.model.user.KnowM',
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: 'resources/php/user/getKnow.php',
        reader: {
            type: 'json'
        }
    }
});