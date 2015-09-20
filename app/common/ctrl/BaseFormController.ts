module jm {
    export module common {
        'use strict';

        import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

        export interface IBaseFormScope extends ng.IScope {
            cancel();
        }

        export class BaseFormController extends BaseController {
            constructor($scope: ng.IScope,
                public $modalInstance: IModalServiceInstance) {
                super($scope);

                this.addScopeMethod('cancel');
                _.bindAll(this, 'cancel', 'close');
            }

            cancel() {
                this.$modalInstance.dismiss('cancel');
            }

            close() {
                this.$modalInstance.close();
            }
        }
    }
}