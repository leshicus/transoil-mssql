Ext.define('App.view.admin.stat.PanelStatM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.Store'
    ],
    alias: 'viewmodel.panelstat',
    stores: {
        stat: {
            fields: ['id', 'name'],
            data: [
                ["1", "Количество экзаменуемых по видам деятельности"],
                ["2", "Успеваемость по видам деятельности"],
                ["3", "Успеваемость по областям знаний"]
            ]
        },
        chartactivityprogress:{
            fields:[
                {name:'name'},
                {name:'data',type:'int'},
                {name:'result'}
            ],
            proxy:{
                type:'rest',
                url:'resources/php/admin/getChartActivityProgress.php',
                reader:{
                    type:'json'
                }
            }
        },
        chartactivity:{
            fields:[
                {name:'name'}
            ],
            proxy:{
                type:'ajax',
                url:'resources/php/admin/getChartActivity.php',
                reader:{
                    type:'json'
                },
                actionMethods: {
                    read: 'POST'
                }
            }
        },
        chartknowprogress: {
            fields:[
                {name:'name'},
                {name:'data',type:'int'}
            ],
            proxy:{
                type:'rest',
                url:'resources/php/admin/getChartKnowProgress.php',
                reader:{
                    type:'json'
                }
            }
        }
    }
});
