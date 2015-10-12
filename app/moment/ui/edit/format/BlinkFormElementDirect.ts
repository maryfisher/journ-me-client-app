module jm.moment {

    import BlinkFormatController = jm.moment.ctrl.BlinkFormatController;

    export interface IBlinkFormElementScope extends ng.IScope {
        size: string;
        id: string;
        order: number;
        formBlink: BlinkFormVO;
    }

    export class BlinkFormElementDirect implements ng.IDirective {

        require: string = '^jmBlinkFormat';
        restrict: string = 'E';
        replace: boolean = true;
        scope: any = {
            size: '@',
            id: '@',
            order: '@?'
        }
        link = (scope: IBlinkFormElementScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: BlinkFormatController) => {
            ctrl.addElement(element, scope);
        }

        constructor() {

        }
    }
}