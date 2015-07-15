Ext.define('App.view.admin.clas.GridPersonV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'App.view.admin.clas.GridPersonC',
        'App.view.admin.clas.GridPersonM'
    ],
    alias: 'widget.gridPerson',
    viewModel: {type: 'gridperson'},
    controller:'gridperson',
    itemId: 'gridPerson',
    //margin: '0 0 0 5',
    bind: '{person}',
    title: 'Сотрудники',
    columnLines: true,
    selType: 'checkboxmodel',
    forceFit:true,
    viewConfig: {
        stripeRows: true,
        preserveScrollOnRefresh: true
    },
    initComponent: function () {
        console.log('GridPerson init');

        var self = this;

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox:0,
            mode:'MULTI'
        });

        this.tbar = [
            {
                text: 'Удалить',
                action: 'delete',
                scale:'medium',
                iconCls: 'icon_delete'
            }
        ];

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridPerson',
                tooltip: 'Обновить'
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'ФИО',
                itemId: 'columnFio',
                dataIndex: 'fio',
                //flex:1
            },
            {
                text: 'Время',
                itemId: 'columnTime',
                dataIndex: 'timelimit',
                width: 60
            },
            {
                text: 'Баллы',
                itemId: 'columnBalls',
                dataIndex: 'balls',
                width: 60
            },
            {
                text: 'Результат',
                itemId: 'columnResult',
                dataIndex: 'result',
                width: 130,
                renderer:App.util.Utilities.renderResult
            },
            {
                text: 'Регистрация',
                itemId: 'columnReg',
                dataIndex: 'reg',
                width: 150,
                renderer:function (value, metaData) {
                    if (value == 1) {
                        metaData.style += 'color:green; font-weight: bold;';
                        return App.util.Utilities.regString;
                    } else if (value == 0 || value == null){
                        metaData.style += 'color:red; font-weight: bold;';
                        return App.util.Utilities.unregString;
                    }
                }
            }
        ];

        this.callParent(arguments);
        console.log('GridPerson end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    }
});