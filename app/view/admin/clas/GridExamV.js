Ext.define('App.view.admin.clas.GridExamV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'App.view.admin.clas.GridExamM',
        'App.view.admin.clas.GridExamC',
        'App.view.common.AddDeleteV',
        'App.view.common.DateFromToV'
    ],
    alias: 'widget.gridExam',
    viewModel: {type: 'gridexam'},
    controller: 'gridexam',
    itemId: 'gridExam',
    flex: 1,
    forceFit: true,
    bind: '{exam}',
    title: 'Экзамены',
    columnLines: true,
    selType: 'checkboxmodel',
    viewConfig: {
        stripeRows: true
    },
    plugins: [
        {
            ptype: 'cellediting',
            pluginId: 'cellediting',
            clicksToEdit: 1,
            listeners: {
                scope: 'this',
                // edit: 'onEdit'
            }
        }
    ],
    initComponent: function () {
        console.log('GridExam init');

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox: 0,
            mode: 'MULTI'
        });

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridExamS',
                tooltip: 'Обновить'
            }
        ]

        this.tbar = Ext.create('Ext.toolbar.Toolbar');

        var now = new Date(),
            year = now.getFullYear(),
            month = App.util.Utilities.reverseDate(now.getMonth() + 1),
            day = App.util.Utilities.reverseDate(now.getDate()),
            dateBegin = [[day, month, year].join('.'), '00:00'].join(' ');

        this.tbar.add(App.util.Utilities.buttonSaveDelete);
        this.tbar.add(
            {
                xtype: 'datefromto',
                _dateFrom: dateBegin,
                _allowBlankFrom: false,
                _allowBlankTo: true
            }
        );

        this.columns = [
            {
                text: 'Номер',
                itemId: 'columnExamid',
                dataIndex: 'examid',
                menuDisabled: true,
                width: 40
            },
            {
                text: 'Дата',
                itemId: 'columnExamdate',
                dataIndex: 'examdate',
                format: 'd.m.Y H:i',
                menuDisabled: true,
                width: 80
            },
            {
                text: 'ФИО наблюдателя',
                itemId: 'columnFio',
                dataIndex: 'fio',
                tdCls: 'wrapText'
            },
            {
                text: 'Организация',
                itemId: 'columnOrg',
                dataIndex: 'orgid',
                tdCls: 'wrapText',
                name: 'orgid',
                menuDisabled: true,
                width: 110,
                renderer: function (val) {
                    var main = Ext.ComponentQuery.query('main')[0],
                        vm = main.getViewModel(),
                        storeOrg = vm.getStore('org'),
                        record = storeOrg.findRecord('orgid', val, 0, false, true, true);
                    if (record.get('orgabbr'))
                        return record.get('orgabbr');
                },
                editor: {
                    xtype: 'combobox',
                    bind: {store: '{org}'},
                    editable: false,
                    queryMode: 'local',
                    valueField: 'orgid',
                    displayField: 'orgabbr'
                }
            }
        ];

        this.callParent(arguments);
        console.log('GridExam end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    },
    onEdit: function (b, a) {
        var c = this, d;
        if ("orgabbr" === a.field) {
            d = a.column.field;
            a.record.set({orgid: d.getValue(), orgabbr: d.getRawValue()});
        }
    }
});