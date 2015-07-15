Ext.define('App.view.auth.tabreg.TabRegV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'App.view.auth.tabreg.TabRegC',
        'App.view.auth.tabreg.TabRegM',
        'App.view.main.MainM'
    ],
    alias: 'widget.tabReg',
    controller: 'tabReg',
    viewModel: {
        type: 'main'
    },
    itemId: 'tabReg',
    url:'resources/php/register.php',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults:{
        blankText:'Обязательное поле'
    },
    title: 'Регистрация',
    initComponent: function () {
        console.log('TabRegV init');
        var textLogin = {
                xtype: 'textfield',
                itemId: 'textLogin',
                name: 'textLogin',
                allowBlank: false,
                validator:this.validatorLogin,
                afterLabelTextTpl: App.util.Utilities.required,
                fieldLabel: 'Логин'
            },
            textFamily = {
                xtype: 'textfield',
                itemId: 'textFamily',
                name: 'textFamily',
                allowBlank: false,
                validator:this.validatorFio,
                invalidText:'',
                afterLabelTextTpl: App.util.Utilities.required,
                fieldLabel: 'Фамилия'
            },
            textName = {
                xtype: 'textfield',
                itemId: 'textName',
                name: 'textName',
                allowBlank: false,
                validator:this.validatorFio,
                afterLabelTextTpl: App.util.Utilities.required,
                fieldLabel: 'Имя'
            },
            textLastname = {
                xtype: 'textfield',
                itemId: 'textLastname',
                name: 'textLastname',
                fieldLabel: 'Отчество'
            },
            comboOrg = {
                xtype: 'combo',
                bind:{
                    store:'{org}'
                },
                itemId: 'comboOrg',
                name: 'comboOrg',
                queryMode: 'local',
                editable: false,
                valueField: 'orgid',
                displayField: 'orgname',
                allowBlank: false,
                afterLabelTextTpl: App.util.Utilities.required,
                fieldLabel: 'Организация'
            },
            comboSpeciality = {
                xtype: 'combo',
                bind:{
                    store:'{spec}'
                },
                itemId: 'comboSpeciality',
                name: 'comboSpeciality',
                queryMode: 'local',
                editable: false,
                disabled:true,
                valueField: 'specid',
                displayField: 'specname',
                allowBlank: false,
                afterLabelTextTpl: App.util.Utilities.required,
                fieldLabel: 'Специальность'
            },
            textPassword = {
                xtype: 'textfield',
                itemId: 'textPassword',
                name: 'textPassword',
                inputType: 'password',
                fieldLabel: 'Пароль',
                allowBlank: false,
                validator:this.validatorPassword,
                afterLabelTextTpl: App.util.Utilities.required
            };


        this.items = [
            textFamily,
            textName,
            textLastname,
            comboOrg,
            comboSpeciality,
            textLogin,
            textPassword
        ];

        this.buttons = [
            {
                text: 'Зарегистрироваться',
                action: 'register',
                glyph: Glyphs.get('key'),
                scale:'medium'
            },
            {
                text: 'Очистить',
                action: 'refresh',
                glyph: Glyphs.get('cancel'),
                scale:'medium'
            }
        ];


        this.callParent(arguments);
        console.log('TabRegV end');
    },
    validatorFio:function (val) {
        var regex = /^[А-Яа-яA-Za-z]+((\s[А-Яа-яA-Za-z]+|-[А-Яа-яA-Za-z]+)?)+$/;
        if (!regex.test(val)) {
            return 'Допустимы буквы латинского алфавита и кириллица';
        }
        return true;
    },
    // * латинский алфавит, длиннее 3-х букв
    validatorLogin:function (val) {
        //var regex = /^\d+(.(\d+){1})?$/;
        var regex = /\s|\W/;
        if (regex.test(val)) {
            return 'Допустимы буквы латинского алфавита и цифры';
        }
        //TODO расскомментить в продашкн
        /*if (val.length < 3) {
         return 'Логин должен быть длиннее 3-х символов';
         }*/
        return true;
    },
    // * латинский алфавит, длиннее 6-х букв
    validatorPassword:function (val) {
        var regex = /\s|\W/;
        if (regex.test(val)) {
            return 'Допустимы буквы латинского алфавита и цифры';
        }
        //TODO расскомментить в продашкн
        /*if (val.length < 6) {
         return 'Логин должен быть длиннее 6-х символов';
         }*/
        return true;
    }
});