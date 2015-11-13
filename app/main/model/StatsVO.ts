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
        recentMoments: MomentDetailVO[];
        recentJourneys: JourneyBaseVO[];
    }

    export class StatsVO implements IStatsVO {
        allJourneys: number;
        allMoments: number;
        allLinks: number;
        allJoined: number;
        allFollowers: number;
        allFeedbacks: number;
        recentMoments: MomentDetailVO[];
        recentJourneys: JourneyBaseVO[];

        constructor() {
        }

        parseData(data: IStatsVO) {
            this.allJourneys = data.allJourneys;
            this.allMoments = data.allMoments;
            this.allLinks = data.allLinks;
            this.allJoined = data.allJoined;
            this.allFollowers = data.allFollowers;
            this.allFeedbacks = data.allFeedbacks;

            this.recentMoments = [];
            for (var i: number = 0; i < data.recentMoments.length; i++) {
                this.recentMoments.push(new MomentDetailVO(data.recentMoments[i]));
            }

            this.recentJourneys = [];
            for (i = 0; i < data.recentJourneys.length; i++) {
                this.recentJourneys.push(new JourneyBaseVO(data.recentJourneys[i]));
            }
        }
    }
}
