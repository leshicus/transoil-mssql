Ext.define('App.view.manage.group.GridGroupV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.main.MainM',
        'App.view.manage.group.GridGroupC'
    ],
    viewModel: {type: 'main'},
    controller:'gridGroup',
    bind: '{group}',
    alias: 'widget.gridGroup',
    itemId: 'gridGroup',
    frame: false,
    flex: 1,
    forceFit: true,
    title: 'Группы',
    columnLines: true,
    viewConfig: {
        stripeRows: true
    },
    initComponent: function () {
        console.log('GridGroup init');

        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        this.tbar = App.util.Utilities.buttonSaveDelete;

        this.tools = [
            /*{
                type: 'help',
                itemId: 'instruction',
                tooltip: 'Word-инструкция'
            },*/
            {
                type: 'refresh',
                itemId: 'refreshGridGroupS',
                tooltip: 'Обновить'
            }
        ]

        var comboAct = Ext.create('Ext.form.ComboBox', {
                bind:{store:'{act}'},
                viewModel: {type: 'main'},
                valueField: 'actid',
                name: 'actid',
                editable: false,
                queryMode: 'local',
                displayField: 'actabbr'
            }),
            comboKnow = Ext.create('Ext.form.ComboBox', {
                bind:{store:'{know}'},
                viewModel: {type: 'main'},
                valueField: 'knowid',
                name: 'knowid',
                multiSelect: true,
                queryMode: 'local',
                editable: false,
                displayField: 'knowname'
            });

        this.columns = [
          /*  {
                text: 'id',
                itemId: 'columnGroupid',
                dataIndex: 'groupid',
                width: 50
            },*/
            {
                text: 'Вид<br>деятельности',
                itemId: 'columnActid',
                dataIndex: 'actid',
                name: 'actid',
                width: 130,
                editor: comboAct,
                renderer: Utilities.renderGridGroup(comboAct)
            },
            {
                text: 'Номер<br>группы',
                itemId: 'columnGroupnum',
                dataIndex: 'groupnum',
                width: 70,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Наименование',
                itemId: 'columnGroupname',
                dataIndex: 'groupname',
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Области знания',
                itemId: 'columnGroupknow',
                dataIndex: 'knowids',
                tdCls: 'wrapText',
                width: 300,
                editor: comboKnow,
                renderer: App.util.Utilities.renderGroupknow
            }
        ];
        this.callParent(arguments);
        console.log('GridGroup end');
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