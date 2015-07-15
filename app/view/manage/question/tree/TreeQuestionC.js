Ext.define('App.view.manage.question.tree.TreeQuestionC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.treeQuestion',

    control: {
        '#': {
            cellclick: function (tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('treeQuestion cellclick');

                var treeQuestion = tree.up('#content').down('treepanel'),
                    gridQuestion = tree.up('#content').down('gridQuestion'),
                    storeQuestion = gridQuestion.getViewModel().getStore('question'),
                    selection = treeQuestion.getSelected(),
                    gridAnswer = tree.up('#content').down('gridAnswer'),
                    storeAnswer = gridAnswer.getViewModel().getStore('answer');

                storeAnswer.filterBy(function () {
                    return false
                });

                if (selection) { // * без этого ругается, когда на + нажимаешь
                    if (selection.raw) { // * что-то выбрали
                        var knowid = selection.raw.knowid,
                            groupid = selection.raw.groupid,
                            orgid = selection.raw.orgid,
                            actid = selection.raw.actid,
                            id = selection.raw.id;
                        storeQuestion.clearFilter();

                        gridQuestion.mask('Загружаем вопросы...');
                        Ext.defer(function () {
                            storeQuestion.load({
                                params: {
                                    id: id,
                                    orgid: orgid,
                                    actid: actid,
                                    knowid: knowid,
                                    groupid: groupid
                                },
                                callback: function () {
                                    gridQuestion.unmask();
                                }
                            });
                        }, 20);
                    }
                }
            }
        },
        'tool[type=maximize]': {
            click: function (button, e, tree) {
                Utilities.treeCollapse(button, e, tree);
            }
        },
        'dataview': {
            // чтобы не добавлялась запись в tree при драгндропе:
            // сохраняем перемещаемую запись в переменную droppedRecords, очищаем список перемещаемых записей
            beforedrop: function (node, gridRec, overModel, dropPos, opts) {
                this.droppedRecords = gridRec.records;
                gridRec.records = [];
            },
            nodedragover: function (targetNode, position, dragData) { // * добавляьб только в ОЗ
                var knowid;
                if (targetNode.raw) {
                    knowid = targetNode.raw.knowid;
                }
                return knowid ? true : false;
            },
            drop: function (node, data, treeRec, dropPosition) {
                Ext.getBody().mask('Идет перемещение...');
                // * отложенный вызов функции, чтобы маска успевала поставиться
                Ext.defer(function () {
                    var treeQuestion = Ext.ComponentQuery.query('treeQuestion')[0],
                        sel = treeQuestion.getSelected(),
                        gridQuestion = treeQuestion.up('#content').down('gridQuestion'),
                        storeQuestion = gridQuestion.getViewModel().getStore('question'),
                        gridAnswer = treeQuestion.up('#content').down('gridAnswer'),
                        storeAnswer = gridAnswer.getViewModel().getStore('answer'),
                        knowid,
                        groupid;
                    storeAnswer.filterBy(function () {
                        return false
                    });
                    Ext.iterate(this.droppedRecords, function (record) {
                        var questionid = record.get('questionid'),
                            oldRec = storeQuestion.findRecord('questionid', questionid, 0, false, true, true);
                        gridQuestion.getViewModel().getStore('question').clearFilter();
                        if (treeRec.raw) {
                            knowid = treeRec.raw.knowid;
                            groupid = treeRec.raw.groupid;
                            oldRec.set('knowid', knowid);
                            oldRec.set('groupid', groupid);
                        }
                    });
                    this.droppedRecords = undefined;
                    storeQuestion.sync({
                        success: function () {
                            gridQuestion.getViewModel().getStore('question').load({
                                params: {
                                    knowid: knowid,
                                    groupid: groupid
                                }
                            });
                            Ext.getBody().unmask();
                        },
                        failure: function () {
                            Ext.getBody().unmask();
                            App.util.Utilities.errorMessage('Ошибка перемещения', 'Во время перемещения вопросов возникла ошибка');
                        },
                        scope: this
                    });
                    gridQuestion.getSelectionModel().deselectAll();
                    treeQuestion.getSelectionModel().select(treeRec);
                }, 10, this);
            }
        },
        '#refreshTreeQuestionS': {
            click: function (button) {
                console.log('click refreshTreeQuestionS');

                var treeQuestion = button.up('treepanel'),
                    storeTree = treeQuestion.getViewModel().getStore('treequestion'),
                    gridAnswer = treeQuestion.up('#content').down('gridAnswer'),
                    storeAnswer = gridAnswer.getViewModel().getStore('answer'),
                    gridQuestion = treeQuestion.up('#content').down('gridQuestion'),
                    storeQuestion = gridQuestion.getViewModel().getStore('question');
                storeAnswer.filterBy(function () {
                    return false
                });
                storeQuestion.filterBy(function () {
                    return false
                });
                storeTree.reload();
            }
        }

    }
});
