Ext.define('App.util.Utilities', {
    singleton: true,
    alternateClassName: ['Utilities'],
    version: '1.03 от 19.03.2015',
    textAbout:'<table width="100%">' +
    '<tr>' +
    '<td width="100">Программа:</td>' +
    '<td>Система тестирования знаний</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Версия:</td>' +
    '<td>' +
    '1.03 от 19.03.2015' +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Разработчик:</td>' +
    '<td>Волков А.И.</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Почта:</td>' +
    '<td>benzolring@mail.ru</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Телефон:</td>' +
    '<td>+7(926)153-94-19</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Сайт:</td>' +
    '<td>teh5.ru</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Год:</td>' +
    '<td>2014</td>' +
    '</tr>' +
    '</table>',

    dataStat: [
        ['1', "Количество экзаменуемых по видам деятельности"],
        ['2', "Успеваемость по видам деятельности"],
        ['3', "Успеваемость по областям знаний"]
    ],
    regString: 'зарегистрирован',
    unregString: 'подана заявка',
    correctString: 'верный',
    uncorrectString: 'неверный',
    passString: 'экзамен сдан',
    unpassString: 'экзамен не сдан',
    startSubsystem: 1, // * подсистема выбранная по-умолчанию в стартовом окне
    examTimerSec: 60, // * секунд в минуте
    nullDate: '00.00.0000 00:00',
    required: '<span style="color:red;font-weight:bold" ext:qtip="Required">*</span>',
    buttonSaveDelete: [
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
    ],
    buttonDateFromTo: [
        {
            xtype: 'datefield',
            itemId: 'dateFindFrom',
            emptyText: 'Дата c',
            width: 140,
            format: 'd.m.Y H:i',
            altFormats: 'd.m.Y H:i'
        },
        '-',
        {
            xtype: 'datefield',
            itemId: 'dateFindTo',
            emptyText: 'Дата по',
            width: 140,
            format: 'd.m.Y H:i'
        }
    ],
    colorStatusTextUnreg: {
        color: '#FF0000',
        'font-weight': 'bold',
        //'font-size': 'larger',
        'font-variant': 'small-caps'
    },
    colorStatusTextReg: {
        color: '#008000',
        'font-weight': 'bold',
        //'font-size': 'larger',
        'font-variant': 'small-caps'
    },
    runnerExamTestAll: new Ext.util.TaskRunner(),  // * задание для времени тестов
    runnerExamTestQuestion: new Ext.util.TaskRunner(),  // * задание для времени вопроса

    // * проверка, что элемент присутствует в массиве
    in_array: function (str, arr, strict) {	// Checks if a value exists in an array
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        var found = false, key, strict = !!strict;

        for (key in arr) {
            if ((strict && arr[key] === str) || (!strict && arr[key] == str)) {
                found = true;
                break;
            }
        }
        return found;
    },

    comboRenderer: function (combo) {
        return function (value) {

            var record = combo.findRecord(combo.valueField || combo.displayField, value);
            return record ? record.get(combo.displayField) : combo.valueNotFoundText;
        }
    },

    comboRendererVM: function (combo, storeName) {
        return function (value) {

            var vm = combo.getViewModel(),
                store = vm.getStore(storeName);
            //result = '';
            store.findBy(function (item) {
                var id = item.getIdProperty();
                console.info(item.getIdProperty(), item.getId());
                if (item.getIdProperty() == value)
                    return item ? item.get(combo.displayField) : combo.valueNotFoundText;
            });
        }
    },

    columnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value && value != App.util.Utilities.nullDate) {
            metaData.style += 'background:rgb(243, 169, 202);';
            return value;
        }
    },

    renderGridGroup: function (combo) {
        var storeAct = Ext.ComponentQuery.query('main')[0].getViewModel().getStore('act');

        return function (value) {
            var record = storeAct.findRecord('actid', value);
            return record ? record.get(combo.displayField) : combo.valueNotFoundText;
        }
    },
    renderOrg: function (combo) {
        var storeAct = Ext.ComponentQuery.query('main')[0].getViewModel().getStore('org');

        return function (value) {
            var record = storeAct.findRecord('orgid', value);
            return record ? record.get(combo.displayField) : combo.valueNotFoundText;
        }
    },

    renderResult: function (value, metaData) {
        if (value == 1) {
            metaData.style += 'color:green; font-weight: bold;';
            return App.util.Utilities.passString;
        } else if (value == 0) {
            metaData.style += 'color:red; font-weight: bold;';
            return App.util.Utilities.unpassString;
        } else {
            metaData.style += 'color:blue; font-weight: bold;';
            return 'не сдавал';
        }

    },

    // * GridGroup knowids
    renderGroupknow: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var main = Ext.ComponentQuery.query('main')[0],
            mainVM = main.getViewModel(),
            storeKnow = mainVM.getStore('know');
        // проверка на массив (для списочных элементов, multiselect)
        if (value instanceof Array) {
            var str = Array();
            // перебор элементов массива
            for (var i in value) {
                // найдем в соответствующем хранилище name, соответствующую данному id
                var rec = storeKnow.findRecord('knowid', value[i]);
                if (rec) {
                    var name = rec.data['knowname'];
                }
                str.push(name);
            }
            return str.join(", \n");
        }
    },

// * удаление старых гридов при нажатии на кнопку меню
    cascadeRemoveGrid: function (item) {
        var viewport = item.up('viewport');
        if (viewport) {
            var layout = viewport.getLayout(),
                activeCard = layout.activeItem;
            //console.log(item,item.superclass.xtype, item.xtype);
            flag = true;
            if (item.superclass.xtype == 'gridpanel'
                || item.superclass.xtype == 'panel'
                || item.superclass.xtype == 'form') {
                activeCard.remove(item, flag);
            }
        }
    },

// * всплывающее сообщение с ошибкой
    errorMessage: function (title, msg) {
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    },
    infoMessage: function (title, msg) {
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
    },

// * преобразование даты в удобочитаемый формат
    reverseDate: function (x) {
        return ((x < 10 ? '0' : '') + x)
    },

    // * скрыть/раскрыть дерево
    treeCollapse: function (button, e, tree) {
        if(tree){
            if (tree._collapsed) {
                tree.getEl().mask('Раскрываем...');
                Ext.defer(function () {
                    tree.expandAll(function () {
                            tree.getEl().unmask();
                            tree._collapsed = false;
                        },
                        this
                    );
                }, 10, this);
            } else {
                tree.getEl().mask('Скрываем...');
                Ext.defer(function () {
                    tree.collapseAll(function () {
                            tree.getEl().unmask();
                            tree._collapsed = true;
                        },
                        this
                    );
                }, 10, this);
            }
        }

    },
    getTool: function (field) {
        var main = Ext.ComponentQuery.query('main')[0],
            storeTool = main.getViewModel().getStore('tool'),
            recTool = storeTool.getAt(0),
            value = recTool.get(field);
        return value;
    },
    toast: function (title, msg) {
        Ext.toast({
            html: msg,
            title: title,
            autoCloseDelay: 4000,
            slideInDuration: 500,
            width: 300,
            align: 't'
        });
    }

});