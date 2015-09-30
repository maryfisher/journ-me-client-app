module jm.moment {

    export interface IBlinkFormScope extends ng.IScope {
        getColClass(): string;
        size: string;
        id: string;
    }

    export class BlinkFormDirect implements ng.IDirective {

        restrict: string = 'E';
        replace: boolean = true;
        scope: any = {
            size: '@',
            id: '@'
        }
        link = (scope: IBlinkImgScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            scope.getColClass = function () {
                if (scope.size === 'sm') {
                    return 'col-sm-6';
                }
                return 'col-sm-12';
            }
        }

        constructor() {

        }
    }
}