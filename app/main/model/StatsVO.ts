///<reference path="..\..\moment\model\MomentDetailVO.ts"/>
///<reference path="..\..\journey\model\JourneyBaseVO.ts"/>
module jm.main {

    import MomentDetailVO = jm.moment.MomentDetailVO;
    import JourneyBaseVO = jm.journey.JourneyBaseVO;

    export interface IStatsVO {
        allJourneys: number;
        allMoments: number;
        allLinks: number;
        allJoined: number;
        allFollowers: number;
        allFeedbacks: number;
    }

    export class StatsVO implements IStatsVO {
        allJourneys: number;
        allMoments: number;
        allLinks: number;
        allJoined: number;
        allFollowers: number;
        allFeedbacks: number;

        constructor() {
        }

        parseData(data: IStatsVO) {
            this.allJourneys = data.allJourneys;
            this.allMoments = data.allMoments;
            this.allLinks = data.allLinks;
            this.allJoined = data.allJoined;
            this.allFollowers = data.allFollowers;
            this.allFeedbacks = data.allFeedbacks;
        }
    }
}
