Ext.define('App.view.user.toolbar.ToolbarUserV', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        'App.view.user.toolbar.ToolbarUserC',
    ],
    alias: 'widget.toolbarUser',
    controller: 'toolbaruser',
    itemId: 'toolbarUser',
    defaults    : {
        toggleGroup    : "user",
        allowDepress    : true
    },
    initComponent: function () {
        console.log('ToolbarUserV init');

        this.items = [
            {
                text: 'Выход',
                itemId: 'mainMI',
                scale:'medium',
                iconCls: 'icon_back'
            },
            '-',
            {
                text: 'Тестирование',
                itemId: 'testMI',
                scale:'medium',
                iconCls: 'icon_test'
            },
            {
                text: 'Самоподготовка',
                itemId: 'selfMI',
                scale:'medium',
                iconCls: 'icon_self'
            }
        ];
        this.callParent(arguments);
        console.log('ToolbarUserV end');
    }
});