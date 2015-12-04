module jm.auth.ctrl {
    'use strict';

    import RouteUtil = jm.common.RouteUtil;
    import RouteConst = jm.common.RouteConst;
    import ErrorConst = jm.common.ErrorConst;
    import NGConst = jm.common.NGConst;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

    export interface ILoginFormScope extends jm.common.ctrl.IBaseModalInstanceScope {
        rememberMe: boolean;
        login();
        hasInvalidEmail(): boolean;
        loginForm: ng.IFormController;
        email: string;
        password: string;
        errors: string [];
    }

    export class LoginFormController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, AuthModel.NG_NAME, RouteUtil.NG_NAME];

        constructor(private $scope: ILoginFormScope,
                    $modalInstance: IModalServiceInstance,
                    private authModel: AuthModel,
                    private routeUtil: RouteUtil) {
            super($scope, $modalInstance);

            $scope.rememberMe = true;
            $scope.errors = [ErrorConst.AUTHENTICATION_FAILED];
            this.addScopeMethods('login', 'hasInvalidEmail');
        }


        hasInvalidEmail = (): boolean => {
            return this.$scope.loginForm['email'].$invalid && this.$scope.loginForm['email'].$touched;
        };

        login = () => {
            this.authModel.login(this.$scope.email, this.$scope.password, this.$scope.rememberMe).then(
                this.loginSuccess);

        };

        private loginSuccess = () => {
            if (this.authModel.isLoggedIn()) {
                this.$scope.loginForm.$setValidity('pw', true, null);
                if (this.routeUtil.isCurrent(RouteConst.HOME)) {
                    this.routeUtil.redirectTo(RouteConst.DASHBOARD, {
                        aliasId: this.authModel.currentUser.currentAlias
                    });
                } else {
                    this.routeUtil.reload();
                }
                this.close();
            }
        };
    }
}