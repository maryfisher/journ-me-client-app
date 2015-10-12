module jm.user {

    export class AliasListItemDirect implements ng.IDirective {

        static NG_NAME: string = 'jmAliasListItem';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any = 'user/ui/list/aliasListItem.tpl.html';
        scope: any = {
            alias: '=jmAlias'
        }

        constructor($injector: ng.auto.IInjectorService) {}
    }
}