module jm.journey.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import MomentBaseVO = jm.moment.MomentBaseVO;

    export class JourneyTimelineController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE, JourneyModel.NG_NAME];
        private joinedAliasIds: string[];

        constructor(private $scope: IJourneyTimelineScope,
            private journeyModel: JourneyModel) {
            super($scope);
            this.addScopeMethod('getMomentClass');
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
        }

        getMomentClass(moment: MomentBaseVO): string {
            if (!this.$scope.hasEdit) {
                return 'jm-moment-alias';
            } else {
                var index: number = this.joinedAliasIds.indexOf(moment.alias);
                return 'jm-moment-alias-' + index;
            }
        }
    }
}