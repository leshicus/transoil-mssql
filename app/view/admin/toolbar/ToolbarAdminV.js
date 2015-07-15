Ext.define('App.view.admin.toolbar.ToolbarAdminV', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        'App.view.admin.toolbar.ToolbarAdminC'
    ],
    alias: 'widget.toolbarAdmin',
    itemId: 'toolbarAdmin',
    controller: 'toolbaradmin',
    defaults: {
        toggleGroup: "admin",
        allowDepress: true
    },
    initComponent: function () {
        console.log('ToolbarAdminV init');

        this.items = [
            {
                text: 'Выход',
                itemId: 'mainMI',
                scale: 'medium',
                iconCls: 'icon_back'
            },
            '-',
            {
                text: 'Пользователи',
                itemId: 'userMI',
                scale: 'medium',
                iconCls: 'icon_user'
            },
            {
                text: 'Журнал',
                itemId: 'logMI',
                scale: 'medium',
                iconCls: 'icon_log'
            },
            {
                text: 'Класс',
                itemId: 'classMI',
                scale: 'medium',
                iconCls: 'icon_class'
            },
            {
                text: 'Статистика',
                itemId: 'statMI',
                scale: 'medium',
                iconCls: 'icon_chart'
            },
            '->',
            {
                text: 'Настройки',
                itemId: 'toolMI',
                scale: 'medium',
                iconCls: 'icon_tool'
            }
        ];
        this.callParent(arguments);
        console.log('ToolbarAdminV end');
    }
});