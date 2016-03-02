///<reference path="..\..\..\common\const\NGConst.ts"/>
module jm.journey.ctrl {

    import NGConst = jm.common.NGConst;

    export interface ICategoryScope extends ng.IScope {
        categoryWeight: CategoryWeightVO;
    }

    export class CategoryListItemController {

        static $inject: string[] = [NGConst.$SCOPE, JourneyModel.NG_NAME];
        static NG_NAME: string = 'CategoryListItemController';

        private category: ICategoryVO;

        constructor($scope: ICategoryScope, journeyModel: JourneyModel) {
            this.category = journeyModel.getCategory($scope.categoryWeight);
        }
    }
}