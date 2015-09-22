module jm.journey.ctrl {
    'use strict';

    import RouteUtil = jm.common.RouteUtil;
    import NGConst = jm.common.NGConst;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

    export interface IJourneyFormScope extends jm.common.ctrl.IBaseModalInstanceScope, IBaseJourneyScope {
        hasJourney: boolean;
        //journey: IJourneyBaseVO;
        journeyForm: ng.IFormController;
        save();
    }

    export class JourneyFormController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME, RouteUtil.NG_NAME];

        constructor(private $scope: IJourneyFormScope,
            $modalInstance: IModalServiceInstance,
            private journeyModel: JourneyModel,
            private routeUtil: RouteUtil) {
            super($scope, $modalInstance);
            $scope.hasJourney = (!!$scope.journeyStr);
            if (!$scope.hasJourney) {
                $scope.journey = new JourneyBaseVO();
            } else {
                $scope.journey = new JourneyBaseVO(angular.fromJson($scope.journeyStr));
            }

            this.addScopeMethod('save');
            _.bindAll(this, 'saveSuccess');
        }

        save() {
            if (this.$scope.journeyForm.$valid) {
                if (!this.$scope.hasJourney) {
                    this.journeyModel.createJourney(this.$scope.journey).then(this.saveSuccess);
                } else {
                    this.journeyModel.updateJourney(this.$scope.journey).then(this.close);
                }
            }
        }

        saveSuccess() {
            this.routeUtil.redirectToJourney(this.journeyModel.getCurrentJourney()._id);
            this.close();
        }
    }
}