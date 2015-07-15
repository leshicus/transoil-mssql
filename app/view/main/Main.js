Ext.define('App.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.form.Label',
        'App.view.main.MainC',
        'App.view.main.MainM',
        'App.view.auth.tabreg.TabRegV',
        'App.view.auth.tabauth.TabAuthV',
        'App.view.user.toolbar.ToolbarUserV',
        'App.view.manage.toolbar.ToolbarManageV',
        'App.view.admin.toolbar.ToolbarAdminV',
        'App.view.common.SubsystemTitleV'
    ],
    xtype: 'main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: 'card',
    activeItem: 0,
    border: false,
    defaults: {
        border: false
    },

    items: [
        {
            id: 'card-0-auth',
            layout: {
                align: 'center',
                pack: 'center',
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'box',
                    margin: '5 5 5 1',
                    cls: 'mystyle_title_subsystem',
                    html: 'Авторизация',
                    height: 35,
                    width: 500
                },
                {
                    xtype: 'tabpanel',
                    height: 340,
                    width: 500,
                    activeTab: 0,
                    cls: 'my_shadowborder',
                    margin: '5 5 5 5',
                    defaults: {
                        bodyPadding: 10
                    },
                    items: [
                        {xtype: 'tabAuth'},
                        {xtype: 'tabReg'},
                        {
                            title:'О программе...',
                            layout:'vbox',
                            defaults:{
                                xtype: 'label',
                                margin: '0 0 0 10'
                            },
                            items:[
                                {html: Utilities.textAbout}
                            ]
                        }
                    ]
                },
                {
                    xtype: 'box',
                    margin: '5 5 5 1',
                    html: 'Выход из приложения: <b>ALT + F4</b><br>Версия: ' + Utilities.version,
                    height: 35,
                    width: 500
                }
            ]
        },
        {
            id: 'card-1-user',
            defaults: {
                border: false
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'subsystemtitle',
                    _textSubsystem: 'Тестирование'
                },
                {xtype: 'toolbarUser'}
            ]
        },
        {
            id: 'card-2-admin',
            defaults: {
                border: false
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'subsystemtitle',
                    _textSubsystem: 'Администрирование'
                },
                {xtype: 'toolbarAdmin'}
            ]
        },
        {
            id: 'card-3-manage',
            defaults: {
                border: false
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'subsystemtitle',
                    _textSubsystem: 'Ведение'
                },
                {xtype: 'toolbarManage'}
            ]
        }
    ]
});
