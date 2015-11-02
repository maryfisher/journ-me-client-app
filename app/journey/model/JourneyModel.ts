module jm.journey {
    'use strict';

    import AliasDetailVO = jm.user.AliasDetailVO;
    import AliasBaseVO = jm.user.AliasBaseVO;
    import IPromise = angular.IPromise;

    export class JourneyModel {

        static NG_NAME: string = 'journeyModel';

        private journeyService: JourneyDAO;
        private journeyActionService: JourneyActionDAO;
        private currentJourney: JourneyDetailVO;
        private currentAlias: AliasDetailVO;

        constructor($injector: ng.auto.IInjectorService) {
            this.journeyService = $injector.get < JourneyDAO >(JourneyDAO.NG_NAME);
            this.journeyActionService = $injector.get < JourneyActionDAO >(JourneyActionDAO.NG_NAME);

            this.currentJourney = new JourneyDetailVO();
        }

        private setCurrentJourneyBase = (data: IJourneyDetailVO) => {
            this.currentJourney.parseBaseData(data);
            if (this.currentAlias) {
                this.currentJourney.updateAlias(this.currentAlias);
            }
        }

        private setCurrentJourney = (data: IJourneyDetailVO) => {
            this.currentJourney.parseJson(data);
            this.currentJourney.updateLinks();
            if (this.currentAlias) {
                this.currentJourney.updateFromAlias(this.currentAlias);
            }
        }

        getCurrentJourney(id ?: string): JourneyDetailVO {
            if (id) {
                if (this.currentJourney.id !== id) {
                    this.currentJourney.invalidateData();
                }
                this.journeyService.getJourney(id).then(this.setCurrentJourney);
            }
            return this.currentJourney;
        }

        createJourney(journey): IPromise < void > {
            return this.journeyService.createJourney(journey, this.currentAlias.id).then(this.setCurrentJourneyBase);
        }

        updateJourney(journey): IPromise < void > {
            var updateJourney: JourneyBaseVO = new JourneyBaseVO(journey);
            updateJourney.alias = undefined;
            return this.journeyService.updateJourney(updateJourney).then(this.setCurrentJourneyBase);
        }

        getJourney(id): IJourneyDetailVO {
            if (!id) {
                return new JourneyDetailVO();
            }
            if (id === this.currentJourney.id) {
                return this.currentJourney;
            }
            var journey: JourneyDetailVO = new JourneyDetailVO();
            this.journeyService.getJourney(id).then(
                (data: IJourneyDetailVO) => {
                    journey.parseJson(data);
                });
            return journey;
        }

        refreshJourney(currentAlias: AliasDetailVO) {
            this.currentAlias = currentAlias;
            if (!this.currentJourney.id) {
                return;
            }
            this.currentJourney.updateFromAlias(this.currentAlias);
        }

        followJourney(journey ?: IJourneyDetailVO): IPromise < any > {
            if (!journey) {
                journey = this.currentJourney;
            }
            var alias: AliasDetailVO = this.currentAlias;
            return this.journeyActionService.followJourney(journey.id, this.currentAlias.id)
                .then(function () {
                    if (!journey.followers) {
                        journey.followers = [];
                    }
                    journey.followers.push(alias);
                    journey.isFollowing = true;
                });
        }

        unfollowJourney(journey ?: IJourneyDetailVO) {
            if (!journey) {
                journey = this.currentJourney;
            }
            var alias: AliasDetailVO = this.currentAlias;
            return this.journeyActionService.unfollowJourney(journey.id, this.currentAlias.id)
                .then(function () {
                    var index, len;
                    for (index = 0, len = journey.followers.length; index < len; ++index) {
                        if (journey.followers[index].id === alias.id) {
                            break;
                        }
                    }
                    journey.followers.splice(index, 1);
                    journey.isFollowing = false;
                });
        }

        linkJourney(userLinkJourney: JourneyBaseVO, journey ?: JourneyDetailVO) {
            if (!journey) {
                journey = this.currentJourney;
            }
            return this.journeyActionService.linkJourney(userLinkJourney.id, journey.id)
                .then(function () {
                    journey.linkedFromJourneys.push(userLinkJourney);
                    if (!journey.joinedLinkedJourneys) {
                        journey.joinedLinkedJourneys = [];
                    }
                    journey.updateLinks();
                    journey.aliasJourneyLink = userLinkJourney;
                });
        }

        linkBackJourney(userLinkJourney: JourneyDetailVO, journey: JourneyBaseVO) {
            if (userLinkJourney.id === this.currentJourney.id) {
                userLinkJourney = this.currentJourney;
            }
            return this.journeyActionService.linkJourney(userLinkJourney.id, journey.id).then(
                function () {
                    userLinkJourney.linkedToJourneys.push(journey);
                    userLinkJourney.updateLinks();
                }
            );
        }

        unlinkJourney(journey: JourneyDetailVO, userLinkJourney: IJourneyBaseVO) {
            return this.journeyActionService.unlinkJourney(userLinkJourney.id, journey.id).then(
                function (data: IJourneyDetailVO) {
                    journey.linkedToJourneys = data.linkedToJourneys;
                    journey.linkedFromJourneys = data.linkedFromJourneys;
                    journey.updateLinks();

                    journey.aliasJourneyLink = undefined;
                }
            );
        }

        requestJoin(journey: JourneyDetailVO) {
            var alias: AliasDetailVO = this.currentAlias;
            return this.journeyActionService.requestJoin(journey.id, this.currentAlias.id).then(
                function () {
                    journey.joinRequests.push(alias);
                    journey.sendRequest = true;
                }
            );
        }

        leaveJourney(journey: JourneyDetailVO) {
            var alias: AliasDetailVO = this.currentAlias;
            var updateLeaveJourney = this.updateLeaveJourney;
            return this.journeyActionService.leaveJourney(journey.id, this.currentAlias.id).then(
                function () {
                    updateLeaveJourney(journey, alias.id);
                    for (var i: number = 0; i < alias.joinedJourneys.length; i++) {
                        if (alias.joinedJourneys[i].id == journey.id) {
                            break;
                        }
                    }
                    alias.joinedJourneys.splice(i, 1);
                }
            );
        }

        removeJoinedAlias(alias: AliasBaseVO) {
            var journey: JourneyDetailVO = this.currentJourney;
            var updateLeaveJourney = this.updateLeaveJourney;
            return this.journeyActionService.leaveJourney(this.currentJourney.id, alias.id).then(
                function () {
                    updateLeaveJourney(journey, alias.id);
                }
            );
        }

        updateLeaveJourney = (journey: JourneyDetailVO, aliasId: string) => {
            for (var i: number = 0; i < journey.joinedAliases.length; i++) {
                if (journey.joinedAliases[i].id == aliasId) {
                    break;
                }
            }
            journey.joinedAliases.splice(i, 1);
            journey.isJoined = false;
        }

        acceptJoinRequest(requester: AliasBaseVO) {
            var journey: JourneyDetailVO = this.currentJourney;
            return this.journeyActionService.acceptJoinRequest(journey.id, requester.id).then(
                function () {
                    for (var i: number = 0; i < journey.joinRequests.length; i++) {
                        if (journey.joinRequests[i].id == requester.id) {
                            break;
                        }
                    }
                    journey.joinRequests.splice(i, 1);
                    journey.joinedAliases.push(requester);
                }
            );
        }
    }
}