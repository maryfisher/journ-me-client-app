module jm.user {

    export interface IAliasListModalScope extends jm.common.IBaseModalScope {
        aliasList: AliasBaseVO[];
        listHeader: string;
        removeJoin: boolean;
        removeJoinedAlias();
    }

    export class AliasListDirect extends jm.common.BaseModalDirect {
        static NG_NAME: string = 'jmAliasList';

        restrict: string = 'A';
        scope: any = {
            aliasList: '=jmAliasList',
            listHeader: '@jmListHeader',
            removeJoin: '=?'
        };

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, 'AliasListController', 'user/ui/list/aliasListModal.tpl.html');
        }
    }
}