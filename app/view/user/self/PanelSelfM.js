Ext.define('App.view.user.self.PanelSelfM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.panelSelf',
    data:{
        questionMaxInCardSelf:0,
        correct:-1,
        normdoc:'',
        previousQuestion:'',
        previousAnswer:'',
        previousRightAnswer:''
    },
    stores: {
        card: {
            fields: [],
            storeId: 'card',
            proxy: {
                type: 'ajax',
                url: 'resources/php/user/getCard.php',
                reader: {
                    type: 'json',
                    rootProperty:'rows'
                }
            }
        }
    }
});
