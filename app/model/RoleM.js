Ext.define('App.model.RoleM', {
    extend:'Ext.data.Model',
    fields: [],
    idProperty:'id',
    proxy: {
        type: 'rest',
        url: 'resources/php/admin/getRole.php',
        reader: {
            type: 'json'
        }
    }
});