module jm.auth.ctrl {
    'use strict';

    import AliasModel = jm.user.AliasModel;
    import RouteUtil = jm.common.RouteUtil;
    import NGConst = jm.common.NGConst;
    import RouteConst = jm.common.RouteConst;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    import INgModelController = ng.INgModelController;

    export interface IRegisterFormScope extends jm.common.ctrl.IBaseModalInstanceScope {
        registerForm: ng.IFormController;
        password: string;
        password2: string;
        email: string;
        name: string;
    }

    export class RegisterFormController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, AuthModel.NG_NAME, RouteUtil.NG_NAME];

        constructor(private $scope: IRegisterFormScope,
                    $modalInstance: IModalServiceInstance,
                    private authModel: AuthModel,
                    private routeUtil: RouteUtil) {
            super($scope, $modalInstance);

            this.addScopeMethods('hasValidName', 'hasValidEmail', 'hasDiffPasswords', 'register');
        }

        hasValidName = (): boolean => {
            var name: INgModelController = this.$scope.registerForm['name'];
            return name.$invalid && name.$touched;
        };

        hasValidEmail = (): boolean => {
            var email: INgModelController = this.$scope.registerForm['email'];
            return email.$invalid && email.$touched;
        };

        hasDiffPasswords = (): boolean => {
            if (!this.$scope.password || !this.$scope.password2 || !this.$scope.registerForm.$submitted) {
                return false;
            }
            return this.$scope.password !== this.$scope.password2;
        };

        register = () => {
            this.authModel.register(this.$scope.email, this.$scope.password, this.$scope.name)
                .then(this.registerSuccess, this.registerFailure);

        };

        registerSuccess = () => {
            if (this.authModel.isLoggedIn()) {
                this.$scope.registerForm['email'].$setValidity('emailTaken', true);
                this.routeUtil.redirectTo(RouteConst.DASHBOARD);
                this.close();
            }
        };

        registerFailure = () => {
            this.$scope.registerForm['email'].$setValidity('emailTaken', false);
        };
    }
}