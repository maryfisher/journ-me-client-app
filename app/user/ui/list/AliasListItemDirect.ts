/// <reference path="AliasListItemDirectBase.ts" />
module jm.user {

    export class AliasListItemDirect extends AliasListItemDirectBase {

        static NG_NAME: string = 'jmAliasListItem';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, 'user/ui/list/aliasListItem.tpl.html')
        }
    }
}