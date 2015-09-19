module jm {
    export module config {

        import AuthModel = jm.auth.AuthModel;
        import RouteUtil = jm.common.RouteUtil;
        import NGConst = jm.common.NGConst;

        export class StateRedirectCommand {
            static execute($rootScope: ng.IRootScopeService, routeUtil: RouteUtil, authModel: AuthModel) {
                $rootScope.$on(NGConst.$STATE_CHANGE_START, function (event: ng.IAngularEvent, next) {

                    if (!authModel.isLoggedIn() && next.data && next.data.redirectIfUnauthenticated) {
                        event.preventDefault();
                        routeUtil.redirectTo(next.data.redirectState);
                    } else if (authModel.isLoggedIn() && next.data && next.data.redirectIfAuthenticated) {
                        event.preventDefault();
                        routeUtil.redirectTo(next.data.redirectState);
                    }
                });
            }
        }
    }
}