/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('App.Application', {
    extend: 'Ext.app.Application',

    name: 'App',

    controllers: [
    ],

    launch: function () {
        /*var url = Ext.util.Format.format("ext/packages/ext-locale/build/ext-locale-{0}.js", 'ru');
        Ext.Loader.loadScript({
                url: url,
                scope: this
            }
        );*/

        // * багфиксы
        // * Исправление бага 43 Хрома, когда смещалось отображение textfield
        if(Ext.isChrome && Ext.chromeVersion===43)
            Ext.getBody().addCls('chrome-43');
    },
    requires: [
        'App.util.Utilities',
        'App.util.Glyphs'
    ]
});
