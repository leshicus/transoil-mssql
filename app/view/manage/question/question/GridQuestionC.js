Ext.define('App.view.manage.question.question.GridQuestionC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.question.question.FormQuestionV',
        'App.view.manage.question.question.FormUploadV',
        'Ext.dom.Helper',
        //'Ext.ux.IFrame'
    ],
    alias: 'controller.gridQuestion',

    control: {
        '#': {
            cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('gridQuestion cellclick');

                var gridAnswer = grid.up('#content').down('gridAnswer'),
                    storeAnswer = gridAnswer.getViewModel().getStore('answer'),
                    gridQuestion = this.getView(),
                    selection = gridQuestion.getSelected(),
                    questionid = selection[0].get('questionid');
                storeAnswer.clearFilter();
                storeAnswer.load({
                    params: {
                        questionid: questionid
                    }
                });
            },
            celldblclick: function (row, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('celldblclick');

                var form = Ext.create('App.view.manage.question.question.FormQuestionV');
                form.loadRecord(record);
                var window = Ext.create('Ext.Window', {
                    frame: true,
                    title: 'Редактирование вопроса',
                    width: 500,
                    height: 400,
                    closable: false,
                    modal: true,
                    layout: 'fit'
                });
                window.add(form);
                window.show();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');
                var treeQuestion = button.up('#content').down('treeQuestion'),
                    selectedTree = treeQuestion.getSelected();
                if (selectedTree != null) {
                    if (selectedTree.raw.leaf) {
                        var form = Ext.create('App.view.manage.question.question.FormQuestionV');
                        var window = Ext.create('Ext.Window', {
                            frame: true,
                            title: 'Редактирование вопроса',
                            width: 500,
                            height: 400,
                            closable: false,
                            modal: true,
                            layout: 'fit'
                        });
                        window.add(form);
                        window.show();
                    } else {
                        Ext.Msg.alert('Ошибка', 'Не выделена область знания');
                    }
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выделена область знания');
                }
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('gridQuestion'),
                    selection = grid.getSelected();

                if (selection != '') {
                    Ext.getBody().mask('Идет удаление...');
                    // * отложенный вызов функции, чтобы маска успевала поставиться
                    Ext.defer(function () {
                        Ext.each(selection, function (item) {
                            grid.getViewModel().getStore('question').remove(item);
                        });
                        grid.getViewModel().getStore('question').sync({
                            success: function (response, options) {
                                Ext.getBody().unmask();
                            },
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Вопрос не удален');
                                Ext.getBody().unmask();
                            },
                            scope: this
                        });
                    }, 10, this);
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выбран ни один вопрос');
                }
            }
        },
        'button[action=export]': {
            click: function (button) {
                console.log('action=export');

                var gridQuestion = button.up('gridQuestion'),
                    selection = gridQuestion.getSelected(),
                    arr = Array();
                if (selection.length) {

                    Ext.each(selection, function (item) {
                        arr.push(item.get('questionid'));
                    });
                    var str = arr.join(',');

                    /*работает, но только в браузере*/
                    /*var body = Ext.getBody(),
                        iframe = body.appendChild({
                            tag: 'iframe',
                            id: 'iframe-helper',
                            //cls: 'x-hidden',
                            name: 'iframe'
                        }),
                        form = body.appendChild({
                            tag: 'form',
                            method: 'post',
                            target: 'iframe-helper',
                            action: 'resources/php/manage/exportQuestion.php',
                            //cls: 'x-hidden'
                            style: "display:none"
                        }),
                        input = form.appendChild({
                            tag: 'input',
                            type: 'hidden',
                            name: 'str',
                            id: 'hidden-input',
                            value: str
                            //cls: 'x-hidden'
                        });
                    form.dom.submit();*/

                    var body = document.getElementsByTagName('body')[0],
                        iframe = document.createElement('iframe'),
                        form = document.createElement('form'),
                        input = document.createElement('input');
                    iframe.id = 'iframe-helper';
                    iframe.hidden = true;

                    form.method = 'post';
                    form.target = 'iframe-helper';
                    form.action = 'resources/php/manage/exportQuestion.php';

                    input.value = str;
                    input.name = 'str';

                    body.appendChild(iframe);
                    body.appendChild(form);
                    form.appendChild(input);
                    form.submit();


                    Ext.defer(function () {
                        form.removeChild(input);
                        body.removeChild(form);
                        body.removeChild(iframe);
                        /*iframe.destroy();
                        form.destroy();
                        input.destroy();*/
                    }, 1000, this);
                } else {
                    Ext.Msg.alert('Внимание', 'Отметьте вопросы для экспорта');
                }
            }
        },
        /*'button[action=export2]': {
            click: function (button) {
                console.log('action=export');

                var gridQuestion = button.up('gridQuestion'),
                    selection = gridQuestion.getSelected(),
                    arr = Array();
                if (selection.length) {

                    Ext.each(selection, function (item) {
                        arr.push(item.get('questionid'));
                    });
                    var str = arr.join(',');
                    Ext.Ajax.request({
                        url: 'resources/php/manage/exportQuestion.php',
                        params: {
                            str: str
                        },
                        success: function (response, options) {
                            var response = response.responseText;
                            *//*работает !!!, но только в браузере*//*
                            var a = window.document.createElement('a');
                            a.href = "data:application/octet-stream," + response;
                            a.download = "export.xml";
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        },
                        failure: function (response, options) {
                            Ext.Msg.alert('Ошибка', message);
                        }
                    });



                } else {
                    Ext.Msg.alert('Внимание', 'Отметьте вопросы для экспорта');
                }
            }
        },
        'button[action=export2]': {
            click: function (button) {
                console.log('action=export');

                var gridQuestion = button.up('gridQuestion'),
                    selection = gridQuestion.getSelected(),
                    arr = Array();
                if (selection.length) {

                    Ext.each(selection, function (item) {
                        arr.push(item.get('questionid'));
                    });
                    var str = arr.join(',');
                    Ext.Ajax.request({
                        url: 'resources/php/manage/exportQuestion.php',
                        params: {
                            str: str
                        },
                        success: function (response, options) {
                            var response = response.responseText;
                            function linkDownload(a, filename, content) {
                                contentType =  'data:application/octet-stream,';
                                uriContent = contentType + encodeURIComponent(content);
                                a.setAttribute('href', uriContent);
                                //a.setAttribute('download', filename);
                                a.download = filename;
                            };
                            function download(filename, content) {
                                var a = document.createElement('a'),
                                    body = document.getElementsByTagName('body')[0];
                                linkDownload(a, filename, content);
                                body.appendChild(a);
                                a.click();
                                body.removeChild(a);
                            };
                            download('export_question.xml', response);
                        },
                        failure: function (response, options) {
                            Ext.Msg.alert('Ошибка', message);
                        }
                    });
                } else {
                    Ext.Msg.alert('Внимание', 'Отметьте вопросы для экспорта');
                }
            }
        },
        'button[action=export3]': {
            click: function (button) {
                console.log('action=export');

                var gridQuestion = button.up('gridQuestion'),
                    selection = gridQuestion.getSelected(),
                    arr = Array();
                if (selection.length) {

                    Ext.each(selection, function (item) {
                        arr.push(item.get('questionid'));
                    });
                    var str = arr.join(',');
                    window.open('resources/php/manage/exportQuestion.php?str=' + str, '_blank','location=0');
                } else {
                    Ext.Msg.alert('Внимание', 'Отметьте вопросы для экспорта');
                }
            }
        },*/
        'button[action=import]': {
            click: function (button) {
                console.log('filefield');

                var treeQuestion = button.up('#content').down('treeQuestion'),
                    selectedTree = treeQuestion.getSelected();
                if (selectedTree != null) {
                    if (selectedTree.raw.leaf) {
                        var form = Ext.create('App.view.manage.question.question.FormUploadV'),
                            window = Ext.create('Ext.Window', {
                                frame: true,
                                title: 'Загрузка вопросов',
                                closable: false,
                                modal: true,
                                layout: 'fit'
                            });
                        window.add(form);
                        window.show();
                    } else {
                        Ext.Msg.alert('Ошибка', 'Не выделена область знания');
                    }
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выделена область знания');
                }
            }
        },
        'gridQuestion filefield': {
            change: function (field, value, eOpts) {
                console.log('filefield');
            }
        },
        '#refreshGridQuestionS': {
            click: function (button) {
                console.log('click refreshGridQuestionS');

                var gridQuestion = this.getView(),
                    treeQuestion = gridQuestion.up('#content').down('treeQuestion'),
                    selectedTree = treeQuestion.getSelected(),
                    gridAnswer = gridQuestion.up('#content').down('gridAnswer'),
                    storeAnswer = gridAnswer.getViewModel().getStore('answer');
                storeAnswer.filterBy(function () {
                    return false
                });
                if (selectedTree) {
                    if (selectedTree.raw) {
                        var knowid = selectedTree.raw.knowid,
                            groupid = selectedTree.raw.groupid,
                            orgid = selectedTree.raw.orgid,
                            actid = selectedTree.raw.actid;
                        gridQuestion.getViewModel().getStore('question').load({
                            params: {
                                knowid: knowid,
                                groupid: groupid,
                                orgid: orgid,
                                actid: actid
                            }
                        });
                    }
                } else {
                    App.util.Utilities.errorMessage('Ошибка', 'Не выбран каталог');
                }
            }
        },
        'gridQuestion #instruction': {
            click: function (button) {
                window.open('resources/php/instruction.php?taskname=question&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        }

    }
});
