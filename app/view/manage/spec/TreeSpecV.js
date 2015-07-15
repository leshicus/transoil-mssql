Ext.define('App.view.manage.spec.TreeSpecV', {
    extend: 'Ext.tree.TreePanel',
    requires: [
        'App.view.manage.spec.TreeSpecC',
        'App.view.manage.spec.TreeSpecM'
    ],
    viewModel: {type: 'treeSpec'},
    controller:'treeSpec',
    bind: '{treespec}',
    border: 5,
    title: 'Структура',
    alias:'widget.treeSpec',
    itemId:'treeSpec',
    margin: '0 5 0 0',
    resizable:true,
    rootVisible : false,
    _collapsed: true,
    viewConfig: {
        stripeRows: true,
        plugins: {
            ptype: 'treeviewdragdrop',
            dropGroup: 'ddspec',
            sortOnDrop: true, // * чтобы deselect происходил
            enableDrag: false,
            containerScroll: true
        }
    },
    initComponent: function(){
        this.tools = [
            {
                type: 'maximize',
                tooltip: 'Скрыть/Раскрыть'
            },
            {
                type:'refresh',
                itemId:'refreshTreeSpec',
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
