module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import RouteConst = jm.common.RouteConst;
    import RouteUtil = jm.common.RouteUtil;

    export interface IMomentEditScope extends IMomentDetailScope {
        hasMoment: boolean;
        cancel();
    }

    export class MomentEditFormController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS, RouteUtil.NG_NAME];

        constructor(private $scope: IMomentEditScope, private momentModel: MomentModel, private $stateParams: angular.ui.IStateParamsService, private routeUtil: RouteUtil) {
            super($scope);
            this.addScopeMethod('cancel');
            this.addScopeMethod('save');
            _.bindAll(this, 'saveNewSuccess');
            $scope.hasMoment = (!!$stateParams['momentId']);

            if ($scope.hasMoment) {
                $scope.moment = momentModel.getCurrentMoment($stateParams['momentId']);
                if (!$scope.moment.isAlias) {
                    this.cancel();
                }
            } else {
                $scope.moment = new MomentDetailVO();
            }
        }

        cancel() {
            if (!this.$scope.hasMoment && !this.$scope.moment._id) {
                this.routeUtil.redirectTo(RouteConst.JOURNEY_DETAIL, {
                    journeyId: this.$stateParams['journeyId']
                });
            } else {
                var momentId = this.$scope.moment._id || this.$stateParams['momentId'];
                this.routeUtil.redirectTo(RouteConst.MOMENT_DETAIL, {
                    journeyId: this.$stateParams['journeyId'],
                    momentId: momentId
                });
            }
        }

        save() {
            if (!this.$scope.hasMoment) {
                this.momentModel.createMoment(this.$scope.moment, this.$stateParams['journeyId']).then(this.saveNewSuccess);
            } else {
                this.momentModel.updateMoment(this.$scope.moment).then(this.cancel);
            }
        }

        saveNewSuccess() {
            this.$scope.moment = this.momentModel.getCurrentMoment();
            this.cancel();
        }
    }
}

/*(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.controller('jmMomentEditFormController', function ($scope, jmMomentModel, jmRouteUtil, jmRouteConst, $stateParams) {

        $scope.cancel = function () {
            if (!$scope.hasMoment && !$scope.moment._id) {
                jmRouteUtil.redirectTo(jmRouteConst.JOURNEY_DETAIL, {
                    journeyId: $stateParams.journeyId
                });
            } else {
                var momentId = $scope.moment._id || $stateParams.momentId;
                jmRouteUtil.redirectTo(jmRouteConst.MOMENT_DETAIL, {
                    journeyId: $stateParams.journeyId,
                    momentId: momentId
                });
            }
        };

        $scope.hasMoment = (!!$stateParams.momentId);
        if ($scope.hasMoment) {
            $scope.moment = jmMomentModel.getCurrentMoment($stateParams.momentId);
            if (!$scope.moment.isAlias) {
                $scope.cancel();
            }
        } else {
            $scope.moment = {
                _id: undefined,
                descript: ''
            };
        }

        $scope.save = function () {
            if (!$scope.hasMoment) {
                jmMomentModel.createMoment($scope.moment, $stateParams.journeyId).then(function () {
                    $scope.moment = jmMomentModel.getCurrentMoment();
                    $scope.cancel();
                });
            } else {
                jmMomentModel.updateMoment($scope.moment, $stateParams.journeyId).then($scope.cancel);
            }
        };

    });


}(window.angular));*/