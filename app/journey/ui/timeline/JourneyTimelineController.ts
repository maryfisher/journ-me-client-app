module jm {
    export module journey {
        'use strict';
        export module ctrl {

            import NGConst = jm.common.NGConst;

            export class JourneyTimelineController {
                static $inject = [NGConst.$SCOPE, JourneyModel.NG_NAME];

                constructor(private $scope: IJourneyTimelineScope,
                    private journeyModel: JourneyModel) {
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
                }
            }

        }
    }
}