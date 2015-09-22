module jm.journey {

    import IPromise = ng.IPromise;

    export class JourneyActionDAO extends jm.common.BaseHttpDAO {

        static NG_NAME: string = 'journeyActionDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
        }

        followJourney(journeyId: string, aliasId: string): IPromise < any > {
            return this.$http.post('/api/journey/' + journeyId + '/follow/' + aliasId, {});
        }

        unfollowJourney(journeyId: string, aliasId: string): IPromise < any > {
            return this.$http.post('/api/journey/' + journeyId + '/unfollow/' + aliasId, {});
        }

        linkJourney(linkedJourneyId: string, journeyId: string): IPromise < any > {
            return this.$http.post('/api/journey/' + journeyId + '/link/' + linkedJourneyId, {});
        }

        unlinkJourney(linkedJourneyId: string, journeyId: string): IPromise < any > {
            return this.$http.post('/api/journey/' + journeyId + '/unlink/' + linkedJourneyId, {});
        }

        requestJoin(journeyId: string, aliasId: string): IPromise < any > {
            return this.$http.post('/api/journey/' + journeyId + '/join/' + aliasId, {});
        }

        leaveJourney(journeyId: string, aliasId: string): IPromise < any > {
            return this.$http.post('/api/journey/' + journeyId + '/unjoin/' + aliasId, {});
        }

        acceptJoinRequest(journeyId: string, aliasId: string): IPromise < any > {
            return this.$http.post('/api/journey/' + journeyId + '/accept/' + aliasId, {});
        }
    }
}