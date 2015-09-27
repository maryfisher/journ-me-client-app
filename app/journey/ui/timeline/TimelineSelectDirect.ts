module jm.journey {

    import IAnimateCssService = angular.animate.IAnimateCssService;
    import NGConst = jm.common.NGConst;

    export class TimelineSelectDirect implements ng.IDirective {

        static NG_NAME: string = 'jmTimelineSelect';

        private $animateCss: IAnimateCssService;

        //require: string = '^jmJourneyTimeline';
        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any = 'journey/ui/timeline/timelineSelect.tpl.html';
        controller: string = 'TimelineSelectController';

        /*link: ng.IDirectiveLinkFn = (scope: IJourneyTimelineScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            scope.$watch('selectedIndex', function () {
                console.log('go to ' + (scope.selectedIndex * 40).toString());
                console.log(this.$animateCss);
                //element[0].addClass();
                this.$animateCss(element, {
                    from: {
                        left: '0px'
                    },
                    to: {
                        left: (scope.selectedIndex * 40).toString() + 'px'
                    },
                    duration: 1 // one second
                });
            });
        };*/

        constructor($injector: ng.auto.IInjectorService) {
            /*this.$animateCss = $injector.get < IAnimateCssService > (NGConst.$ANIMATE_CSS);
            console.log(this.$animateCss);*/
        }
    }
}