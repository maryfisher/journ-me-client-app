module jm {
    export module journey {
        'use strict';
        export module ctrl {

            import NGConst = jm.common.NGConst;

            export interface IJourneyDetailScope extends ng.IScope {
                journey: JourneyDetailVO;
                selectedLinkedJourney: JourneyBaseVO;
            }

            export class JourneyDetailController extends jm.common.BaseController {
                static $inject = [NGConst.$SCOPE, JourneyModel.NG_NAME, NGConst.$STATE_PARAMS];

                constructor(private $scope: IJourneyDetailScope, private journeyModel: JourneyModel, $stateParams: angular.ui.IStateParamsService) {
                    super($scope);

                    $scope.journey = this.journeyModel.getCurrentJourney($stateParams['journeyId']);

                    this.addScopeMethod('setSelected');
                    this.addScopeMethod('isNotSelected');
                    this.addScopeMethod('followJourney');
                    this.addScopeMethod('unfollowJourney');
                    this.addScopeMethod('unlinkJourney');
                }

                setSelected(journey: JourneyBaseVO) {
                    if (this.$scope.selectedLinkedJourney === journey) {
                        this.$scope.selectedLinkedJourney = undefined;
                    } else {
                        this.$scope.selectedLinkedJourney = journey;
                    }
                }

                isNotSelected(id) {
                    return !(this.$scope.selectedLinkedJourney && this.$scope.selectedLinkedJourney._id === id);
                }

                followJourney() {
                    //this.journeyModel.followJourney();
                }

                unfollowJourney() {
                    //this.journeyModel.unfollowJourney();
                }

                unlinkJourney() {
                    //this.journeyModel.unlinkJourney(this.$scope.journey, this.$scope.journey.aliasJourneyLink);
                }
            }
        }
    }

}
/*(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyDetailController', function ($scope, jmJourneyModel, $stateParams) {
        $scope.journey = jmJourneyModel.getCurrentJourney($stateParams.journeyId);

        $scope.followJourney = function () {
            jmJourneyModel.followJourney();
        };

        $scope.unfollowJourney = function () {
            jmJourneyModel.unfollowJourney();
        };

        $scope.unlinkJourney = function () {
            jmJourneyModel.unlinkJourney($scope.journey, $scope.journey.aliasJourneyLink);
        };

        $scope.selectedLinkedJourney = undefined;

        $scope.setSelected = function (journey) {
            if ($scope.selectedLinkedJourney === journey) {
                $scope.selectedLinkedJourney = undefined;
            } else {
                $scope.selectedLinkedJourney = journey;
            }
        };

        $scope.isNotSelected = function (id) {
            return !($scope.selectedLinkedJourney && $scope.selectedLinkedJourney._id === id);
        };
    });


}(window.angular));*/