module jm.journey.ctrl {

    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    import NGConst = jm.common.NGConst;
    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IJourneyRequestsModalScope extends jm.common.ctrl.IBaseModalInstanceScope {
        linkJourney(linkingFromJourney: JourneyBaseVO);
        acceptJoinRequest(alias: AliasBaseVO);
        journey: JourneyDetailVO;
    }

    export class JourneyRequestsModalController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME];

        constructor(private $scope: IJourneyRequestsModalScope, $modalInstance: IModalServiceInstance, private journeyModel: JourneyModel) {
            super($scope, $modalInstance);
            this.addScopeMethods('linkJourney', 'acceptJoinRequest');
        }

        linkJourney = (linkingFromJourney: JourneyBaseVO) => {
            this.journeyModel.linkBackJourney(this.$scope.journey, linkingFromJourney);
            this.close();
        }

        acceptJoinRequest = (alias: AliasBaseVO) => {
            this.journeyModel.acceptJoinRequest(alias);
            this.close();
        }
    }
}