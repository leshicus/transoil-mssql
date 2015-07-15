Ext.define('App.view.admin.menuuser.MenuUserV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'App.view.admin.menuuser.MenuUserC'
    ],
    alias: 'widget.menuuser',
    controller: 'menuuser',
    itemId: 'menuuser',
    plain: true,
    border: false,
    initComponent: function () {
        console.log('MenuUserV init');

        this.items = [
            {
                text: 'Сбросить пароль',
                itemId: 'menuResetPassword',
                iconCls: 'icon_password'
            },
            '-',
            {
                text: 'Блокировать',
                itemId: 'menuBlock',
                iconCls: 'icon_block'
            },
            {
                text: 'Разблокировать',
                itemId: 'menuUnblock',
                iconCls: 'icon_unblock'
            }
        ]

        this.callParent(arguments);
        console.log('MenuUserV end');
    }

});