Ext.define('App.view.admin.tool.FormToolV', {
    extend: 'Ext.form.Panel',
    requires: [
        'App.view.admin.tool.FormToolC',
        'App.view.main.MainM'
    ],
    alias: 'widget.formTool',
    viewModel: {type: 'main'},
    controller:'formtool',
    title: 'Глобальные настройки системы',
    layout: {
        type: 'vbox'
    },
    defaults: {
        xtype: 'numberfield',
        labelWidth: 250,
        margin: '5 5 5 5',
        labelAlign: 'left',
        allowBlank:false,
        width: '30%',
        maxValue: 1000,
        minValue: 1
    },
    initComponent: function () {
        console.log('FormToolV init');

        this.items = [
            {
                itemId: 'maxquestion',
                name: 'maxquestion',
                bind:'{tool.maxquestion}',
                fieldLabel: 'Число вопросов в билете'
            },
            {
                itemId: 'minquestion',
                name: 'minquestion',
                fieldLabel: 'Число правильных ответов для успешного прохождения экзамена'
            },
            {
                itemId: 'regstatint',
                name: 'regstatint',
                fieldLabel: 'Интервал опроса базы по регистрации в классе (сек)'
            },
            {
                itemId: 'regstatdur',
                name: 'regstatdur',
                fieldLabel: 'Продолжительность опроса базы по регистрации в классе (мин)'
            },
            {
                itemId: 'examtimermin',
                name: 'examtimermin',
                fieldLabel: 'Количество времени на экзамен для всех видов деятельности (мин)'
            }
        ];

        this.buttons=[
            {
                text: 'Сохранить',
                scale:'medium',
                glyph: Glyphs.get('save'),
                action: 'save'
            },
            '->'
        ]

        this.callParent(arguments);
        console.log('FormToolV end');
    }
});