module jm.journey.ctrl {

    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    import NGConst = jm.common.NGConst;
    import AliasModel = jm.user.AliasModel;
    import AliasDetailVO = jm.user.AliasDetailVO;
    import JourneyModel = jm.journey.JourneyModel;

    export interface ILinkJourneyScope extends jm.common.ctrl.IBaseModalInstanceScope {
        alias: AliasDetailVO;
        selectedJourney: JourneyBaseVO;
        select();
    }

    export class LinkJourneyModalController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, AliasModel.NG_NAME, JourneyModel.NG_NAME];

        constructor(private $scope: ILinkJourneyScope, $modalInstance: IModalServiceInstance, aliasModel: AliasModel, private journeyModel: JourneyModel) {
            super($scope, $modalInstance);
            this.addScopeMethod('select');
            $scope.alias = aliasModel.getCurrentAlias();
        }

        select() {
            this.journeyModel.linkJourney(this.$scope.selectedJourney);
            this.close();
        }
    }
}