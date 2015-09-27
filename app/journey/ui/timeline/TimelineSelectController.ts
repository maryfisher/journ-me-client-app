module jm.journey.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import IAnimateCssRunner = angular.animate.IAnimateCssRunner;

    export class TimelineSelectController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE, NGConst.$ANIMATE_CSS, NGConst.$ELEMENT];

        private currentPos: number = 3;
        private animator: IAnimateCssRunner;

        constructor(private $scope: IJourneyTimelineScope, private $animateCss: angular.animate.IAnimateCssService, private $element: ng.IAugmentedJQuery) {
            super($scope);
            _.bindAll(this, 'onSelectedIndexChange');
            $scope.$watch('selectedIndex', this.onSelectedIndexChange);
        }

        onSelectedIndexChange() {
            if (this.$scope.selectedIndex === -1) {
                return;
            }
            var newPos: number = this.$scope.selectedIndex * JourneyTimelineController.ELM_W + 3;
            this.animator = this.$animateCss(this.$element, {
                from: {
                    transform: 'translateX(' + this.currentPos.toString() + 'px)'
                },
                to: {
                    transform: 'translateX(' + newPos.toString() + 'px)'
                },
                duration: 0.3
            });
            this.animator.start();
            this.currentPos = newPos;
        }
    }

}