Ext.define('App.view.manage.org.GridOrgV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.main.MainM',
        'App.view.manage.org.GridOrgC'
    ],
    viewModel: {type: 'main'},
    controller:'gridOrg',
    bind: '{org}',
    alias: 'widget.gridOrg',
    itemId: 'gridOrg',
    frame: false,
    forceFit: true,
    flex:1,
    title: 'Организации',
    columnLines: true,
    viewConfig: {
        stripeRows: true
    },
    initComponent: function () {
        console.log('GridOrg init');

        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];

        this.tbar = App.util.Utilities.buttonSaveDelete;

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridOrgS',
                tooltip: 'Обновить'
            }
        ]

        this.columns = [
            {
                text: 'Краткое наименование',
                itemId: 'columnOrgabbr',
                dataIndex: 'orgabbr',
                width:200,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Полное наименование',
                itemId: 'columnOrgname',
                dataIndex: 'orgname',
                tdCls: 'wrapText',
                //flex:1,
                width:400,
                editor: {
                    xtype: 'textfield'
                }
            }
        ];
        this.callParent(arguments);
        console.log('GridOrg end');
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