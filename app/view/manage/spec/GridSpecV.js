Ext.define('App.view.manage.spec.GridSpecV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.main.MainM',
        'App.view.manage.spec.GridSpecC'
    ],
    viewModel: {type: 'main'},
    controller:'gridSpec',
    bind: '{spec}',
    alias: 'widget.gridSpec',
    itemId: 'gridSpec',
    flex: 1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    title: 'Специальности',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'ddspec'
        },
        stripeRows: true,
        enableTextSelection:true
    },
    columnLines: true,
    initComponent: function () {
        console.log('GridSpec init');

        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 2
            })
        ];

        this.tbar = App.util.Utilities.buttonSaveDelete;

        this.tools = [
         /*   {
                type: 'help',
                itemId: 'instruction',
                tooltip: 'Word-инструкция'
            },*/
            {
                type: 'refresh',
                itemId: 'refreshGridSpecS',
                tooltip: 'Обновить'
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Специальность',
                itemId: 'columnSpecname',
                dataIndex: 'specname',
                tdCls: 'wrapText',
                editor: {
                    xtype: 'textfield'
                }
             }
        ];
        this.callParent(arguments);
        console.log('GridSpec end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        if (rs.length) {
            return rs[0];
        }
        return null;
    }
});