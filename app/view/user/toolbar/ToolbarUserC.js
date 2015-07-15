Ext.define('App.view.user.toolbar.ToolbarUserC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.user.self.PanelSelfV',
        'App.view.user.test.PanelTestV'
    ],
    alias: 'controller.toolbaruser',

    control: {
        '#mainMI': {
            toggle: function (button, state) {
                if (button.pressed) {
                    console.log('click mainMI');

                    location.reload();
                }
            }
        },
        '#testMI': {
            toggle: function (me, state) {  // * использую toggle вместо click, т.к. при click можно нажать уже нажатую кнопку, а нам это не нужно
                if (me.pressed) {
                    var main = me.up('main'),
                        toolbar = me.up('toolbar'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('App.view.user.test.PanelTestV');
                    layout.activeItem.add(content);
                }
            }
        },

        '#selfMI': {
            toggle: function (me, state) {
                Ext.TaskManager.stopAll();
                if (me.pressed) {
                    var main = me.up('main'),
                        toolbar = me.up('toolbar'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('App.view.user.self.PanelSelfV');
                    layout.activeItem.add(content);
                }
            }
        }
    }
});
