module jm.journey.ctrl {

    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    import NGConst = jm.common.NGConst;

    export interface IJourneyFollowersModalScope extends jm.common.IBaseModalInstanceScope, IBaseJourneyScope {

    }

    export class JourneyFollowersModalController extends jm.common.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE];

        constructor(private $scope: IJourneyFollowersModalScope, $modalInstance: IModalServiceInstance) {
            super($scope, $modalInstance);
            $scope.journey = new JourneyDetailVO(angular.fromJson($scope.journeyStr));
        }
    }
}