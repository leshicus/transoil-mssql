Ext.define('App.view.manage.question.question.GridQuestionV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.manage.question.question.GridQuestionM',
        'App.view.manage.question.question.GridQuestionC',
        'Ext.form.field.FileButton',
        'Ext.form.trigger.Component'
    ],
    viewModel: {type: 'gridQuestion'},
    controller:'gridQuestion',
    bind: '{question}',
    alias: 'widget.gridQuestion',
    itemId: 'gridQuestion',
    frame: false,
    flex: 1,
    //forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    title: 'Вопросы',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'ddgroup'
        },
        stripeRows: true
    },
    selModel: {
        mode: 'MULTI',
        ignoreRightMouseSelection: true
    },
    rowLines: true,
    selType: 'checkboxmodel',
    columnLines: true,
    initComponent: function () {
        console.log('GridQuestion init');

        this.tools = [
        /*    {
                type: 'help',
                itemId: 'instruction',
                tooltip: 'Word-инструкция'
            },*/
            {
                type: 'refresh',
                itemId: 'refreshGridQuestionS',
                tooltip: 'Обновить'
            }
        ]

        this.tbar = [
            {
                text: 'Добавить',
                action: 'add',
                scale: 'medium',
                iconCls: 'icon_add'
            },
            '-',
            {
                text: 'Удалить',
                action: 'delete',
                scale: 'medium',
                iconCls: 'icon_delete'
            },
            '->',
            {
                text: 'Загрузка',
                action: 'import',
                scale: 'medium',
                iconCls: 'icon_import'
            },
            {
                text: 'Выгрузка',
                action: 'export',
                scale: 'medium',
                iconCls: 'icon_export'
            }
            /*{
                text: 'Выгрузка<br>download link',
                action: 'export2',
                scale: 'medium',
                iconCls: 'icon_export'
            },
            {
                text: 'Выгрузка<br>window.open',
                action: 'export3',
                scale: 'medium',
                iconCls: 'icon_export'
            }*/
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 50
            },
            {
                text: 'Текст вопроса',
                itemId: 'columnQuestiontext',
                dataIndex: 'questiontext',
                tdCls: 'wrapText',
                flex:1
            }
        ];
        this.callParent(arguments);
        console.log('GridQuestion end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    }
});