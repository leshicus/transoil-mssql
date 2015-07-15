Ext.define('App.view.admin.stat.PanelStatC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.stat.ChartActivityV',
        'App.view.admin.stat.ChartActivityProgressV',
        'App.view.admin.stat.ChartKnowProgressV'
    ],
    alias: 'controller.panelstat',

    control: {
        '#dateFindFrom, #dateFindTo': {
            select: function (field, val, eOpts) {
                console.log('dateFindFrom');
                var comboStat = field.up('panelStat').down('#comboStat');
                comboStat.reset();
            }
        },
        '#comboOrg': {
            select: function (combo, records, eOpts) {
                console.log('comboOrg');
                var comboStat = combo.up('panelStat').down('#comboStat');
                comboStat.reset();
            }
        },
        '#comboStat': {
            select: function (combo, records, eOpts) {
                console.log('comboStat');
                var type = records.get('id'),
                    panelStat = combo.up('#panelStat'),
                    dateFrom = panelStat.down('#dateFindFrom').getValue(),
                    dateTo = panelStat.down('#dateFindTo').getValue(),
                    org = panelStat.down('#comboOrg').getValue(),
                    panelChart = panelStat.down('#panelChart');
                if (!org) {
                    Ext.Msg.alert('Внимание', 'Укажите организацию');
                    return false;
                }
                if (!dateFrom || !dateTo) {
                    Ext.Msg.alert('Внимание', 'Укажите период');
                    return false;
                }
                panelChart.removeAll();
                switch (type) {
                    case '1':
                        var chart = Ext.create('App.view.admin.stat.ChartActivityV'),
                            storeAct = panelStat.getViewModel().getStore('chartactivity');
                        panelChart.add(chart);
                        storeAct.load({
                            params: {
                                dateFrom: dateFrom,
                                dateTo: dateTo,
                                org: org
                            },
                            callback: function (records, operation, success) {
                                if (success == true) {
                                    chart.down('cartesian').bindStore(storeAct);
                                } else {
                                    App.util.Utilities.errorMessage('Ошибка подключения к базе', 'График не получен');
                                }
                            },
                            scope: this
                        });
                        break;
                    case '2':
                        var storeAct = panelStat.getViewModel().getStore('chartactivity');

                        storeAct.load({
                            params: {
                                dateFrom: dateFrom,
                                dateTo: dateTo,
                                org: org
                            },
                            callback: function (records, operation, success) {
                                if (success == true) {
                                    // * получим сколько у нас будет графиков- сколько записей в storeAct

                                    storeAct.each(function (rec) {
                                        var act = rec.get('name'),
                                            storeAP = panelStat.getViewModel().getStore('chartactivityprogress'),
                                            chart = Ext.create('App.view.admin.stat.ChartActivityProgressV');

                                        // * для каждого вида деятельности грузим стор для своей диаграммы
                                        chart.down('polar').store.load({
                                            params: {
                                                dateFrom: dateFrom,
                                                dateTo: dateTo,
                                                act: act,
                                                org: org
                                            }
                                        });
                                        chart.title = act;
                                        panelChart.add(chart);
                                    });
                                } else {
                                    App.util.Utilities.errorMessage('Ошибка подключения к базе', 'График не получен');
                                }
                            },
                            scope: this
                        });
                        break;
                    case '3':
                        var storeAct = panelStat.getViewModel().getStore('chartactivity');
                        storeAct.load({
                            params: {
                                dateFrom: dateFrom,
                                dateTo: dateTo,
                                org: org
                            },
                            callback: function (records, operation, success) {
                                if (success == true) {
                                    // * получим сколько у нас будет графиков- сколько записей в storeAct
                                    storeAct.each(function (rec) {
                                        var act = rec.get('name'),
                                            storeAKP = panelStat.getViewModel().getStore('chartknowprogress'),
                                            chart = Ext.create('App.view.admin.stat.ChartKnowProgressV');
                                        // * для каждого вида деятельности грузим стор для своей диаграммы
                                        chart.down('polar').store.load({
                                            params: {
                                                dateFrom: dateFrom,
                                                dateTo: dateTo,
                                                act: act,
                                                org: org
                                            },
                                            callback: function (records, operation, success) {
                                                if (success == true) {
                                                    chart.title = act;
                                                    panelChart.add(chart);
                                                } else {
                                                    App.util.Utilities.errorMessage('Ошибка подключения к базе', 'График не получен');
                                                }
                                            },
                                            scope: this
                                        });


                                    });
                                } else {
                                    App.util.Utilities.errorMessage('Ошибка подключения к базе', 'График не получен');
                                }
                            },
                            scope: this
                        });
                        break;
                }

            }
        },
        '#dateFindFrom': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
            }
        },
        '#dateFindTo': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
            }
        }

    }
});
