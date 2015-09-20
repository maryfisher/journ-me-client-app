module jm {
    export module journey {
        'use strict';
        export module ctrl {

            import RouteUtil = jm.common.RouteUtil;
            import NGConst = jm.common.NGConst;
            import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

            export interface IJourneyFormScope extends jm.common.IBaseFormScope, IBaseJourneyScope {
                hasJourney: boolean;
                //journey: IJourneyBaseVO;
                journeyForm: ng.IFormController;
                save();
            }

            export class JourneyFormController extends jm.common.BaseFormController {

                static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME, RouteUtil.NG_NAME];

                constructor(private $scope: IJourneyFormScope,
                    $modalInstance: IModalServiceInstance,
                    private journeyModel: JourneyModel,
                    private routeUtil: RouteUtil) {
                    super($scope, $modalInstance);
                    /*console.log('journeyStr');
                    console.log($scope.journeyStr);
                    console.log('journey');
                    console.log($scope.journey);*/
                    //$scope.hasJourney = (!!$scope.journey);
                    $scope.hasJourney = (!!$scope.journeyStr);
                    if (!$scope.hasJourney) {
                        $scope.journey = new JourneyBaseVO();
                    } else {
                        //$scope.journey = new JourneyBaseVO($scope.journey);
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
    }
}

/*(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyFormController', function ($scope, $modalInstance, jmJourneyModel, jmRouteUtil) {

        $scope.hasJourney = (!!$scope.journey);
        if (!$scope.hasJourney) {
            $scope.journey = jmJourneyModel.getEmptyJourney();
        } else {
            $scope.journey = JSON.parse($scope.journey);
        }

        $scope.save = function () {
            if ($scope.journeyForm.$valid) {
                if (!$scope.hasJourney) {
                    jmJourneyModel.createJourney($scope.journey).then(
                        function () {
                            jmRouteUtil.redirectToJourney(jmJourneyModel.getCurrentJourney()._id);
                            $modalInstance.close();
                        }
                    );
                } else {
                    jmJourneyModel.updateJourney($scope.journey).then(
                        function () {
                            $modalInstance.close();
                        }
                    );
                }
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

}(window.angular));*/