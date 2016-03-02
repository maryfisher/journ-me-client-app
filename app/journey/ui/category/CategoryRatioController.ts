///<reference path="..\..\..\common\ctrl\BaseController.ts"/>
///<reference path="..\..\..\common\const\NGConst.ts"/>
module jm.journey.ctrl {

    import NGConst = jm.common.NGConst;

    export interface ICategoryScope extends ng.IScope {
        categoryWeights: CategoryWeightVO[];
        deleteCategory(cat: CategoryWeightVO);
        getCategory(cat: CategoryWeightVO);
        onDeleteCategory(param: ICategoryWeightParams);
        canEdit: boolean;
    }

    export interface ICategoryWeightParams {
        categoryWeight: CategoryWeightVO;
    }

    export class CategoryRatioController extends jm.common.BaseController {

        static $inject: string[] = [NGConst.$SCOPE, JourneyModel.NG_NAME];
        static NG_NAME: string = 'CategoryRatioController';

        constructor(private $scope: ICategoryScope, private journeyModel: JourneyModel) {
            super($scope);

            this.addScopeMethods('changeRatio', 'deleteCategory', 'hasLeft', 'hasRight', 'getCategory');
        }

        deleteCategory = (cat: CategoryWeightVO) => {
            this.$scope.onDeleteCategory({'categoryWeight': cat});
        };

        changeRatio = (index: number, category: CategoryWeightVO, direction: number) => {
            var mult: number = 5;
            var otherCat: CategoryWeightVO = this.$scope.categoryWeights[index + direction];
            if (otherCat && otherCat.weight > mult * 3) {
                category.weight += mult;
                otherCat.weight -= mult;
            }
        };

        hasLeft = (index: number): boolean => {
            return index > 0;
        };

        hasRight = (index: number): boolean => {
            return index < this.$scope.categoryWeights.length - 1;
        };

        getCategory = (categoryWeight: CategoryWeightVO): ICategoryVO => {
            return this.journeyModel.getCategory(categoryWeight);
        };
    }
}