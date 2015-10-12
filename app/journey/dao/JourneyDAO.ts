module jm.journey {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;

    export class JourneyDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'journeyDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.path = ServerConst.JOURNEY_PATH;
        }

        returnJourney = (response): IJourneyDetailVO => {
            return response.data;
        };

        returnBaseJourney = (response): IJourneyBaseVO => {
            return response.data;
        };

        getJourney(id): IPromise < IJourneyDetailVO > {
            return this.getOne(id, this.returnJourney);
        }

        createJourney(journey: JourneyBaseVO): IPromise < IJourneyBaseVO > {
            return this.create(journey, this.returnBaseJourney);
        }

        updateJourney(journey: JourneyBaseVO): IPromise < IJourneyBaseVO > {
            return this.update(journey, this.returnBaseJourney);
        }
    }
}