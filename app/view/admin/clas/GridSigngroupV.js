Ext.define('App.view.admin.clas.GridSigngroupV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.admin.clas.GridSigngroupM',
        'App.view.admin.clas.GridSigngroupC'
    ],
    alias: 'widget.gridSigngroup',
    viewModel: {type: 'gridsigngroup'},
    controller:'gridsigngroup',
    itemId: 'gridSigngroup',
    height:250,
    forceFit: true,
    bind:'{signgroup}',
    title: 'Комиссия',
    columnLines: true,
    viewConfig: {
        stripeRows: true
    },
    initComponent: function () {
        console.log('GridSigngroup init');

        this.plugins = [ Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 2
            })
        ];

        this.tbar = App.util.Utilities.buttonSaveDelete;

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Фамилия',
                itemId: 'columnFamily',
                dataIndex: 'familyname',
                width: 50,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },
            {
                text: 'Имя',
                itemId: 'columnName',
                dataIndex: 'firstname',
                width: 50,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },
            {
                text: 'Отчество',
                itemId: 'columnLastname',
                dataIndex: 'lastname',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }
        ];
        this.callParent(arguments);
        console.log('GridSigngroup end');
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