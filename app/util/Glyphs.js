/**
 * Created with PhpStorm.
 * taken from http://www.enovision.net/extjs-singletons-heavy-workers/
 */
Ext.define('App.util.Glyphs', {
    singleton: true,
    alternateClassName: ['Glyphs'], // * сможем обращаться к методам как Glyphs.method()
    constructor: function(config) {
        this.initConfig(config);
    },
    config: {
        // Icons that have been addressed directly
        webfont: 'FontAwesome',
        add: 'xf04b',
        //cancel: 'xf056',
        checked: 'xf046',
        clock: 'xf017',
        comment: 'xf0e5',
        connect: 'xf0c1',
        create: 'xf04b',
        dashboard : 'xf0e4',
        'delete': 'xf014',
        desktop: 'xf108',
        edit: 'xf040',
        filter: 'xf0b0',
        file: 'xf15c',
        folder: 'xf114',
        folder_open: 'xf115',
        frown: 'xf119',
        group: 'xf0c0',
        groups: 'xf0c0',
        home: 'xf015',
        info: 'xf129',
        link: 'xf0c1',
        linked: 'xf0c1',
        lock: 'xf023',
        locked: 'xf023',
        log: 'xf013',
        logout: 'xf011',
        message: 'xf10d',
        messages: 'xf10d',
        module: 'xf12e',
        object: 'xf02b',
        project: 'xf009',
        remove: 'xf014',
        save: 'xf0c7', // 'xf00c',
        settings: 'xf013',
        smile: 'xf118',
        sortasc : 'xf15d',
        sortdesc : 'xf15e',
        unchecked: 'xf096',
        unlink: 'xf127',
        unlinked: 'xf127',
        unlock: 'xf09c',
        unlocked: 'xf09c',
        user: 'xf007',
        users: 'xf0c0',

        // * мои
        thumbup:'xf087', // thumb up
        print:'xf02f', // printer
        word:'xf1c2', // Word
        copy:'xf0c5', // 2 docs
        bucks:'xf0d6', // bucks
        'return':'xf0e2', // arrow return
        paw:'xf1b0', // paw
        card:'xf09d', // card
        fill:'xf044', // pencil on paper
        signin:'xf090', // right arrow
        signout:'xf08b',
        plus:'xf067',
        minus:'xf068',
        cancel:'xf00d',
        change:'xf021',
        key:'xf084',
        arrowright:'xf061',
        flag:'xf11e'
    },

    get  : function(glyph) {
        return Glyphs.getGlyph(glyph);
    },

    getGlyph : function(glyph) {
        var font = Glyphs.getWebfont();
        if (typeof Glyphs.config[glyph] === 'undefined') {
            return false;
        }
        return Glyphs.config[glyph] + '@' + font;
    }
});