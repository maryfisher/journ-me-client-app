/// <reference path="../journey/IJourneyBaseVO.ts" />
module jm {
    export module user {

        import IJourneyBaseVO = jm.journey.IJourneyBaseVO;

        export interface IAliasDetailVO extends IAliasBaseVO {
            journeys: IJourneyBaseVO[];
            followedJourneys: IJourneyBaseVO[];
        }
    }
}