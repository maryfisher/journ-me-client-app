module jm.journey {

    import CategoryListItemController = jm.journey.ctrl.CategoryListItemController;
    import JMConfigConst = jm.common.JMConfigConst;

    export class CategoryListItemDirect implements ng.IDirective {

        static NG_NAME: string = 'jmCategoryListItem';
        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: string = 'journey/ui/category/categoryListItem.tpl.html';
        scope: any = {
            categoryWeight: '='
        };
        controller: string = CategoryListItemController.NG_NAME;
        controllerAs: string = JMConfigConst.CTRL;

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}