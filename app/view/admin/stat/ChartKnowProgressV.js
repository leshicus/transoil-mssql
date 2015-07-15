Ext.define('App.view.admin.stat.ChartKnowProgressV', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.*',
        'App.store.admin.ChartKnowProgressS'
    ],
    alias: 'widget.chartKnowProgress',
    viewModel: {type: 'panelstat'},
    animate: true,
    shadow: true,
    // * title параметры - это из плагина Ext.ux.chart.TitleChart
    titleFont: 'bold 16px sans-serif',
    titlePadding: 5,
    titleMargin: 5,
    titleLocation: 'top',
    legend: {
        position: 'right'
    },
    insetPadding: 60,
    theme: 'Base',

    initComponent: function () {
        console.log('ChartKnowProgressV init');

        var store = Ext.create('App.store.admin.ChartKnowProgressS');
        this.items = [
            {
                xtype: 'polar',
                theme: 'default-gradients',
                width: '100%',
                height: 460,
                legend: {
                    docked: 'bottom'
                },
                store: store,
                insetPadding: {
                    top: 40,
                    left: 40,
                    right: 40,
                    bottom: 40
                },
                innerPadding: 20,
                interactions: ['rotate', 'itemhighlight'],
                sprites: [{
                    type: 'text',
                    text: 'Успеваемость по областям знаний',
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }],
                series: [
                    {
                        type: 'pie',
                        angleField: 'data',
                        showInLegend: true,
                        tips: {
                            trackMouse: true,
                            width: 140,
                            height: 28,
                            renderer: function (storeItem, item) {
                                //calculate percentage.
                                var total = 0;
                                store.each(function (rec) {
                                    total += rec.get('data');
                                });
                                this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
                            }
                        },
                        highlight: {
                            segment: {
                                margin: 20
                            }
                        },
                        label: {
                            field: 'name',
                            display: 'rotate',
                            contrast: true,
                            font: '18px Arial',
                            // * чтобы не показывались подписи если значение 0
                            renderer: function (val) {
                                var m = store.findRecord('name', val, 0, false, true, true);
                                return m.get('data') > 0 ? val : '';
                            }
                        }
                    }
                ]
            }
        ]

        this.callParent(arguments);
        console.log('ChartKnowProgressV end');
    }
});