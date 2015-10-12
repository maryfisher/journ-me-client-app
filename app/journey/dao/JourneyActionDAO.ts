module jm.journey {

    import IPromise = ng.IPromise;
    import ServerConst = jm.common.ServerConst;

    export class JourneyActionDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'journeyActionDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);

            this.path = ServerConst.JOURNEY_PATH;
        }

        returnJourney = (response): IJourneyDetailVO => {
            return response.data;
        };

        followJourney(journeyId: string, aliasId: string): IPromise < void > {
            return this.makeCall(this.post, this.getId(journeyId) + '/follow/' + aliasId);
        }

        unfollowJourney(journeyId: string, aliasId: string): IPromise < void > {
            return this.makeCall(this.post, this.getId(journeyId) + '/unfollow/' + aliasId);
        }

        linkJourney(linkedJourneyId: string, journeyId: string): IPromise < void > {
            return this.makeCall(this.post, this.getId(journeyId) + '/link/' + linkedJourneyId);
        }

        unlinkJourney(linkedJourneyId: string, journeyId: string): IPromise < IJourneyDetailVO > {
            return this.makeCall(this.post,
                this.getId(journeyId) + '/unlink/' + linkedJourneyId,
                null,
                this.returnJourney);
        }

        requestJoin(journeyId: string, aliasId: string): IPromise < void > {
            return this.makeCall(this.post, this.getId(journeyId) + '/join/' + aliasId);
        }

        leaveJourney(journeyId: string, aliasId: string): IPromise < void > {
            return this.makeCall(this.post, this.getId(journeyId) + '/unjoin/' + aliasId);
        }

        acceptJoinRequest(journeyId: string, aliasId: string): IPromise < void > {
            return this.makeCall(this.post, this.getId(journeyId) + '/accept/' + aliasId);
        }
    }
}