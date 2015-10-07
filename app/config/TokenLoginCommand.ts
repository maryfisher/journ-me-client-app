module jm {
    export module config {

        import AuthModel = jm.auth.AuthModel;
        import RouteUtil = jm.common.RouteUtil;

        export class TokenLoginCommand {
            static execute(authModel: AuthModel, routeUtil: RouteUtil) {
                authModel.tokenLogin().then(function () {
                    if (authModel.isLoggedIn()) {
                        routeUtil.reload();
                    }
                });
            }
        }
    }
}