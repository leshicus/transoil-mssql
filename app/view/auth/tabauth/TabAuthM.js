Ext.define('App.view.auth.tabauth.TabAuthM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tabAuth',
    stores: {
        storeSubSystem: {
            fields: ['id', 'name'],
            data: [
                [1, "Тестирование"],
                [2, "Администрирование"],
                [3, "Ведение"]
            ]
        }
    }
});
