// * контейнер из дат от и до
Ext.define('App.view.common.DateFromToV', {
    extend: 'Ext.container.Container',
    requires: [
    ],
    xtype: 'datefromto',
    layout: {
        type: 'hbox'
    },
    defaults: {
        enableKeyEvents: true
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'datefield',
                itemId: 'dateFindFrom',
                emptyText: 'Дата c',
                width: 140,
                value: this._dateFrom,
                allowBlank:this._allowBlankFrom,
                format: 'd.m.Y H:i',
                altFormats: 'd.m.Y H:i'
            },
            {
                xtype: 'datefield',
                itemId: 'dateFindTo',
                emptyText: 'Дата по',
                width: 140,
                value: this._dateTo,
                allowBlank:this._allowBlankTo,
                margin: '0 0 0 2',
                format: 'd.m.Y H:i'
            }
        ];

        this.callParent();
    }
});
