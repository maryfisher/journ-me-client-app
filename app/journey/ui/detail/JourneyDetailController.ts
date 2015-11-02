/// <reference path="../../../auth/model/AuthModel.ts" />
module jm.journey.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import AuthModel = jm.auth.AuthModel;

    export interface IJourneyDetailScope extends ng.IScope {
        journey: JourneyDetailVO;
        selectedLinkedJourney: JourneyBaseVO;
    }

    export class JourneyDetailController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, JourneyModel.NG_NAME, AuthModel.NG_NAME, NGConst.$STATE_PARAMS];

        constructor(private $scope: IJourneyDetailScope, private journeyModel: JourneyModel, private authModel: AuthModel, $stateParams: angular.ui.IStateParamsService) {
            super($scope);

            $scope.journey = this.journeyModel.getCurrentJourney($stateParams['journeyId']);

            this.addScopeMethods('setSelected', 'isNotSelected', 'followJourney', 'unfollowJourney',
                'unlinkJourney', 'requestJoin', 'leaveJourney');
        }

        setSelected = (journey: JourneyBaseVO) => {
            if (this.$scope.selectedLinkedJourney === journey) {
                this.$scope.selectedLinkedJourney = undefined;
            } else {
                this.$scope.selectedLinkedJourney = journey;
            }
        }

        isNotSelected = (id) => {
            return !(this.$scope.selectedLinkedJourney && this.$scope.selectedLinkedJourney.id === id);
        }

        followJourney = () => {
            if (this.checkForLogin()) {
                this.journeyModel.followJourney();
            }
        }

        unfollowJourney = () => {
            if (this.checkForLogin()) {
                this.journeyModel.unfollowJourney();
            }
        }

        unlinkJourney = () => {
            if (this.checkForLogin()) {
                this.journeyModel.unlinkJourney(this.$scope.journey, this.$scope.journey.aliasJourneyLink);
            }
        }

        requestJoin = () => {
            if (this.checkForLogin()) {
                this.journeyModel.requestJoin(this.$scope.journey);
            }
        }

        leaveJourney = () => {
            //TODO prompt: are you sure

            if (this.checkForLogin()) {
                this.journeyModel.leaveJourney(this.$scope.journey);
            }
        }

        checkForLogin = (): boolean => {
            var isLoggedIn: boolean = this.authModel.isLoggedIn();

            //TODO prompt login modal
            if (!isLoggedIn) {

            }

            return isLoggedIn;
        }
    }
}