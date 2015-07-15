Ext.define('App.view.user.test.PanelTestV', {
    extend: 'Ext.container.Container',
    requires: [
        'App.view.main.MainM',
        'App.view.user.test.PanelTestC',
        'App.view.user.test.PanelTestM',
        'App.view.user.self.PanelSelfM',
        'Ext.layout.container.Accordion'
    ],
    viewModel: {type: 'panelSelf'},
    controller:'panelTest',
    bind:'{card}',
    alias: 'widget.panelTest',
    itemId: 'content',
    flex: 1,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    statics:{
        count:0,
        getCount:function(){
            return this.count;
        },
        setCount:function(){
            this.count = 0;
        },
        increment:function () {
            this.count++;
        }
    },
    getOuterCount:function () {
        return this.statics().count;
    },
    outerIncrement:function () {
        this.statics().increment();
    },
    setOuterCount:function () {
        this.statics().setCount();
    },
    rightAnswersAmount:0, // * количество данных правильных ответов
    questionNumber : 0, // * текущий номер вопроса
    examTimerMin : 0, // * минут на экзамен
    examTimerQuestionMin : 3, // * минут на экзамен для одного вопроса
    maxquestion:0,
    minquestion:0,
    regstatint:5,
    regstatdur:0,
    passed:false, // * проходился тест или не
    examTimerSec : App.util.Utilities.examTimerSec, // * секунд в минуте
    constructor: function () {
        console.log('PanelTestV init');

        this.items = [
// * левая половина: регистрация и прогресс
            {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                width: 300,
                items: [
// * регистрация
                    {
                        xtype: 'panel',
                        cls: 'my_shadowborder',
                        margin: 5,
                        title: 'Регистрация на экзамен',
                        height: 150,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '5 5 5 5',
                            labelWidth: 130
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                viewModel: {type: 'paneltest'},
                                bind:{store:'{exam}'},
                                itemId: 'comboExam',
                                queryMode: 'local',
                                editable: false,
                                width: 450,
                                valueField: 'examid',
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">{examdate} - {fio}</div>',
                                    '</tpl>'
                                ),
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{examdate} {fio}',
                                    '</tpl>'
                                ),
                                fieldLabel: 'Выберите экзамен'
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Статус',
                                itemId: 'textStatus',
                                value: '',
                                readOnly: true
                            }
                        ],
                        tools: [
                            {
                                type: 'refresh',
                                itemId: 'refreshComboExam',
                                tooltip: 'Обновить'
                            }
                        ],
                        buttons: [
                            {
                                xtype: 'button',
                                action: 'starttest',
                                itemId: 'startTest',
                                disabled: true,
                                scale:'medium',
                                //iconCls: 'icon_start',
                                glyph: Glyphs.get('flag'),
                                text: 'Начать тестирование'
                            }
                        ]
                    },
// * прогресс
                    {
                        xtype: 'panel',
                        cls: 'my_shadowborder',
                        margin: 5,
                        flex: 2,
                        itemId: 'panelProgress',
                        title: 'Прогресс',
                        autoScroll:true,
                        defaults: {
                            margin: '5 5 5 5',
                            labelWidth: 130
                        },
                        items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Времени на тест',
                                itemId: 'textTime',
                                readOnly: true,
                                fieldStyle: {
                                    color: '#666666',
                                    'font-weight': 'bold',
                                    'font-size': 'larger',
                                    'font-variant': 'small-caps'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Времени на вопрос',
                                itemId: 'textTimeQuestion',
                                readOnly: true,
                                fieldStyle: {
                                    color: '#666666',
                                    'font-weight': 'bold',
                                    'font-size': 'larger',
                                    'font-variant': 'small-caps'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Вопрос',
                                itemId: 'textQuestion',
                                fieldStyle: {
                                    color: '#666666',
                                    'font-weight': 'bold',
                                    'font-size': 'larger',
                                    'font-variant': 'small-caps'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Результат',
                                itemId: 'textResult'
                            },
                            {
                                xtype: 'box',
                                style: {
                                    color: '#666666',
                                    backgroundColor: '#000000'
                                },
                                height: 1
                            }
                        ],
                        bbar:[
                            {
                                xtype:'button',
                                text:'Печать ведомости',
                                glyph:Glyphs.get('print'),
                                handler:'onPrintResults'
                            }
                        ]
                    }
                ]
            },
// * билет
            {
                xtype: 'panel',
                title: 'Билет',
                cls: 'my_shadowborder',
                margin: 5,
                itemId: 'panelCard',
                flex: 1,
                border: false,
                buttonAlign: 'left',
                questionNumber: 0, // * текущий вопрос билета
                buttons: [
                    {
                        xtype: 'button',
                        action: 'nextquestion',
                        itemId: 'nextQuestion',
                        disabled:true,
                        scale:'medium',
                        glyph: Glyphs.get('arrowright'),
                        text: 'Следующий вопрос'
                    }
                ],
                layout: {
                    type: 'accordion',
                    titleCollapse: false,
                    fill: false,
                    multi: true
                },
                items: [
                    {
                        title: 'Вопрос',
                        itemId: 'questionAccordion',
                        height:200,
                        autoScroll:true,
                        style: {
                        },
                        hideCollapseTool: true,
                        items: [
                            {
                                xtype: 'displayfield',
                                itemId: 'question',
                                padding: '20 20 20 20'
                            }
                        ]
                    },
                    {
                        title: 'Варианты ответа',
                        flex: 1,
                        autoScroll:true,
                        style: {
                        },
                        itemId: 'answerAccordion',
                        hideCollapseTool: true,
                        defaultType: 'radiofield',
                        defaults: {
                            flex: 1,
                            name: 'answertext',
                            padding: '10 20 5 20'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
        console.log('PanelTestV end');
    }
});