Ext.define('App.view.manage.act.GridActV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.main.MainM',
        'App.view.manage.act.GridActC'
    ],
    alias: 'widget.gridAct',
    viewModel: {type: 'main'},
    controller: 'gridAct',
    bind: '{act}',
    itemId: 'gridAct',
    frame: false,
    flex: 1,
    forceFit: true,
    title: 'Виды деятельности',
    columnLines: true,
    viewConfig: {
        stripeRows: true
    },
    initComponent: function () {
        console.log('GridAct init');

        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];

        this.tbar = App.util.Utilities.buttonSaveDelete;

        this.tools = [
          /*  {
                type: 'help',
                itemId: 'instruction',
                tooltip: 'Word-инструкция'
            },*/
            {
                type: 'refresh',
                itemId: 'refreshGridActS',
                tooltip: 'Обновить'
            }
        ]

        var comboOrg = Ext.create('Ext.form.ComboBox', {
            bind: {store: '{org}'},
            viewModel: {type: 'main'},
            valueField: 'orgid',
            name: 'orgid',
            editable: false,
            queryMode: 'local',
            displayField: 'orgabbr'
        });

        this.columns = [
            {
                text: 'Номер',
                itemId: 'columnActnum',
                dataIndex: 'actnum',
                width: 70,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Краткое наименование',
                itemId: 'columnActabbr',
                dataIndex: 'actabbr',
                tdCls: 'wrapText',
                width: 160,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Полное наименование',
                itemId: 'columnActname',
                dataIndex: 'actname',
                tdCls: 'wrapText',
                width: 400,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Организация',
                itemId: 'columnOrgid',
                dataIndex: 'orgid',
                width: 200,
                editor: comboOrg,
                renderer: Utilities.renderOrg(comboOrg)
            },
            {
                text: 'Лимит времени (мин)',
                itemId: 'columnTimelimit',
                dataIndex: 'timelimit',
                width: 150,
                editor: {
                    xtype: 'textfield'
                }
            }
        ];
        this.callParent(arguments);
        console.log('GridAct end');
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