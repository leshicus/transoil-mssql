Ext.define('App.view.manage.question.answer.FormAnswerV', {
    extend: 'Ext.form.Panel',
    requires: [
        'App.view.manage.question.answer.FormAnswerC',
        'Ext.form.field.HtmlEditor'
    ],
    alias: 'widget.formAnswer',
    controller:'formanswer',
    itemId: 'formAnswer',
    bodyPadding: 5,
    defaults: {
        labelWidth: 100,
        labelAlign:'left'
    },
    border: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('formAnswer init');
        var self = this;

        this.items = [
            {
                xtype: 'htmleditor',
                itemId: 'textAnswer',
                name: 'answertext',
                allowBlank:false,
                enableColors: false,
                enableFont: false,
                defaultFont: 'Arial',
                enableLinks: false,
                enableSourceEdit: false,
                fieldLabel:'Ответ'
            },
            {
                xtype:'textarea',
                itemId:'textNormdoc',
                name:'normdoc',
                fieldLabel:'Нормативный документ'
            },
            {
                xtype:'checkboxfield',
                fieldLabel:'Верный',
                itemId:'correct',
                name:'correct',
                labelWidth: 100,
                readOnly:true,
                boxLabelAlign:'before',
                inputValue:'1'
            }
        ];

        this.buttons = [
            {
                text: 'Сохранить',
                action: 'save',
                glyph: Glyphs.get('save'),
                scale: 'medium'
            },
            '->',
            {
                text: 'Отмена',
                action: 'cancel',
                glyph: Glyphs.get('cancel'),
                scale: 'medium'
            }
        ];

        this.callParent(arguments);
        console.log('formUser end');
    }
});