/// <reference path="../user/IAliasBaseVO.ts" />
/// <reference path="../moment/IMomentBaseVO.ts" />
module jm.journey {
    export interface IJourneyDetailVO extends IJourneyBaseVO {
        joinedAliases: jm.user.IAliasBaseVO[];
        joinRequests: jm.user.IAliasBaseVO[];
        moments: jm.moment.IMomentBaseVO[];
        followers: jm.user.IAliasBaseVO[];
        linkedToJourneys: IJourneyBaseVO[];
        linkedFromJourneys: IJourneyBaseVO[];
        joinedLinkedJourneys: IJourneyBaseVO[];
        aliasJourneyLink: IJourneyBaseVO;
        isFollowing: boolean;
        isAlias: boolean;

    }
}