module jm.user {

    export interface IAliasListModalScope extends jm.common.IBaseModalScope {
        aliasList: AliasBaseVO[];
        listHeader: string;
    }

    export class AliasListDirect extends jm.common.BaseModalDirect {
        static NG_NAME: string = 'jmAliasList';

        restrict: string = 'A';
        scope: any = {
            aliasList: '=jmAliasList',
            listHeader: '@jmListHeader'
        };

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, '', 'user/ui/list/aliasListModal.tpl.html');
        }


    }
}