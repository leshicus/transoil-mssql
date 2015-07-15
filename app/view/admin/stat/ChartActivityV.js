Ext.define('App.view.admin.stat.ChartActivityV', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.*',
        'App.view.admin.stat.PanelStatM'
    ],
    alias: 'widget.chartActivity',
    viewModel: {type: 'panelstat'},
    itemId: 'chartActivity',
    flex: false,
    width: 400,
    initComponent: function () {
        console.log('ChartActivityV init');

        this.items = [
            {
                xtype: 'cartesian',
                itemId:'chart',
                width: '100%',
                height: 460,
                legend: {
                    docked: 'bottom'
                },
                insetPadding: {
                    top: 40,
                    left: 40,
                    right: 40,
                    bottom: 40
                },
                sprites: [{
                    type: 'text',
                    text: "Количество экзаменуемых по видам деятельности",
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        label: {
                            renderer: Ext.util.Format.numberRenderer('0,0')
                        },
                        title: 'Количество сотрудников',
                        grid: true,
                        minimum: 0
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        fields: ['name'],
                        title: 'Виды деятельности',
                        style: {
                            width: '50'
                        }
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        axis: 'left',
                        highlight: true,
                        tips: {
                            trackMouse: true,
                            width: 140,
                            height: 28,
                            renderer: function (storeItem, item) {
                                this.setTitle(item.field);
                            }
                        },
                        label: {
                            display: 'insideEnd',
                            'text-anchor': 'middle',
                            field: ['группа_1', 'группа_2', 'группа_3', 'группа_4', 'группа_5'],
                            renderer: Ext.util.Format.numberRenderer('0'),
                            orientation: 'vertical',
                            color: '#333'
                        },
                        stacked: true,
                        xField: 'name',
                        yField: ['группа_1', 'группа_2', 'группа_3', 'группа_4', 'группа_5']
                    }
                ]
            }
        ]

        this.callParent(arguments);
        console.log('ChartActivityV end');
    }
});