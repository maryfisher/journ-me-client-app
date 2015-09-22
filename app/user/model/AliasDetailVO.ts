/// <reference path="../../../common/interfaces/journey/IJourneyBaseVO.ts" />
module jm.user {

    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;

    export class AliasDetailVO extends AliasBaseVO implements IAliasDetailVO {
        journeys: IJourneyBaseVO[] = [];
        followedJourneys: IJourneyBaseVO[] = [];
        joinedJourneys: IJourneyBaseVO[] = [];

        constructor(data ? : IAliasDetailVO) {
            super(data);
            if (data) {
                this.parseData(data);
            }
        }

        //maybe put this into super class and loop over properties to set them
        parseData(data: IAliasDetailVO) {
            super.parseData(data);
            this.journeys = data.journeys;
            this.followedJourneys = data.followedJourneys;
            this.joinedJourneys = data.joinedJourneys;
        }

        invalidateData() {
            super.invalidateData();
            this.journeys.length = 0;
            this.followedJourneys.length = 0;
            this.joinedJourneys.length = 0;
        }
    }
}