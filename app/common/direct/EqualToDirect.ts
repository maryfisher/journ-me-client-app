module jm.common {
    'use strict';

    export class EqualToDirect implements ng.IDirective {

        static NG_NAME: string = 'jmEqualToDirect';
        private static OTHER_NAME: string = 'otherModelVal';

        restrict: string = 'A';
        require: string = 'ngModel';
        scope: any = {
            otherModelVal: "=" + EqualToDirect.NG_NAME
        };
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) => {
            ngModel.$validators["equalTo"] = function (modelVal: any): boolean {
                return modelVal === scope[EqualToDirect.OTHER_NAME];
            };

            scope.$watch(EqualToDirect.OTHER_NAME, function (): void {
                ngModel.$validate();
            });

        };
    }
}