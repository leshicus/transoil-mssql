Ext.define('App.view.admin.toolbar.ToolbarAdminC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.treeuser.TreeUserV',
        'App.view.admin.griduser.GridUserV',
        'App.view.admin.log.GridLogV',
        'App.view.admin.clas.GridExamV',
        'App.view.admin.clas.GridSigngroupV',
        'App.view.admin.clas.GridPersonV',
        'App.view.admin.stat.PanelStatV',
        'App.view.admin.tool.FormToolV'
    ],
    alias: 'controller.toolbaradmin',

    control: {
        '#userMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click userMI');

                    var main = me.up('main'),
                        toolbar = me.up('toolbar'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('Ext.container.Container', {
                        border: false,
                        itemId: 'content',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'treeUser',
                                cls: 'my_shadowborder',
                                margin: 5,
                                width: 250
                            },
                            {
                                xtype: 'gridUser',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarAdmin #mainMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click mainMI');
                    location.reload();
                }
            }
        },
        'toolbarAdmin #logMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click logMI');

                    var main = me.up('main'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('Ext.container.Container', {
                        border: false,
                        itemId: 'content',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'gridLog',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarAdmin #classMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click classMI');

                    var main = me.up('main'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('Ext.container.Container', {
                        border: false,
                        itemId: 'content',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                border: false,
                                width: 560,
                                items: [
                                    {
                                        xtype: 'gridExam',
                                        margin: 5,
                                        cls: 'my_shadowborder'
                                    },
                                    {
                                        xtype: 'gridSigngroup',
                                        margin: 5,
                                        cls: 'my_shadowborder'
                                    }
                                ]
                            },
                            {
                                xtype: 'gridPerson',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarAdmin #statMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click statMI');

                    var toolbarAdmin = me.up('toolbarAdmin'),
                        main = me.up('main'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('Ext.container.Container', {
                        border: false,
                        itemId: 'content',
                        autoScroll: true,
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'panelStat'

                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarAdmin #toolMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click toolMI');

                    var toolbarAdmin = me.up('toolbarAdmin'),
                        main = me.up('main'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('Ext.container.Container', {
                        border: false,
                        itemId: 'content',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'formTool',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });

                    layout.activeItem.add(content);
                }
            }
        }
    }
});
