module jm.common {

    export interface IBaseModalScope extends ng.IScope {
        cancel();
        modalController: string;
        modalTemplateUrl: string;
    }

    export class BaseModalDirect implements ng.IDirective {

        //IMPORTANT
        //the reason we use a controller here is that we want to isolate the scope
        //every directive is only instantiated once and its scope is shared between all directive elements
        //however controller are instantiated for each directive element
        //that means, using one is the only way to get a unique (not shared) scope
        controller: string = 'BaseModalController';

        link: ng.IDirectiveLinkFn = (scope: IBaseModalScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            scope.modalController = this.modalController;
            scope.modalTemplateUrl = this.modalTemplateUrl;
        };

        constructor($injector: ng.auto.IInjectorService, private modalController: string, private modalTemplateUrl: string) {

        }
    }
}