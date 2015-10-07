module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;

    export interface IMomentDetailScope extends ng.IScope {
        moment: MomentDetailVO;
    }
    export class MomentDetailController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS];

        constructor(private $scope: IMomentDetailScope, private momentModel: MomentModel, $stateParams: angular.ui.IStateParamsService) {
            super($scope);
            $scope.moment = this.momentModel.getCurrentMoment($stateParams['momentId']);
        }
    }
}