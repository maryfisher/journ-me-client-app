/// <reference path="../../../user/model/AliasModel.ts" />
/// <reference path="../../../common/util/RouteUtil.ts" />
module jm {
    export module auth {

        import AliasModel = jm.user.AliasModel;
        import AliasVO = jm.user.AliasVO;
        import RouteUtil = jm.common.RouteUtil;

        export class AuthBarDirect implements ng.IDirective {

            static NG_NAME: string = 'jmAuthBar';

            private authModel: AuthModel;
            private aliasModel: AliasModel;
            private routeUtil: RouteUtil;

            templateUrl: any = 'auth/ui/authBar/authBar.tpl.html';
            restrict: string = 'E';
            replace: boolean = true;
            scope: any = {};

            link = (scope: IAuthBarScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

                scope.alias = this.aliasModel.getCurrentAlias();

                //TODO probably not working!
                scope.logout = this.logout;
            };

            constructor($injector: ng.auto.IInjectorService) {
                this.authModel = $injector.get < AuthModel > (AuthModel.NG_NAME);
                this.aliasModel = $injector.get < AliasModel > (AliasModel.NG_NAME);
                this.routeUtil = $injector.get < RouteUtil > (RouteUtil.NG_NAME);
            }

            logout() {
                console.log(this);
                this.authModel.logout().then(this.logoutSuccess);
            }

            logoutSuccess() {
                if (!this.authModel.isLoggedIn()) {
                    this.routeUtil.reload();
                }
            }

            /*static factory(): ng.IDirectiveFactory {
                var directive = ($injector: IInjectorService) => new AuthBarDirect($injector);
                directive.$inject = ['$injector'];
                return directive;
            }*/
        }

        export interface IAuthBarScope extends ng.IScope {
            alias: AliasVO;
            logout();
        }
    }
}