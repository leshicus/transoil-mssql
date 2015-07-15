// * кнопки Добавить Удалить
Ext.define('App.view.common.AddDeleteV', {
    extend: 'Ext.container.Container',
    requires: [

    ],
    xtype: 'adddelete',
    layout: {
        type: 'hbox'
    },
    defaults: {
        enableKeyEvents: true
    },
    initComponent: function () {
        this.items = [
            {
                xtype:'button',
                text: 'Добавить',
                action: 'add',
                scale: 'medium',
                iconCls: 'icon_add'
            },
            {
                xtype:'button',
                text: 'Удалить',
                action: 'delete',
                scale: 'medium',
                iconCls: 'icon_delete'
            }
        ];

        this.callParent();
    }
});