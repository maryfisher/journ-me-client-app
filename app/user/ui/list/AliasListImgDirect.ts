/// <reference path="AliasListItemDirectBase.ts" />
module jm.user {

    export class AliasListImgDirect extends AliasListItemDirectBase {

        static NG_NAME: string = 'jmAliasListImg';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, 'user/ui/list/aliasListImg.tpl.html')
        }
    }
}