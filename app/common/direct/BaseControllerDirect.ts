module jm.common {
    'use strict';

    export class BaseControllerDirect implements ng.IDirective {

        controllerAs: string = JMConfigConst.CTRL;

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}