Ext.define('App.view.admin.log.GridLogC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.gridlog',

    control: {
        '#refreshGridLogS': {
            click: function (button) {
                console.log('click refreshGridLogS');

                var gridLog = button.up('grid'),
                    dateFindFrom = gridLog.down('#dateFindFrom'),
                    dateFindTo = gridLog.down('#dateFindTo'),
                    comboLogtype = gridLog.down('#comboLogtype');
                gridLog.getViewModel().getStore('log').load({
                    params: {
                        dateFindFrom: dateFindFrom.getValue(),
                        dateFindTo: dateFindTo.getValue(),
                        comboLogtype:comboLogtype.getValue()
                    }
                });
            }
        },
        '#dateFindFrom': {
            specialkey: function (field, e) {

            },
            select: function (field, records) {
                if(field.isValid()){
                    var grid = field.up('grid'),
                        dateFindTo = grid.down('#dateFindTo'),
                        comboLogtype = grid.down('#comboLogtype');
                    grid.getViewModel().getStore('log').load({
                        params: {
                            dateFindFrom: field.getValue(),
                            dateFindTo: dateFindTo.getValue(),
                            comboLogtype:comboLogtype.getValue()
                        }
                    });
                }
            }
        },
        '#dateFindTo': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }

            },
            select: function (field, records) {
                var grid = field.up('grid'),
                    dateFindFrom = grid.down('#dateFindFrom'),
                    comboLogtype = grid.down('#comboLogtype');
                grid.getViewModel().getStore('log').load({
                    params: {
                        dateFindFrom: dateFindFrom.getValue(),
                        dateFindTo: field.getValue(),
                        comboLogtype:comboLogtype.getValue()
                    }
                });
            }
        },
        '#comboLogtype': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
            },
            select: function (combo, records) {
                var grid = combo.up('grid'),
                    dateFindFrom = grid.down('#dateFindFrom'),
                    dateFindTo = grid.down('#dateFindTo');
                grid.getViewModel().getStore('log').load({
                    params: {
                        dateFindFrom: dateFindFrom.getValue(),
                        dateFindTo: dateFindTo.getValue(),
                        comboLogtype:combo.getValue()
                    }
                });
            }
        }

    }
});
