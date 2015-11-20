///<reference path="..\..\..\main\model\CategoryWeightVO.ts"/>
///<reference path="..\..\..\main\model\CategoryVO.ts"/>
///<reference path="..\..\..\common\const\JMConfigConst.ts"/>
///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\util\RouteUtil.ts"/>
module jm.journey.ctrl {
    'use strict';

    import RouteUtil = jm.common.RouteUtil;
    import NGConst = jm.common.NGConst;
    import JMConfigConst = jm.common.JMConfigConst;
    import ICategoryVO = jm.main.ICategoryVO;
    import CategoryWeightVO = jm.main.CategoryWeightVO;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

    export interface IJourneyFormScope extends jm.common.ctrl.IBaseModalInstanceScope {
        hasJourney: boolean;
        journey: JourneyBaseVO;
        journeyForm: ng.IFormController;
        save();
        missingCategories: ICategoryVO[];
    }

    export class JourneyFormController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME, RouteUtil.NG_NAME,
            JMConfigConst.CATEGORIES];

        constructor(private $scope: IJourneyFormScope,
                    $modalInstance: IModalServiceInstance,
                    private journeyModel: JourneyModel,
                    private routeUtil: RouteUtil,
                    private categories: ICategoryVO[]) {
            super($scope, $modalInstance);

            $scope.hasJourney = (!!$scope.journey);

            if ($scope.hasJourney) {
                $scope.journey = new JourneyBaseVO($scope.journey);
                $scope.missingCategories = [];
                for (var i = 0; i < this.categories.length; i++) {
                    for (var j = 0; j < $scope.journey.categoryWeights.length; j++) {
                        var add: boolean = true;
                        if ($scope.journey.categoryWeights[j].category === this.categories[i].id) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        $scope.missingCategories.push(this.categories[i]);
                    }
                }
            } else {
                $scope.journey = new JourneyBaseVO();
                $scope.missingCategories = this.categories.slice();
            }

            this.addScopeMethods('save');
        }

        save = () => {
            if (this.$scope.journeyForm.$valid) {
                if (!this.$scope.hasJourney) {
                    this.journeyModel.createJourney(this.$scope.journey).then(this.saveSuccess);
                } else {
                    this.journeyModel.updateJourney(this.$scope.journey).then(this.close);
                }
            }
        };

        saveSuccess = () => {
            this.routeUtil.redirectToJourney(this.journeyModel.getCurrentJourney().id);
            this.close();
        };
    }
}