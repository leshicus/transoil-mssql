Ext.define('App.view.admin.formuser.FormUserM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'App.model.SpecM',
        'App.model.RoleM'
    ],
    alias: 'viewmodel.formuser',

    stores: {
        spec: {
            model:'App.model.SpecM',
            autoLoad:true
        },
        role: {
            model:'App.model.RoleM',
            autoLoad:true
        }
    }
});
