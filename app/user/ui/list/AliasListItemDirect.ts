module jm.user {

    export class AliasListItemDirect extends BaseAliasDirect {

        static NG_NAME: string = 'jmAliasListItem';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any = 'user/ui/list/aliasListItem.tpl.html';

        link: ng.IDirectiveLinkFn = (scope: IBaseAliasScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            this.parseAlias(scope);
        };

        constructor($injector: ng.auto.IInjectorService) {
            super('@jmAlias');
        }
    }
}