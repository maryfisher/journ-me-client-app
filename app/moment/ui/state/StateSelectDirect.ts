module jm.moment {

    export interface IStateSelectScope extends ng.IScope {
        filter: number[];
        states: IStateVO[];
        selectState(s: IStateVO);
        onStateSelected(param: ISelectStateParams);
        types: string;
        placeholder: string;
        filteredStates: IStateVO[];
    }

    export interface ISelectStateParams {
        state: IStateVO;
    }

    export class StateSelectDirect implements ng.IDirective {

        static NG_NAME: string = 'jmStateSelect';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: string = 'moment/ui/state/stateSelect.tpl.html';
        scope: any = {
            states: '=',
            onStateSelected: '&',
            types: '@'
        };
        link = (scope: IStateSelectScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            scope.filter = [];
            var filterStr: string[] = scope.types.split(',');
            for (var i: number = 0; i < filterStr.length; i++) {
                scope.filter.push(parseInt(filterStr[i]));
            }
            scope.selectState = (s: IStateVO) => {
                scope.onStateSelected({'state': s});
            };
            if (scope.filter.indexOf(0) !== -1) {
                scope.placeholder = 'Tell us what you were feeling!';
            } else if (scope.filter.indexOf(3) !== -1) {
                scope.placeholder = 'What needs got met?';
            } else if (scope.filter.indexOf(4) !== -1) {
                scope.placeholder = 'What needs opened up?';
            }
        };

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}