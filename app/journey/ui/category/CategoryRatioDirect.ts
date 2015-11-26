module jm.journey {

    import CategoryRatioController = jm.journey.ctrl.CategoryRatioController;

    export class CategoryRatioDirect implements ng.IDirective {

        static NG_NAME: string = 'jmCategoryRatio';
        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: string = 'journey/ui/category/categoryRatio.tpl.html';
        scope: any = {
            categoryWeights: '=',
            onDeleteCategory: '&',
            canEdit: '@'
        };
        controller: string = CategoryRatioController.NG_NAME;

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}
