Ext.define('App.view.admin.griduser.GridUserV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.admin.griduser.GridUserM',
        'App.view.admin.griduser.GridUserC',
        'Ext.grid.column.RowNumberer',
        'Ext.toolbar.Paging'
    ],
    alias: 'widget.gridUser',
    viewModel: {type: 'griduser'},
    controller: 'griduser',
    itemId: 'gridUser',
    flex: 1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    bind: '{user}',
    title: 'Пользователи',
    columnLines: true,
    viewConfig: {
        stripeRows: true
    },
    initComponent: function () {
        console.log('GridUser init');

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridUserS',
                tooltip: 'Обновить'
            }
        ];

        this.tbar = Utilities.buttonSaveDelete;

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox: 0,
            mode: 'MULTI'
        });

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Фамилия',
                itemId: 'columnFamilyname',
                dataIndex: 'familyname'
            },
            {
                text: 'Имя',
                itemId: 'columnFirstname',
                dataIndex: 'firstname'
            },
            {
                text: 'Отчество',
                itemId: 'columnLastname',
                dataIndex: 'lastname'
            },
            {
                text: 'Специальность',
                itemId: 'columnSpecid',
                dataIndex: 'specid',
                tdCls: 'wrapText',
                renderer: function (val) {
                    /*var main = Ext.ComponentQuery.query('main')[0],
                        storeRole = main.getViewModel().getStore('spec'),
                        rec = storeRole.findRecord('id', val, 0, false, true, true);
                    if (rec)
                        return rec.get('specname');*/
                    var grid = this,
                        vm = grid.getViewModel(),
                        store = vm.getStore('spec'),
                        rec = store.findRecord('specid', val, 0, false, true, true);
                    if (rec)
                        return rec.get('specname');
                }
            },
            {
                text: 'Роль',
                itemId: 'columnRoleid',
                dataIndex: 'roleid',
                renderer: function (val) {
                    /*var main = Ext.ComponentQuery.query('main')[0],
                        storeRole = main.getViewModel().getStore('role'),
                        rec = storeRole.findRecord('id', val, 0, false, true, true);
                    if (rec)
                        return rec.get('name');*/
                    var grid = this,
                        vm = grid.getViewModel(),
                        store = vm.getStore('role'),
                        rec = store.findRecord('id', val, 0, false, true, true);
                    if (rec)
                        return rec.get('name');
                }
            },
            {
                text: 'Логин',
                itemId: 'columnLogin',
                dataIndex: 'login'
            },
            {
                text: 'Блокирован',
                itemId: 'columnStatus',
                width: 80,
                format: 'd.m.Y H:i',
                dataIndex: 'enddate',
                renderer: App.util.Utilities.columnStatus
            }
        ];

        this.callParent(arguments);
        console.log('GridUser end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    }
});