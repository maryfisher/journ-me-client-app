module jm.user {
    export class AliasListDirect implements ng.IDirective {
        static NG_NAME: string = 'jmAliasList';

        restrict: string = 'A';
        scope: any = {
            listStr: '@jmAliasList',
            listHeader: '@jmListHeader'
        };
        controller: string = 'AliasListController';

        constructor($injector: ng.auto.IInjectorService) {}
    }
}