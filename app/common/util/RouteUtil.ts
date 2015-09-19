/// <reference path="../const/RouteConst.ts" />
module jm {
    export module common {

        import IStateService = angular.ui.IStateService;
        import IInjectorService = ng.auto.IInjectorService;

        export class RouteUtil {

            static NG_NAME: string = 'routeUtil';

            private $state: IStateService;

            constructor($injector: IInjectorService) {
                this.$state = $injector.get < IStateService > ('$state');
            }

            redirectTo(state, params) {
                this.$state.go(state, params);
            }

            redirectToJourney(params) {
                this.$state.go(RouteConst.JOURNEY_DETAIL, params);
            }

            reload() {
                this.$state.go(this.$state.$current, null, {
                    reload: true
                });
            }

        }
    }
}