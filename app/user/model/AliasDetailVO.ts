/// <reference path="../../journey/model/JourneyBaseVO.ts" />
module jm.user {

    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;
    import JourneyBaseVO = jm.journey.JourneyBaseVO;

    export class AliasDetailVO extends AliasBaseVO implements IAliasDetailVO {
        journeys: IJourneyBaseVO[] = [];
        followedJourneys: IJourneyBaseVO[] = [];
        joinedJourneys: IJourneyBaseVO[] = [];

        constructor(data ?: IAliasDetailVO) {
            super(data);
        }

        parseJson(data: IAliasDetailVO) {
            super.parseJson(data);
            this.parseDetailData(data);
        }

        //maybe put this into super class and loop over properties to set them
        parseDetailData(data: IAliasDetailVO) {
            if (!data) {
                return;
            }
            this.journeys = [];
            for (var i: number = 0; i < data.journeys.length; i++) {
                this.journeys.push(new JourneyBaseVO(data.journeys[i]));
            }
            this.followedJourneys = [];
            for (i = 0; i < data.followedJourneys.length; i++) {
                this.followedJourneys.push(new JourneyBaseVO(data.followedJourneys[i]));
            }

            this.joinedJourneys = [];
            for (i = 0; i < data.joinedJourneys.length; i++) {
                this.joinedJourneys.push(new JourneyBaseVO(data.joinedJourneys[i]));
            }
        }

        invalidateData() {
            super.invalidateData();
            this.journeys.length = 0;
            this.followedJourneys.length = 0;
            this.joinedJourneys.length = 0;
        }
    }
}