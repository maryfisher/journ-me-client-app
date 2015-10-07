module jm.journey.ctrl {

    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    import NGConst = jm.common.NGConst;

    export interface IJourneyLinkRequestsModalScope extends jm.common.IBaseModalInstanceScope, IBaseJourneyScope {
        linkJourney(linkingFromJourney: JourneyBaseVO);
    }

    export class JourneyLinkRequestsModalController extends jm.common.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME];

        constructor(private $scope: IJourneyLinkRequestsModalScope, $modalInstance: IModalServiceInstance, private journeyModel: JourneyModel) {
            super($scope, $modalInstance);
            $scope.journeyDetail = new JourneyDetailVO(angular.fromJson($scope.journeyStr));
            this.addScopeMethod('linkJourney');
        }

        linkJourney(linkingFromJourney: JourneyBaseVO) {
            this.journeyModel.linkBackJourney(this.$scope.journeyDetail, linkingFromJourney);
            this.close();
        }
    }
}