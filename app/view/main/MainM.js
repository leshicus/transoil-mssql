Ext.define('App.view.main.MainM', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'App'
    },
    stores: {
        org: {
            fields: [],
            idProperty:'orgid',
            autoLoad: true,
            proxy: {
                type: 'rest',
                api: {
                    create: 'resources/php/manage/syncGridOrg.php?act=create',
                    read: 'resources/php/manage/syncGridOrg.php?act=read',
                    update: 'resources/php/manage/syncGridOrg.php?act=update',
                    destroy: 'resources/php/manage/syncGridOrg.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                appendId: false,
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                storeId: 'storeOrg'
            }
        },
        spec: {
            fields: [
                /*{name: 'specid'},
                {name: 'specname'},
                {name: 'groupid'},
                {name: 'orgid'}*/
            ],
            //autoLoad:true,
            idProperty:'specid',
            proxy: {
                type: 'rest',
                api: {
                    create: 'resources/php/manage/syncGridSpec.php?act=create',
                    read: 'resources/php/manage/syncGridSpec.php?act=read',
                    update: 'resources/php/manage/syncGridSpec.php?act=update',
                    destroy: 'resources/php/manage/syncGridSpec.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                appendId: false,
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                storeId: 'storeSpec'
            }
        },
        role: {
            fields: [
               /* {name: 'id'},
                {name: 'name'}*/
            ],
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: 'resources/php/admin/getRole.php',
                reader: {
                    type: 'json'
                }
            }
        },
        know: {
            fields: [],
            autoLoad: true,
            idProperty:'knowid',
            proxy: {
                type: 'ajax',
                api: {
                    create: 'resources/php/manage/syncGridKnow.php?act=create',
                    read: 'resources/php/manage/syncGridKnow.php?act=read',
                    update: 'resources/php/manage/syncGridKnow.php?act=update',
                    destroy: 'resources/php/manage/syncGridKnow.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                appendId: false,
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                }
            }
        },
        act: {
            fields: [],
            autoLoad: true,
            idProperty:'actid',
            proxy: {
                type: 'ajax',
                api: {
                    create: 'resources/php/manage/syncGridAct.php?act=create',
                    read: 'resources/php/manage/syncGridAct.php?act=read',
                    update: 'resources/php/manage/syncGridAct.php?act=update',
                    destroy: 'resources/php/manage/syncGridAct.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                appendId: false,
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                }
            }
        },
        group: {
            fields: [],
            idProperty:'groupid',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'resources/php/manage/syncGridGroup.php?act=create',
                    read: 'resources/php/manage/syncGridGroup.php?act=read',
                    update: 'resources/php/manage/syncGridGroup.php?act=update',
                    destroy: 'resources/php/manage/syncGridGroup.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                appendId: false,
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                }
            }
        },
        tool: {
            fields: [
                {name:'toolid'},
                {name:'maxquestion',type:'int'},
                {name:'minquestion',type:'int'},
                {name:'regstatint',type:'int'},
                {name:'regstatdur',type:'int'},
                {name:'examtimermin',type:'int'}
            ],
            storeId:'tool',
            autoLoad: true,
            idProperty:'toolid',
            proxy: {
                type: 'ajax',
                api: {
                    read: 'resources/php/admin/syncFormTool.php?act=read',
                    update: 'resources/php/admin/syncFormTool.php?act=update'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                appendId: false,
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                }
            }
        }

    }
});