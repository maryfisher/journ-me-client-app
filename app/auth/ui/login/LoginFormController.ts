module jm.auth.ctrl {
    'use strict';

    import RouteUtil = jm.common.RouteUtil;
    import NGConst = jm.common.NGConst;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

    export interface ILoginFormScope extends jm.common.ctrl.IBaseModalInstanceScope {
        rememberMe: boolean;
        login();
        forgotPW();
        hasInvalidEmail(): boolean;
        loginForm: ng.IFormController;
        email: string;
        password: string;
    }

    export class LoginFormController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, AuthModel.NG_NAME, RouteUtil.NG_NAME];

        constructor(private $scope: ILoginFormScope,
                    $modalInstance: IModalServiceInstance,
                    private authModel: AuthModel,
                    private routeUtil: RouteUtil) {
            super($scope, $modalInstance);

            $scope.rememberMe = true;
            this.addScopeMethods('login', 'hasInvalidEmail');
        }


        hasInvalidEmail = (): boolean => {
            return this.$scope.loginForm['email'].$invalid && this.$scope.loginForm['email'].$touched;
        };

        login = () => {
            this.authModel.login(this.$scope.email, this.$scope.password, this.$scope.rememberMe).then(
                this.loginSuccess, this.loginFailure);

        };

        private loginSuccess = () => {
            if (this.authModel.isLoggedIn()) {
                this.$scope.loginForm.$setValidity('pw', true, null);
                this.routeUtil.reload();
                this.close();
            }
        };

        private loginFailure = () => {
            this.$scope.loginForm.$setValidity('pw', false, null);
        }

        forgotPW = () => {

        }
    }
}