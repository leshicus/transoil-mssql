Ext.define('App.view.manage.question.tree.TreeQuestionV', {
    extend: 'Ext.tree.TreePanel',
    requires: [
        'App.view.manage.question.tree.TreeQuestionC',
        'App.view.manage.question.tree.TreeQuestionM',
        'Ext.tree.View',
        'Ext.tree.Panel',
        'Ext.data.Session'
    ],
    viewModel: {type: 'treeQuestion'},
    controller: 'treeQuestion',
    frame: false,
    border: 5,
    title: 'Структура',
    alias: 'widget.treeQuestion',
    itemId: 'treeQuestion',
    forceFit: true,
    bind: '{treequestion}',
    margin: '0 5 0 0',
    resizable: true,
    _collapsed: true,
    rootVisible: false,
    viewConfig: {
        stripeRows: true,
        plugins: {
            ptype: 'treeviewdragdrop',
            dropGroup: 'ddgroup',
            sortOnDrop: true, // * чтобы deselect происходил
            enableDrag: false,
            containerScroll: true
        }
    },
    session: Ext.create('Ext.data.Session'),
    initComponent: function () {
        this.tools = [
            {
                type: 'maximize',
                tooltip: 'Скрыть/Раскрыть'
            },
            {
                type: 'refresh',
                itemId: 'refreshTreeQuestionS',
                tooltip: 'Обновить'
            }
        ]
        this.callParent(arguments);
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        if (rs.length) {
            return rs[0];
        }
        return null;
    }
});
