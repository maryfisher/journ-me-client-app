module jm.error {
    'use strict';

    import GlobalErrorController = jm.error.ctrl.GlobalErrorController

    export class GlobalErrorDirect implements ng.IDirective {

        static NG_NAME: string = 'jmGlobalError';

        restrict: string = 'A';
        scope: any = {
            errors: '=jmGlobalError'
        };
        controller: string = GlobalErrorController.NG_NAME;

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}