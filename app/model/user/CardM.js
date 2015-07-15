Ext.define('App.model.user.CardM', {
    extend:'Ext.data.Model',
    fields:[
        {name: 'questionid'},
        {name: 'questiontext'},
        {name: 'answerid'},
        {name: 'answertext'},
        {name: 'correct'},
        {name: 'normdoc'},
        {name: 'rownum'}
    ]
});