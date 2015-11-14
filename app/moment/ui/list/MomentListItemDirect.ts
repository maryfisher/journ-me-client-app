module jm.moment {

    export class MomentListItemDirect implements ng.IDirective {

        static NG_NAME: string = 'jmMomentListItem';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any = 'moment/ui/list/momentListItem.tpl.html';
        scope: any = {
            moment: '=jmMoment'
        };

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}