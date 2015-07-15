Ext.define('App.view.admin.clas.MenuExamC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.menuexam',

    control: {
        '#menuPrintConsolidated': {
            click: function (button) {
                console.log('click menuPrintConsolidated');

                var grid = Ext.ComponentQuery.query('gridExam')[0],
                    selection = grid.getSelected(),
                    examArr = Array(),
                    dateFindFrom = grid.down('#dateFindFrom'),
                    dateFindTo = grid.down('#dateFindTo');
                Ext.each(selection, function (item) {
                    var examid = item.get('examid');
                    examArr.push(examid);
                });
                var params = 'examarr=' + examArr + '&dateFindFrom=' + Ext.Date.format(dateFindFrom.getValue(), 'd.m.Y') + '&dateFindTo=' + Ext.Date.format(dateFindTo.getValue(), 'd.m.Y');
                window.open('resources/php/admin/excelOneConsolidated.php?' + params, '_blank', 'location=0');
            }
            /*click: function (button) {
             console.log('click menuPrintConsolidated');

             var grid = Ext.ComponentQuery.query('gridExam')[0],
             selection = grid.getSelected(),
             examArr = Array(),
             dateFindFrom = grid.down('#dateFindFrom'),
             dateFindTo = grid.down('#dateFindTo'),
             time = new Date().getTime();
             Ext.each(selection, function (item) {
             var examid = item.get('examid');
             examArr.push(examid);
             });
             var params = 'examarr=' + examArr + '&dateFindFrom=' + Ext.Date.format(dateFindFrom.getValue(), 'd.m.Y') + '&dateFindTo=' + Ext.Date.format(dateFindTo.getValue(), 'd.m.Y');

             Ext.Ajax.request({
             url: 'resources/php/admin/excelOneConsolidated.php',
             params: {
             examarr: examArr,
             dateFindFrom: Ext.Date.format(dateFindFrom.getValue(), 'd.m.Y'),
             dateFindTo: Ext.Date.format(dateFindTo.getValue(), 'd.m.Y')
             },
             success: function (response, options) {
             var response = response.responseText,
             filename = 'сводная_ведомость_' + time + '.xml';

             var textFile = null,
             makeTextFile = function (text) {
             var data = new Blob([text], {type: 'text/plain'});

             // If we are replacing a previously generated file we need to
             // manually revoke the object URL to avoid memory leaks.
             if (textFile !== null) {
             window.URL.revokeObjectURL(textFile);
             }

             textFile = window.URL.createObjectURL(data);

             // returns a URL you can use as a href
             return textFile;
             };

             var create = document.getElementById('create'),
             textbox = document.getElementById('textbox');

             create.addEventListener('click', function () {
             var link = document.getElementById('downloadlink');
             link.href = makeTextFile(textbox.value);
             link.style.display = 'block';
             }, false);
             },
             failure: function (response, options) {
             Ext.Msg.alert('Ошибка', message);
             }
             });
             }*/
        }
    }
});
