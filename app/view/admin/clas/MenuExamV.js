Ext.define('App.view.admin.clas.MenuExamV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'App.view.admin.clas.MenuExamC'
    ],
    alias: 'widget.menuexam',
    controller: 'menuexam',
    itemId: 'menuexam',
    plain: true,
    border: false,
    initComponent: function () {
        console.log('menuexam init');

        this.items = [
            {
                text: 'Печать: Сводная экзаменационная ведомость',
                itemId: 'menuPrintConsolidated',
                iconCls: 'icon_excel'
            }
        ]

        this.callParent(arguments);
        console.log('menuexam end');
    }

});