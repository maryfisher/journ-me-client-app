///<reference path="..\..\..\common\const\JMConfigConst.ts"/>
///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\util\RouteUtil.ts"/>
///<reference path="..\..\model\CategoryVO.ts"/>
///<reference path="..\..\model\CategoryWeightVO.ts"/>
module jm.journey.ctrl {
    'use strict';

    import RouteUtil = jm.common.RouteUtil;
    import NGConst = jm.common.NGConst;
    import JMConfigConst = jm.common.JMConfigConst;
    import ICategoryVO = jm.journey.ICategoryVO;
    import CategoryWeightVO = jm.journey.CategoryWeightVO;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

    export interface IJourneyFormScope extends jm.common.ctrl.IBaseModalInstanceScope {
        hasJourney: boolean;
        journey: JourneyBaseVO;
        journeyForm: ng.IFormController;
        save();
        missingCategories: ICategoryVO[];
        selectedCategory: string;
    }

    export class JourneyEditFormController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject: string[] = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME, RouteUtil.NG_NAME,
            JMConfigConst.CATEGORIES];
        static NG_NAME: string = 'JourneyEditFormController';

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
                    var add: boolean = true;
                    for (var j = 0; j < $scope.journey.categoryWeights.length; j++) {
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

            this.addScopeMethods('save', 'selectCategory', 'deleteCategory');
        }

        selectCategory = (cat: ICategoryVO) => {
            //TODO: determine weight based on existing categories, adjust other weights
            var weight: CategoryWeightVO = new CategoryWeightVO();
            weight.category = cat.id;
            weight.categoryRef = cat;
            weight.weight = 100 / (this.$scope.journey.categoryWeights.length + 1);
            for (var i = 0; i < this.$scope.journey.categoryWeights.length; i++) {
                this.$scope.journey.categoryWeights[i].weight = weight.weight;
            }
            this.$scope.journey.categoryWeights.push(weight);
            this.$scope.missingCategories.splice(this.$scope.missingCategories.indexOf(cat), 1);
            this.$scope.selectedCategory = '';
        };

        deleteCategory = (categoryWeight: CategoryWeightVO) => {
            //TODO readjust weights
            this.$scope.journey.categoryWeights.splice(this.$scope.journey.categoryWeights.indexOf(categoryWeight), 1);
            this.$scope.missingCategories.push(categoryWeight.categoryRef);
        };

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