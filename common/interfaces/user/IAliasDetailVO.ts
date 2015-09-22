/// <reference path="../journey/IJourneyBaseVO.ts" />
module jm.user {

    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;

    export interface IAliasDetailVO extends IAliasBaseVO {
        journeys: IJourneyBaseVO[];
        followedJourneys: IJourneyBaseVO[];
        joinedJourneys: IJourneyBaseVO[];
    }
}