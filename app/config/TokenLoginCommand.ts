module jm.config {

    import AuthModel = jm.auth.AuthModel;
    import RouteUtil = jm.common.RouteUtil;

    export class TokenLoginCommand {

        private authModel: AuthModel;
        private routeUtil: RouteUtil;

        constructor($injector: ng.auto.IInjectorService) {
            this.authModel = $injector.get < AuthModel >(AuthModel.NG_NAME);
            this.routeUtil = $injector.get < RouteUtil >(RouteUtil.NG_NAME);
            this.execute();
        }

        private execute() {
            this.authModel.tokenLogin().then(function () {
                if (this.authModel.isLoggedIn()) {
                    this.routeUtil.reload();
                }
            });
        }
    }
}