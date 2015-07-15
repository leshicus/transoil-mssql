Ext.define('App.view.admin.griduser.GridUserM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'App.model.SpecM',
        'App.model.RoleM'
    ],
    alias: 'viewmodel.griduser',
    stores: {
        user: {
            fields: [],
            idProperty: 'userid',
            proxy: {
                type: 'ajax',
                api: {
                    create: 'resources/php/admin/syncGridUser.php?act=create',
                    read: 'resources/php/admin/syncGridUser.php?act=read',
                    update: 'resources/php/admin/syncGridUser.php?act=update',
                    destroy: 'resources/php/admin/syncGridUser.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    allowSingle: false,
                    writeAllFields: true,
                    writeValue: function (data, field) {
                        if ('specname' !== field.name) {
                            Ext.data.writer.Json.prototype.writeValue.apply(this, arguments);
                        }
                    }
                },
                appendId: false,
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                }
            }
        },
        spec: {
            model: 'App.model.SpecM',
            autoLoad: true
        },
        role: {
            model: 'App.model.RoleM',
            autoLoad: true
        }
    }
});
