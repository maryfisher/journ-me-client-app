module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import RouteConst = jm.common.RouteConst;

    export interface IMomentDetailScope extends ng.IScope {
        moment: MomentDetailVO;
        showSlides(): boolean;
    }
    export class MomentDetailController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS, NGConst.$STATE];

        constructor(private $scope: IMomentDetailScope, private momentModel: MomentModel, $stateParams: angular.ui.IStateParamsService, private $state: angular.ui.IStateService) {
            super($scope);
            $scope.moment = this.momentModel.getCurrentMoment($stateParams['momentId']);
            this.addScopeMethod('showsSlides');
        }

        showsSlides(): boolean {
            return this.$state.includes(RouteConst.MOMENT_SLIDES);
        }
    }
}