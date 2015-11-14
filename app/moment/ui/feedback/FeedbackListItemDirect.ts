module jm.moment {

    export class FeedbackListItemDirect implements ng.IDirective {

        static NG_NAME: string = 'jmFeedbackListItem';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any = 'moment/ui/feedback/feedbackListItem.tpl.html';
        scope: any = {
            feedback: '=jmFeedback'
        };

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}