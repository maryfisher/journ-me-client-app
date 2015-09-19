module jm {
    export module auth {
        'use strict';
        export module ctrl {

            import AliasModel = jm.user.AliasModel;
            import RouteUtil = jm.common.RouteUtil;
            import NGConst = jm.common.NGConst;
            import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

            export interface ILoginFormScope extends ng.IScope {
                rememberMe: boolean;
                cancel();
                login();
                forgotPW();
                hasInvalidEmail(): boolean;
                loginForm: ng.IFormController;
                email: string;
                password: string;
            }

            export class LoginFormController extends jm.common.BaseController {

                static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, AuthModel.NG_NAME, RouteUtil.NG_NAME];

                constructor(private $scope: ILoginFormScope,
                    private $modalInstance: IModalServiceInstance,
                    private authModel: AuthModel,
                    private routeUtil: RouteUtil) {
                    super($scope);

                    this.addScopeMethod('cancel');
                    this.addScopeMethod('hasInvalidEmail');
                    this.addScopeMethod('login');
                    this.addScopeMethod('forgotPW');
                    _.bindAll(this, 'loginSuccess', 'loginFailure');

                    $scope.rememberMe = true;
                }

                cancel() {
                    this.$modalInstance.dismiss('cancel');
                }


                hasInvalidEmail(): boolean {
                    return this.$scope.loginForm['email'].$invalid && this.$scope.loginForm['email'].$touched;
                }

                login() {
                    this.authModel.login(this.$scope.email, this.$scope.password, this.$scope.rememberMe).then(
                        this.loginSuccess, this.loginFailure);

                }

                loginSuccess() {
                    if (this.authModel.isLoggedIn()) {
                        //TO TEST have to test of passing null breaks functionality
                        this.$scope.loginForm.$setValidity('pw', true, null);
                        this.routeUtil.reload();
                        this.$modalInstance.close();
                    }
                }

                loginFailure() {
                    //TO TEST have to test of passing null breaks functionality
                    this.$scope.loginForm.$setValidity('pw', false, null);
                }

                forgotPW() {

                }
            }
        }
    }
}