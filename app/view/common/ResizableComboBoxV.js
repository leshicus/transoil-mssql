// * комбик меняющий свой размер под контент
Ext.define('App.view.common.ResizableComboBoxV', {
    extend: 'Ext.form.field.ComboBox',
    requires: [],
    xtype: 'resizable-combo',

    initComponent: function () {
        App.view.common.ResizableComboBoxV.superclass.initComponent.call(this);
        this.on('render', this.resizeToFitContent, this);
    },
    resizeToFitContent: function () {
        if (!this.elMetrics) {
            this.elMetrics = new Ext.util.TextMetrics(this.getEl());
        }
        var m = this.elMetrics, width = 0, el = this.el, s = this.getSize();
        this.store.each(function (r) {
            var text = r.get(this.displayField);
            width = Math.max(width, m.getWidth(text));
        }, this);
        if (el) {
            width += el.getBorderWidth('lr');
            width += el.getPadding('lr');
        }
        if (this.trigger) {
            width += this.trigger.getWidth();
        }
        s.width = width;
        this.setSize(s);
        this.store.on({
            'datachange': this.resizeToFitContent,
            'add': this.resizeToFitContent,
            'remove': this.resizeToFitContent,
            'load': this.resizeToFitContent,
            'update': this.resizeToFitContent,
            buffer: 10,
            scope: this
        });
    }

});