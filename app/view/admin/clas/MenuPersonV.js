Ext.define('App.view.admin.clas.MenuPersonV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'App.view.admin.clas.MenuPersonC'
    ],
    alias: 'widget.menuperson',
    controller: 'menuperson',
    itemId: 'menuperson',
    plain: true,
    border: false,
    initComponent: function () {
        console.log('menuperson init');

        this.items = [
            {
                text:'Зарегистрировать',
                itemId:'menuReg',
                iconCls: 'icon_reg'
            },
            {
                text:'Снять регистрацию',
                itemId:'menuUnreg',
                iconCls: 'icon_unreg'
            },
            '-',
            {
                text:'Печать: одиночная ведомость',
                itemId:'menuPrintOne',
                iconCls: 'icon_pdf'
            }
        ]

        this.callParent(arguments);
        console.log('menuperson end');
    }

});