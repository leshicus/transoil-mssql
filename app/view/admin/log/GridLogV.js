Ext.define('App.view.admin.log.GridLogV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.admin.log.GridLogM',
        'App.view.admin.log.GridLogC',
        'App.view.common.DateFromToV'
    ],
    alias: 'widget.gridLog',
    viewModel: {type: 'gridlog'},
    controller: 'gridlog',
    itemId: 'gridLog',
    flex: 1,
    //forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    bind: {store: '{log}'},
    title: 'Журнал действий пользователя',
    columnLines: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true // * allow to select text in grid. Actually it's a gridview property
    },
    initComponent: function () {
        console.log('GridLog init');

        var now = new Date(),
            year = now.getFullYear(),
            month = App.util.Utilities.reverseDate(now.getMonth() + 1),
            day = App.util.Utilities.reverseDate(now.getDate()),
            dateBegin = [[day, month, year].join('.'), '00:00'].join(' ');

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridLogS',
                tooltip: 'Обновить'
            }
        ]

        this.tbar = [
            {
                xtype: 'combo',
                bind: {store: '{logtype}'},
                emptyText: 'Тип',
                itemId: 'comboLogtype',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                displayField: 'name'
            },
            {
                xtype: 'datefromto',
                _dateFrom: dateBegin,
                _allowBlankFrom: false
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 60
            },
            {
                text: 'Дата',
                itemId: 'columnLogdate',
                dataIndex: 'logdate',
                format: 'd.m.Y H:i',
                width: 130
            },
            {
                text: 'Пользователь',
                itemId: 'columnUserid',
                dataIndex: 'fio',
                width: 230
            },
            {
                text: 'Тип',
                itemId: 'columnLogtypeid',
                dataIndex: 'logtypename',
                width: 150
            },
            {
                text: 'Параметр',
                itemId: 'columnParameter',
                dataIndex: 'parameter',
                tdCls: 'wrapText',
                flex: 1
            }

        ];
        this.callParent(arguments);
        console.log('GridLog end');
    }
});