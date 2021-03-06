///<reference path="..\..\common\const\ServerConst.ts"/>
module jm.journey {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import IPromise = ng.IPromise;
    import IHttpPromiseCallbackArg = ng.IHttpPromiseCallbackArg;

    export class JourneyActionDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'journeyActionDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);

            this.path = ServerConst.JOURNEY_PATH;
        }

        returnJourney = (response: IHttpPromiseCallbackArg<IJourneyDetailVO>): IJourneyDetailVO => {
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
            return this.makeCall(this.post, this.getId(journeyId) + '/requestJoin/' + aliasId);
        }

        leaveJourney(journeyId: string, aliasId: string): IPromise < void > {
            return this.makeCall(this.post, this.getId(journeyId) + '/removeJoin/' + aliasId);
        }

        acceptJoinRequest(journeyId: string, aliasId: string): IPromise < void > {
            return this.makeCall(this.post, this.getId(journeyId) + '/acceptJoin/' + aliasId);
        }
    }
}