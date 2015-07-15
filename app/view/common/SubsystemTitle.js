Ext.define('App.view.common.SubsystemTitleV', {
    extend: 'Ext.container.Container',
    requires: [

    ],
    alias: 'widget.subsystemtitle',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    defaults: {
        xtype: 'container',
        height: 35
    },
    _textSubsystem:'',
    initComponent: function () {
        console.log('subsystemtitle init');

        this.items = [
            {
                margin: '5 5 5 5',
                cls: 'mystyle_title_subsystem_container',
                flex: 1,
                layout:'hbox',
                items:[
                    {
                        xtype: 'label',
                        cls: 'mystyle_title_subsystem_text',
                        text: this._textSubsystem,
                        flex: 1
                    },
                    {
                        xtype: 'label',
                        itemId:'labelUser',
                        cls: 'mystyle_title_subsystem_user',
                        flex: 1
                    }
                ]
            }
        ];

        this.callParent(arguments);
        console.log('subsystemtitle end');
    }
});