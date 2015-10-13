module jm.moment {

    import BlinkFormatController = jm.moment.ctrl.BlinkFormatController;
    import ITimeoutService = angular.ITimeoutService;

    export interface IBlinkFormElementScope extends ng.IScope {
        size: string;
        id: string;
        order: number;
        formBlink: BlinkFormVO;
        adjustHeight($event);
    }

    export class BlinkFormElementDirect implements ng.IDirective {

        private $timeout: ITimeoutService;

        require: string = '^jmBlinkFormat';
        restrict: string = 'E';
        replace: boolean = true;
        scope: any = {
            size: '@',
            id: '@',
            order: '@?'
        };
        link = (scope: IBlinkFormElementScope, element: ng.IAugmentedJQuery,
                attrs: ng.IAttributes, ctrl: BlinkFormatController) => {
            ctrl.addElement(element, scope);

            scope.adjustHeight = ($event) => {
                var ta: HTMLElement = element.children()[0];
                ta.style.height = '1px';
                ta.style.height = 25 + ta.scrollHeight + "px";
            };

            //FIXME
            //still an issue the first time around, after selecting another format, it works flawlessly
            this.$timeout(scope.adjustHeight);
        };

        constructor($injector: ng.auto.IInjectorService) {
            this.$timeout = $injector.get<ITimeoutService>('$timeout');
        }
    }
}