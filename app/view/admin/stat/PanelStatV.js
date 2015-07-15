Ext.define('App.view.admin.stat.PanelStatV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.admin.stat.PanelStatM',
        'App.view.admin.stat.PanelStatC',
        'App.view.common.DateFromToV'
    ],
    alias: 'widget.panelStat',
    viewModel: {type: 'panelstat'},
    controller: 'panelstat',
    itemId: 'panelStat',
    flex: 1,
    autoScroll:true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('PanelStatV init');

        var now = new Date(),
            year = now.getFullYear(),
            month = App.util.Utilities.reverseDate(now.getMonth() + 1),
            daysCount = new Date(year, month, 0).getDate(),
            dateBegin = [['01', month, year].join('.'), '00:00'].join(' '),
            dateEnd = [[daysCount, month, year].join('.'), '23:59'].join(' ');
        this.items = [
// * левая половина: Установки
            {
                xtype: 'panel',
                width: 300,
                itemId: 'panelSet',
                title: 'Установка',
                margin: 5,
                cls: 'my_shadowborder',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    margin: '5 5 5 5',
                    labelWidth: 130
                },
                items: [
                    {
                        xtype: 'datefromto',
                        _dateFrom: dateBegin,
                        _dateTo: dateEnd,
                        _allowBlankFrom: false,
                        _allowBlankTo: false
                    },
                    {
                        xtype: 'combo',
                        bind:{
                            store:'{org}'
                        },
                        itemId: 'comboOrg',
                        queryMode: 'local',
                        editable: false,
                        valueField: 'orgid',
                        displayField: 'orgname',
                        emptyText: 'Организация'
                    },
                    {
                        xtype: 'combo',
                        bind:{
                            store:'{stat}'
                        },
                        itemId: 'comboStat',
                        queryMode: 'local',
                        editable: false,
                        valueField: 'id',
                        displayField: 'name',
                        emptyText: 'Вид отчета'
                    }
                ]
            },
// * Диаграмма
            {
                xtype: 'panel',
                title: 'Диаграммы',
                itemId: 'panelChart',
                flex: 1,
                autoScroll:true,
                margin: 5,
                cls: 'my_shadowborder',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults:{
                    height:500,
                    border:1
                }
            }
        ];

        this.callParent(arguments);
        console.log('PanelStatV end');
    }
});