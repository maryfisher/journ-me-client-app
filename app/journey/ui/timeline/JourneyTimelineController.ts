module jm.journey.ctrl {
    'use strict';

    import RouteUtil = jm.common.RouteUtil;
    import NGConst = jm.common.NGConst;
    import RouteConst = jm.common.RouteConst;
    import MomentBaseVO = jm.moment.MomentBaseVO;

    export class JourneyTimelineController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE, JourneyModel.NG_NAME, RouteUtil.NG_NAME, NGConst.$ELEMENT,
                          NGConst.$STATE_PARAMS, '$timeout', '$animate'];

        static ELM_W: number = 50;
        private joinedAliasIds: string[];
        private timelineElm: HTMLElement; //ng.IAugmentedJQuery;

        constructor(private $scope: IJourneyTimelineScope,
            private journeyModel: JourneyModel, private routeUtil: RouteUtil, private $element: ng.IAugmentedJQuery,
            private $stateParams: angular.ui.IStateParamsService, private $timeout: angular.ITimeoutService,
            private $animate: angular.animate.IAnimateService) {
            super($scope);

            //TODO
            //better way?
            this.timelineElm = this.$element.children()[2];

            $scope.selectedIndex = -1;
            this.addScopeMethod('getMomentClass');
            this.addScopeMethod('setSelected');
            this.addScopeMethod('nextMoment');
            this.addScopeMethod('prevMoment');
            _.bindAll(this, 'selectIndex', 'scrollTimeline');
            if (!$scope.journeyId) {
                _.bindAll(this, 'getJourney');
                $scope.$watch('journeyId', this.getJourney);
            } else {
                this.getJourney();
            }


        }

        getJourney() {
            if (!this.$scope.journeyId) {
                return;
            }
            this.$scope.journey = this.journeyModel.getJourney(this.$scope.journeyId);
            this.joinedAliasIds = [];
            if (!this.$scope.hasEdit) {
                return;
            }
            this.joinedAliasIds.push(this.$scope.journey.alias._id);
            for (var i: number = 0; i < this.$scope.journey.joinedAliases.length; i++) {
                this.joinedAliasIds.push(this.$scope.journey.joinedAliases[i]._id);
            }

            var len: number = this.$scope.journey.moments.length;
            if (this.$stateParams['momentId']) {
                for (i = 0; i < len; i++) {
                    if (this.$scope.journey.moments[i]._id === this.$stateParams['momentId']) {
                        break;
                    }
                }
                this.$scope.selectedIndex = i;
            } else {
                this.$scope.selectedIndex = len - 1;
            }
            this.$scope.selectedMoment = this.$scope.journey.moments[this.$scope.selectedIndex];
            this.$timeout(this.scrollTimeline);
        }

        setSelected(moment: MomentBaseVO) {
            if (this.$scope.selectedMoment === moment) {
                this.$scope.selectedMoment = undefined;
                this.$scope.selectedIndex = -1;
            } else {
                this.$scope.selectedMoment = moment;
                this.$scope.selectedIndex = this.$scope.journey.moments.indexOf(moment);
                this.scrollTimeline();
            }
        }

        nextMoment() {
            this.$scope.selectedIndex++;
            if (this.$scope.selectedIndex >= this.$scope.journey.moments.length) {
                this.$scope.selectedIndex = this.$scope.journey.moments.length - 1;
                return;
            }
            this.selectIndex();
        }

        prevMoment() {
            this.$scope.selectedIndex--;
            if (this.$scope.selectedIndex < 0) {
                this.$scope.selectedIndex = 0;
                return;
            }
            this.selectIndex();
        }

        selectIndex() {
            this.$scope.selectedMoment = this.$scope.journey.moments[this.$scope.selectedIndex];
            this.scrollTimeline();
            this.routeUtil.redirectTo(RouteConst.MOMENT_DETAIL, {
                journeyId: this.$scope.journey._id,
                momentId: this.$scope.selectedMoment._id
            });

        }

        scrollTimeline() {

            var elmW: number = JourneyTimelineController.ELM_W;
            var buttonW: number = 26 * 2;
            var timelineW: number = this.timelineElm.clientWidth - buttonW; //angular.element(this.$element)[0].clientWidth - 40;
            var currentPos: number = this.timelineElm.scrollLeft;
            var firstIndex: number = Math.round(currentPos / elmW);
            var lastIndex: number = firstIndex + Math.floor(timelineW / elmW) - 1;
            var isSmaller: boolean = this.$scope.selectedIndex < firstIndex;
            var isLarger: boolean = this.$scope.selectedIndex > lastIndex;
            if (!isSmaller && !isLarger) {
                return;
            }
            var scroll: number;
            if (isLarger) {
                scroll = ((this.$scope.selectedIndex + 1) * elmW) - timelineW + 5; //padding
                //special scroll to show the +Moment button that's behind the last moment
                if (this.$scope.selectedIndex === this.$scope.journey.moments.length - 1) {
                    scroll += elmW;
                }
            } else {
                scroll = this.$scope.selectedIndex * elmW + 5;
            }

            //TODO
            //potentially use this for animated scrolling: https://github.com/oblador/angular-scroll
            this.timelineElm.scrollLeft = scroll;
        }

        getMomentClass(moment: MomentBaseVO): string {
            if (!this.$scope.hasEdit) {
                return 'jm-moment-alias';
            } else {
                if (!moment.isPublic) {
                    return 'jm-moment-alias-secret';
                }
                /*if (this.$scope.selectedMoment === moment) {
                    return 'jm-moment-alias-selected';
                }*/
                var index: number = this.joinedAliasIds.indexOf(moment.alias);
                return 'jm-moment-alias-' + index;
            }
        }
    }
}