Ext.define('App.view.manage.question.answer.GridAnswerV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.manage.question.answer.GridAnswerM',
        'App.view.manage.question.answer.GridAnswerC',
        'Ext.grid.column.Check'
    ],
    viewModel: {type: 'gridanswer'},
    controller:'gridanswer',
    bind: '{answer}',
    alias: 'widget.gridAnswer',
    itemId: 'gridAnswer',
    frame: false,
    flex: 1,
    //forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    title: 'Ответы',
    columnLines: true,
    selType: 'checkboxmodel',
    viewConfig: {
        stripeRows: true
    },
    initComponent: function () {
        console.log('GridAnswers init');

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox: 0,
            mode: 'MULTI'
        });

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
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 50
            },
            {
                text: 'Текст ответа',
                itemId: 'columnAnswertext',
                dataIndex: 'answertext',
                tdCls: 'wrapText',
                flex:1
            },
            {
                xtype: 'checkcolumn',
                header: 'Верный',
                itemId: 'columnCorrect',
                dataIndex: 'correct',
                width: 60,
                processEvent: function () {
                    return false;
                }
            },
            {
                text: 'Нормативный документ',
                itemId: 'columnNormdoc',
                dataIndex: 'normdoc',
                width: 170,
                tdCls: 'wrapText'
            }
        ];
        this.callParent(arguments);
        console.log('GridAnswers end');
    },

    // отмеченные ячейки (массив)
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    }
});