Ext.define('App.model.SpecM', {
    extend:'Ext.data.Model',
    fields: [],
    idProperty:'specid',
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/manage/syncGridSpec.php?act=create',
            read: 'resources/php/manage/syncGridSpec.php?act=read',
            update: 'resources/php/manage/syncGridSpec.php?act=update',
            destroy: 'resources/php/manage/syncGridSpec.php?act=destroy'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        },
        appendId: false,
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
    }
});