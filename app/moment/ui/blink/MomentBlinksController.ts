module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;

    export class MomentBlinksController extends jm.common.BaseController {
        static NG_NAME: string = 'MomentBlinksController';
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS];

        constructor(private $scope: IMomentDetailScope, private momentModel: MomentModel, $stateParams: angular.ui.IStateParamsService) {
            super($scope);
            $scope.moment = this.momentModel.getCurrentMoment();
        }
    }
}