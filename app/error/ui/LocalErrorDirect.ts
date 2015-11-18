module jm.error {
    'use strict';

    import LocalErrorController = jm.error.ctrl.LocalErrorController;

    export class LocalErrorDirect implements ng.IDirective {

        static NG_NAME: string = 'jmLocalError';

        restrict: string = 'E';
        replace: boolean = true;
        scope: any = {
            errors: '=errors'
        };
        controller: string = LocalErrorController.NG_NAME;
        templateUrl: any = 'error/ui/localError.tpl.html';

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}