module jm.common.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export interface IBaseModalInstanceScope extends ng.IScope {
        cancel();
    }

    export class BaseModalInstanceController extends BaseController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE];

        constructor($scope: IBaseModalInstanceScope, private $modalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            super($scope);
            this.addScopeMethods('cancel');
        }

        cancel = () => {
            this.$modalInstance.dismiss('dismiss');
        }

        close = () => {
            this.$modalInstance.close();
        }
    }
}