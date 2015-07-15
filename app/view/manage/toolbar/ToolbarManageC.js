Ext.define('App.view.manage.toolbar.ToolbarManageC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.question.question.GridQuestionV',
        'App.view.manage.question.tree.TreeQuestionV',
        'App.view.manage.question.answer.GridAnswerV',
        'App.view.manage.spec.TreeSpecV',
        'App.view.manage.spec.GridSpecV',
        'App.view.manage.group.GridGroupV',
        'App.view.manage.know.GridKnowV',
        'App.view.manage.org.GridOrgV',
        'App.view.manage.act.GridActV'
    ],
    alias: 'controller.toolbarmanage',

    control: {
        'toolbarManage #questionMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click questionMI');

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
                                xtype: 'treeQuestion',
                                cls: 'my_shadowborder',
                                margin: 5,
                                width: 270
                            },
                            {
                                xtype: 'gridQuestion',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            },
                            {
                                xtype: 'gridAnswer',
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
        'toolbarManage #specialityMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click specialityMI');

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
                                xtype: 'treeSpec',
                                cls: 'my_shadowborder',
                                margin: 5,
                                width: 270
                            },
                            {
                                xtype: 'gridSpec',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 1
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarManage #groupMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click groupMI');

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
                                xtype: 'gridGroup',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 1
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarManage #activityMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click activityMI');

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
                                xtype: 'gridAct',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 1
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarManage #knowMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click knowMI');

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
                                xtype: 'gridKnow',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 1
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarManage #orgMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click orgMI');

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
                                xtype: 'gridOrg',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 1
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarManage #mainMI': {
            toggle: function (button, state) {
                if (button.pressed) {
                    console.log('click mainMI');

                    location.reload();
                }
            }
        }
    }
});
