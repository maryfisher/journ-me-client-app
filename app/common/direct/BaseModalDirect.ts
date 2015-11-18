module jm.common {
    'use strict';

    import BaseModalController = jm.common.ctrl.BaseModalController;

    export interface IBaseModalScope extends ng.IScope {
        cancel();
        modalController: string;
        modalTemplateUrl: string;
    }

    export class BaseModalDirect implements ng.IDirective {

        //IMPORTANT
        //every directive "class" is only instantiated once
        //it uses link/compile function to create the 'real-world directive', its scope and controller ->
        //scope is not unique in the directive "class", only in the link function and controller
        controller: string = BaseModalController.NG_NAME;

        link: ng.IDirectiveLinkFn = (scope: IBaseModalScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            scope.modalController = this.modalController;
            scope.modalTemplateUrl = this.modalTemplateUrl;
        };

        constructor($injector: ng.auto.IInjectorService, private modalController: string, private modalTemplateUrl: string) {

        }
    }
}