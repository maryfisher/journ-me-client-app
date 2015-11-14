/// <reference path="../../journey/model/JourneyBaseVO.ts" />
module jm.user {

    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;
    import JourneyBaseVO = jm.journey.JourneyBaseVO;

    export interface IAliasDetailVO extends IAliasBaseVO {
        journeys: JourneyBaseVO[];
        followedJourneys: JourneyBaseVO[];
        joinedJourneys: JourneyBaseVO[];
    }

    export class AliasDetailVO extends AliasBaseVO implements IAliasDetailVO {
        journeys: JourneyBaseVO[] = [];
        followedJourneys: JourneyBaseVO[] = [];
        joinedJourneys: JourneyBaseVO[] = [];

        constructor(data ?: IAliasDetailVO) {
            super(data);
        }

        parseJson(data: IAliasDetailVO) {
            super.parseJson(data);
            this.parseDetailData(data);
        }

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

        updateJourneys(journey: JourneyBaseVO) {
            for (var i: number = 0; i < this.journeys.length; i++) {
                if (this.journeys[i].id === journey.id) {
                    this.journeys[i] = new JourneyBaseVO(journey);
                }
            }
        }
    }
}