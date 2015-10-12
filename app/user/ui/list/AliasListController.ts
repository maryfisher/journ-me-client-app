module jm.user.ctrl {

    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    import NGConst = jm.common.NGConst;
    import JourneyModel = jm.journey.JourneyModel;

    export class AliasListController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME];

        constructor(private $scope: IAliasListModalScope, $modalInstance: IModalServiceInstance, private journeyModel: JourneyModel) {
            super($scope, $modalInstance);
            this.addScopeMethods('removeJoinedAlias');
        }

        removeJoinedAlias = (alias: AliasBaseVO) => {
            this.journeyModel.removeJoinedAlias(alias);
        }
    }
}