///<reference path="AliasListItemController.ts"/>
module jm.user {

    import AliasListItemController = jm.user.ctrl.AliasListItemController;

    export class AliasListItemDirectBase implements ng.IDirective {

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any;
        scope: any = {
            alias: '=?',
            aliasId: '=?'
        };
        controller: string = AliasListItemController.NG_NAME;

        constructor($injector: ng.auto.IInjectorService, tplUrl: string) {
            this.templateUrl = tplUrl;
        }
    }
}