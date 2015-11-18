///<reference path="LocalErrorController.ts"/>
module jm.error.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import BaseController = jm.common.BaseController;
    import IErrorScope = jm.error.ctrl.IErrorScope;
    import IModalService = angular.ui.bootstrap.IModalService;
    import IModalSettings = angular.ui.bootstrap.IModalSettings;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

    export class GlobalErrorController extends LocalErrorController {

        static $inject = [NGConst.$SCOPE, ErrorIntercept.NG_NAME, NGConst.$MODAL];
        static NG_NAME: string = 'GlobalErrorController';

        private modalInstance: IModalServiceInstance;

        constructor($scope: IErrorScope, errorIntercept: ErrorIntercept, private $modal: IModalService) {
            super($scope, errorIntercept);
            this.addScopeMethods('close');
        }

        onError(errorCode: string) {

            var modalObj: IModalSettings = {
                templateUrl: 'error/ui/globalError.tpl.html',
                scope: this.$scope,
                animation: true
            };

            super.onError(errorCode);
            this.modalInstance = this.$modal.open(modalObj);
        }

        close = () => {
            this.modalInstance.close();
        };
    }
}