module jm.config {

    import AuthModel = jm.auth.AuthModel;
    import RouteUtil = jm.common.RouteUtil;
    import RouteConst = jm.common.RouteConst;
    import NGConst = jm.common.NGConst;
    import IRootScopeService = ng.IRootScopeService;

    export class StateRedirectCommand {

        private $rootScope: IRootScopeService;
        private routeUtil: RouteUtil;
        private authModel: AuthModel;

        constructor($injector: ng.auto.IInjectorService) {
            this.$rootScope = $injector.get < IRootScopeService >(NGConst.$ROOT_SCOPE);
            this.routeUtil = $injector.get < RouteUtil >(RouteUtil.NG_NAME);
            this.authModel = $injector.get < AuthModel >(AuthModel.NG_NAME);
            this.execute();
        }

        execute() {
            this.$rootScope.$on(NGConst.$STATE_CHANGE_START, this.onStateChangeStart);
        }

        onStateChangeStart = (event: ng.IAngularEvent, nextState: angular.ui.IState, nextParams) => {

            if (!nextState.data) {
                return;
            }
            var params: any = {};

            if (!this.authModel.isLoggedIn() && nextState.data.redirectIfUnauthenticated) {
                event.preventDefault();

                if (nextState.data.redirectState === RouteConst.ALIAS_DETAIL) {
                    params = nextParams;
                }
                this.routeUtil.redirectTo(nextState.data.redirectState, params);
            } else if (this.authModel.isLoggedIn() && nextState.data.redirectIfAuthenticated) {
                params.aliasId = this.authModel.currentUser.currentAlias;
                if (nextState.name === RouteConst.ALIAS_DETAIL) {
                    if (nextParams['aliasId'] !== this.authModel.currentUser.currentAlias) {
                        return;
                    }
                }

                event.preventDefault();
                this.routeUtil.redirectTo(nextState.data.redirectState, params);
            } else if (nextState.data.redirectAll) {
                if (nextState.name === RouteConst.DASHBOARD) {
                    if (nextParams['aliasId'] === this.authModel.currentUser.currentAlias) {
                        return;
                    } else {
                        params.aliasId = nextParams['aliasId'];
                    }
                }
                event.preventDefault();
                this.routeUtil.redirectTo(nextState.data.redirectState, params);
            }
        }
    }
}