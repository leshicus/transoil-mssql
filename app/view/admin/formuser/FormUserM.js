Ext.define('App.view.admin.formuser.FormUserM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'App.model.SpecM',
        'App.model.RoleM'
    ],
    alias: 'viewmodel.formuser',
    data:{
        orgid:null,
        actid:null,
        groupid:null
    },
    stores: {
        spec: {
            model:'App.model.SpecM',
            autoLoad:false
        },
        role: {
            model:'App.model.RoleM',
            autoLoad:true
        }
    }
});
