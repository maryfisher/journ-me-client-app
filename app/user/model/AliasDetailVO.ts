/// <reference path="../../../common/interfaces/journey/IJourneyBaseVO.ts" />
module jm {
    export module user {

        import IJourneyBaseVO = jm.journey.IJourneyBaseVO;

        export class AliasDetailVO extends AliasBaseVO implements IAliasDetailVO {
            journeys: IJourneyBaseVO[];
            followedJourneys: IJourneyBaseVO[];

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
            }

            invalidateData() {
                super.invalidateData();
                this.journeys = undefined;
                this.followedJourneys = undefined;
            }
        }
    }
}