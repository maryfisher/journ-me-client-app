/// <reference path="../../../common/interfaces/journey/JourneyJoinEnum.ts" />
module jm {
    export module journey {

        export class JourneyDetailVO extends JourneyBaseVO implements IJourneyDetailVO {

            moments: jm.moment.IMomentBaseVO[] = [];
            followers: jm.user.IAliasBaseVO[] = [];
            linkedToJourneys: IJourneyBaseVO[] = [];
            linkedFromJourneys: IJourneyBaseVO[] = [];

            joinedLinkedJourneys: IJourneyBaseVO[] = [];
            aliasJourneyLink: IJourneyBaseVO;
            isFollowing: boolean = false;

            constructor(data ? : IJourneyDetailVO) {
                super(data);
            }

            //maybe put this into super class and loop over properties to set them
            parseData(data: IJourneyDetailVO) {
                super.parseData(data);
                //TODO make sure to not overwrite if the properties are not set
                this.moments = data.moments;
                this.followers = data.followers;
                this.linkedToJourneys = data.linkedToJourneys;
                this.linkedFromJourneys = data.linkedFromJourneys;
            }

            invalidateData() {
                super.invalidateData();
                this.moments.length = 0;
                this.followers.length = 0;
                this.linkedToJourneys.length = 0;
                this.linkedFromJourneys.length = 0;
                this.joinedLinkedJourneys.length = 0;
                this.aliasJourneyLink = undefined;
                this.isFollowing = false;
            }
        }
    }
}