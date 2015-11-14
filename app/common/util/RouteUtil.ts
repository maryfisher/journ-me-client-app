/// <reference path="../const/RouteConst.ts" />
module jm.common {

    import IStateService = angular.ui.IStateService;
    import IInjectorService = ng.auto.IInjectorService;

    export class RouteUtil {

        static NG_NAME: string = 'routeUtil';

        private $state: IStateService;

        constructor($injector: IInjectorService) {
            this.$state = $injector.get < IStateService >(NGConst.$STATE);
        }

        redirectTo(state: string, params ?) {
            this.$state.go(state, params);
        }

        redirectToJourney(params ?) {
            this.$state.go(RouteConst.JOURNEY_DETAIL, params);
        }

        reload() {
            this.$state.go(this.$state.$current, null, {
                reload: true
            });
        }

        isCurrent(state: string): boolean {
            return this.$state.current.name === state;
        }
    }
}