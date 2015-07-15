Ext.define('App.view.manage.question.question.FormUploadV', {
    extend: 'Ext.form.Panel',
    requires: [
        'App.view.manage.question.question.FormUploadC',
        'Ext.form.field.File'
    ],
    alias: 'widget.formUpload',
    controller:'formupload',
    itemId: 'formupload',
    fileUpload: true,
    width: 400,
    height: 100,
    url: 'resources/php/manage/importQuestion.php',
    bodyPadding: 5,
    border: false,
    layout: 'fit',
    constructor: function () {
        console.log('FormUploadV init');

        this.items = [
            {
                xtype: 'filefield',
                name: 'import',
                itemId: 'import',
                emptyText: 'Выберите файл c расширением .xml',
                buttonText: 'Обзор',
                allowBlank: false,
                regex: /^.*\.(xml|XML)$/,
                regexText: 'Допустимы только файлы c расширением .xml'
            }
        ];

        this.buttons = [
            {
                text: 'Загрузить',
                action: 'import',
                scale: 'medium'
            },
            '->',
            {
                text: 'Отмена',
                action: 'reset',
                scale: 'medium'
            }
        ];

        this.callParent(arguments);
    }
});