Ext.define('App.view.manage.question.question.FormQuestionV', {
    extend: 'Ext.form.Panel',
    requires: [
        'App.view.manage.question.question.FormQuestionC',
        'Ext.form.field.HtmlEditor'
    ],
    alias: 'widget.formQuestion',
    controller:'formquestion',
    itemId: 'formQuestion',
    bodyPadding: 5,
    defaults: {
        labelWidth: 100
    },
    border: false,
    layout: 'fit',
    constructor: function () {
        console.log('formQuestion init');

        this.items = [
            {
                xtype: 'htmleditor',
                itemId: 'textQuestion',
                name: 'questiontext',
                allowBlank:false,
                enableColors: false,
                enableFont: false,
                defaultFont: 'Arial',
                enableLinks: false,
                enableSourceEdit: false
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