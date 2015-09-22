module jm.journey.ctrl {

    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    import NGConst = jm.common.NGConst;
    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IJourneyRequestsModalScope extends jm.common.IBaseModalInstanceScope, IBaseJourneyScope {
        linkJourney(linkingFromJourney: JourneyBaseVO);
        acceptJoinRequest(alias: AliasBaseVO);
    }

    export class JourneyRequestsModalController extends jm.common.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME];

        constructor(private $scope: IJourneyRequestsModalScope, $modalInstance: IModalServiceInstance, private journeyModel: JourneyModel) {
            super($scope, $modalInstance);
            $scope.journeyDetail = new JourneyDetailVO(angular.fromJson($scope.journeyStr));
            this.addScopeMethod('linkJourney');
            this.addScopeMethod('acceptJoinRequest');
        }

        linkJourney(linkingFromJourney: JourneyBaseVO) {
            this.journeyModel.linkBackJourney(this.$scope.journeyDetail, linkingFromJourney);
            this.close();
        }

        acceptJoinRequest(alias: AliasBaseVO) {
            this.journeyModel.acceptJoinRequest(alias);
            this.close();
        }
    }
}