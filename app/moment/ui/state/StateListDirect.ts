module jm.moment {

    export interface IStateListScope extends ng.IScope {
        canEdit: boolean;
        states: IStateVO[];
        selectState(state: IStateVO);
        onStateSelected(params: IRemoveStateParams);
    }

    export interface IRemoveStateParams {
        state: IStateVO;
    }

    export class StateListDirect implements ng.IDirective {

        static NG_NAME: string = 'jmStateList';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: string = 'moment/ui/state/stateList.tpl.html';
        scope: any = {
            canEdit: '@?',
            states: '=',
            onStateSelected: '&?'
        };
        link = (scope: IStateListScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            scope.selectState = (s: IStateVO) => {
                scope.onStateSelected({'state': s});
            }
        };

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}