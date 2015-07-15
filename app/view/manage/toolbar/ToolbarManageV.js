Ext.define('App.view.manage.toolbar.ToolbarManageV', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        'App.view.manage.toolbar.ToolbarManageC'
    ],
    alias: 'widget.toolbarManage',
    controller: 'toolbarmanage',
    itemId: 'toolbarManage',
    defaults: {
        toggleGroup: "manage",
        allowDepress: true
    },
    initComponent: function () {
        console.log('ToolbarManageV init');

        this.items = [
            {
                text: 'Выход',
                itemId: 'mainMI',
                scale: 'medium',
                iconCls: 'icon_back'
            },
            '-',
            {
                text: 'Вопросы',
                itemId: 'questionMI',
                scale: 'medium',
                iconCls: 'icon_question'
            },
            {
                text: 'Специальности',
                itemId: 'specialityMI',
                scale: 'medium',
                iconCls: 'icon_spec'
            },
            {
                text: 'Группы',
                itemId: 'groupMI',
                scale: 'medium',
                iconCls: 'icon_group'
            },
            {
                text: 'Виды деятельности',
                itemId: 'activityMI',
                scale: 'medium',
                iconCls: 'icon_act'
            },
            {
                text: 'Области знания',
                itemId: 'knowMI',
                scale: 'medium',
                iconCls: 'icon_know'
            },
            {
                text: 'Организации',
                itemId: 'orgMI',
                scale: 'medium',
                iconCls: 'icon_org'
            }
        ];
        this.callParent(arguments);
        console.log('ToolbarManageV end');
    }
});