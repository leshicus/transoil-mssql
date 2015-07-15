Ext.define('App.view.admin.clas.GridExamC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.clas.MenuExamV'
    ],
    alias: 'controller.gridexam',

    control: {
        '#': {
            cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('gridExam cellclick');

                var gridSigngroup = grid.up('#content').down('gridSigngroup'),
                    gridPerson = grid.up('#content').down('gridPerson'),
                    gridExam = grid.up('gridExam'),
                    selection = gridExam.getSelected()[0];
                if (selection) {
                    var examid = selection.get('examid'),
                        storePerson = gridPerson.getViewModel().getStore('person'),
                        storeSigngroup = gridSigngroup.getViewModel().getStore('signgroup');
                    storeSigngroup.load({
                        params: {
                            examid: examid
                        }
                    });
                    storePerson.load({
                        params: {
                            examid: examid
                        }
                    });
                }

                // * опрос подавших заявку на тест в классе
                var taskClassCheck = {
                    run: function () {
                        storePerson.reload();
                    },
                    interval: 1000 * Utilities.getTool('regstatint'), // в секундах
                    duration: 1000 * 60 * Utilities.getTool('regstatdur')
                };

                // * старт опроса подавших заявки сотрудников в классе
                Ext.TaskManager.start(taskClassCheck);
            },
            // * чтобы контекстное меню показывалось
            itemcontextmenu: function (view, rec, node, index, e) {
                e.stopEvent();
                var menu = Ext.create('App.view.admin.clas.MenuExamV');
                menu.showAt(e.getXY());
                return false;
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    vm = grid.getViewModel(),
                    store = vm.getStore('exam'),
                    main = Ext.ComponentQuery.query('main')[0],
                    vmMain = main.getViewModel(),
                    storeOrg = vmMain.getStore('org'),
                    minOrgRec = storeOrg.getAt(0),
                    minOrgid = minOrgRec.get('orgid'),
                    newRecord = store.insert(0, {orgid: minOrgid})[0];
                grid.getSelectionModel().select(newRecord);
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('gridExam'),
                    content = grid.up('#content'),
                    selection = grid.getSelectionModel().getSelection()[0],
                    examid = selection.get('examid'),
                    gridPerson = content.down('gridPerson'),
                    storePerson = gridPerson.getViewModel().getStore('person'),
                    recordUser = storePerson.findRecord('examid', examid, 0, false, true, true);
                if (examid && !recordUser) {
                    grid.store.remove(selection);
                } else {
                    Ext.Msg.alert('Не удалено', 'В классе находятся сотрудники');
                }
            }
        },
        '#dateFindFrom': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
                if (e.getKey() == e.ENTER) {
                    if (field.isValid()) {
                        var grid = field.up('grid'),
                            dateFindTo = grid.down('#dateFindTo');
                        if (dateFindTo.isValid()) {
                            grid.getViewModel().getStore('exam').load({
                                params: {
                                    dateFindFrom: field.getValue(),
                                    dateFindTo: dateFindTo.getValue()
                                }
                            });
                        }
                    }
                }
            },
            select: function (field, records) {
                if (field.isValid()) {
                    var grid = field.up('grid'),
                        dateFindTo = grid.down('#dateFindTo');
                    if (dateFindTo.isValid()) {
                        grid.getViewModel().getStore('exam').load({
                            params: {
                                dateFindFrom: field.getValue(),
                                dateFindTo: dateFindTo.getValue()
                            }
                        });
                    }
                }
            }
        },
        '#dateFindTo': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
                if (e.getKey() == e.ENTER) {
                    if (field.isValid()) {
                        var grid = field.up('grid'),
                            dateFindFrom = grid.down('#dateFindFrom');
                        if (dateFindFrom.isValid()) {
                            grid.getViewModel().getStore('exam').load({
                                params: {
                                    dateFindFrom: dateFindFrom.getValue(),
                                    dateFindTo: field.getValue()
                                }
                            });
                        }

                    }
                }
            },
            select: function (field, records) {
                if (field.isValid()) {
                    var grid = field.up('grid'),
                        dateFindFrom = grid.down('#dateFindFrom');
                    if (dateFindFrom.isValid()) {
                        grid.getViewModel().getStore('exam').load({
                            params: {
                                dateFindFrom: dateFindFrom.getValue(),
                                dateFindTo: field.getValue()
                            }
                        });
                    }

                }
            }
        },
        '#refreshGridExamS': {
            click: function (button) {
                console.log('click refreshGridExamS');

                var gridExam = button.up('grid');
                gridExam.getViewModel().getStore('exam').reload();
            }
        }
    }
});
