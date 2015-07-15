Ext.define('App.view.auth.tabauth.TabAuthV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'App.view.auth.tabauth.TabAuthC',
        'App.view.auth.tabauth.TabAuthM'
    ],
    alias: 'widget.tabAuth',
    controller: 'tabAuth',
    viewModel: {
        type: 'tabAuth'
    },
    itemId: 'tabAuth',
    title: 'Авторизация',
    url: 'resources/php/auth.php',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults:{
        blankText:'Обязательное поле'
    },
    initComponent: function () {
        console.log('TabAuthV init');

        var textLogin = {
                xtype: 'textfield',
                itemId: 'textLogin',
                name: 'textLogin',
                //value:'a',
                validator:this.validatorLogin,
                allowBlank: false,
                afterLabelTextTpl: App.util.Utilities.required,
                fieldLabel: 'Логин'
            },
            comboSystem = {
                xtype: 'combo',
                bind:{
                    store:'{storeSubSystem}'
                },
                itemId: 'comboSystem',
                name: 'comboSystem',
                queryMode: 'local',
                editable: false,
                value: App.util.Utilities.startSubsystem,  // * начальное значение выбора подсистемы
                valueField: 'id',
                displayField: 'name',
                allowBlank: false,
                afterLabelTextTpl: App.util.Utilities.required,
                fieldLabel: 'Подсистема'
            },
            textPassword = {
                xtype: 'textfield',
                itemId: 'textPassword',
                name: 'textPassword',
                //value:'a',
                validator:this.validatorPassword,
                inputType: 'password',
                fieldLabel: 'Пароль',
                allowBlank: false,
                afterLabelTextTpl: App.util.Utilities.required
            },
            textOldPassword = {
                xtype: 'textfield',
                itemId: 'textOldPassword',
                name: 'textOldPassword',
                inputType: 'password',
                fieldLabel: 'Старый пароль'
            },
            textNewPassword = {
                xtype: 'textfield',
                itemId: 'textNewPassword',
                name: 'textNewPassword',
                validator:this.validatorPassword,
                inputType: 'password',
                fieldLabel: 'Новый пароль'
            },
            buttonChangePas = {
                xtype: 'button',
                text: 'Поменять',
                anchor: '25%',
                scale:'medium',
                glyph: Glyphs.get('change'),
                action: 'changepassword'
            },
            fieldsetChangePas = Ext.create('Ext.form.FieldSet', {
                xtype: 'fieldset',
                title: 'Смена пароля',
                itemId: 'fieldsetChangePas',
                padding:'5 5 5 5',
                margin:'10 0 0 0',
                defaults: {
                    anchor: '100%',
                    labelWidth: 120
                },
                items: [
                    textOldPassword,
                    textNewPassword,
                    buttonChangePas
                ]
            }),
            buttonEnter = Ext.create('Ext.button.Button',{
                text: 'Вход',
                scale:'medium',
                action: 'enter',
                glyph: Glyphs.get('signin'),
                reference: 'enter',
                itemId:'enter'
            });

        this.items = [
            comboSystem,
            textLogin,
            textPassword,
            fieldsetChangePas
        ];

        this.buttons = [
            buttonEnter,
            {
                text: 'Очистить',
                scale:'medium',
                glyph: Glyphs.get('cancel'),
                action: 'refresh'
            }
        ];

        this.callParent(arguments);

        console.log('TabAuthV end');
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
},

function () {
    // * короткие имена для полезных методов
    Ext.apply(App, {
        defaultButton: '[reference=enter]'
    });
});