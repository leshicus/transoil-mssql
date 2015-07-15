// * for operability allowBlank=false for HtmlEditor
Ext.define('App.overrides.HtmlEditor', {
    override: 'Ext.form.HtmlEditor',
    addClearInvalidListener: true,
    markInvalid: function()
    {
        if(!this.rendered || this.preventMark)
        {
            return;
        }
        if(this.addClearInvalidListener)
        {
            this.on('sync', this.clearInvalid);
            this.addClearInvalidListener = false;
        }
        Ext.form.HtmlEditor.superclass.markInvalid.apply(this, arguments);
        Ext.get(this.iframe).addClass(this.invalidClass);
    },
    alignErrorIcon: function()
    {
        try{
            this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
        }
        catch(err){}
    },
    clearInvalid: function()
    {
        if(!this.rendered || this.preventMark)
        {
            return;
        }
        Ext.form.HtmlEditor.superclass.clearInvalid.apply(this, arguments);
        Ext.get(this.iframe).removeClass(this.invalidClass);
        //return Ext.form.TextArea.superclass.clearInvalid.call(this);
    },
    validate:function(){
        if(!this.rendered || this.preventMark)
        {
            return;
        }
        if(this.allowBlank==false && !this.readOnly)
        {
            if(!this.isEmpty())
            {
                this.clearInvalid();
                return true;
            }
            else
            {
                this.markInvalid("This field is required")
                return false;
            }
        }
        else
        {
            this.clearInvalid();
            return true;
        }
    },
    isEmpty:function(){
        var value =this.getValue();
        value = value.replace(/&nbsp;/gi,"");
        value = value.replace(/<p>/gi,"");
        value = value.replace(/<p align=left>/gi,"");
        value = value.replace(/<p align=right>/gi,"");
        value = value.replace(/<p align=center>/gi,"");
        value = value.replace(/<.p>/gi,"");
        value = value.replace(/<br>/gi,"");
        value = value.trim();
        if(value != '')
            return false;
        return true;
    }
});
