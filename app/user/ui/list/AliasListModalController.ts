module jm.user.ctrl {

    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

    export class AliasListModalController extends jm.common.BaseModalInstanceController {

        constructor(private $scope: IAliasListModalScope, $modalInstance: IModalServiceInstance) {
            super($scope, $modalInstance);
            $scope.aliasList = angular.fromJson($scope.listStr);
        }
    }
}