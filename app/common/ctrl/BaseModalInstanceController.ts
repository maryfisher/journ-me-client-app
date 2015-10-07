module jm.common {
    'use strict';

    export interface IBaseModalInstanceScope extends ng.IScope {
        cancel();
    }

    export class BaseModalInstanceController extends BaseController {

        constructor($scope: IBaseModalInstanceScope, private $modalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            super($scope);
            this.addScopeMethod('cancel');
            _.bindAll(this, 'close');
        }

        cancel() {
            this.$modalInstance.dismiss('dismiss');
        }

        close() {
            this.$modalInstance.close();
        }
    }
}