/**
 * Created by Ulli on 10.11.2015.
 */
module jm.main {
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
