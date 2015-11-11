///<reference path="..\..\journey\model\JourneyBaseVO.ts"/>
///<reference path="..\..\moment\model\MomentBaseVO.ts"/>
///<reference path="..\..\common\const\ServerConst.ts"/>
///<reference path="..\..\common\const\NGConst.ts"/>
module jm.main {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;
    import JourneyBaseVO = jm.journey.JourneyBaseVO;
    import MomentBaseVO = jm.moment.MomentBaseVO;

    export class HomeDAO extends jm.common.BaseHttpDAO {

        static NG_NAME: string = 'homeDAO';

        private homeStats: StatsVO;
        private recentJourneys: JourneyBaseVO[];
        private recentMoments: MomentBaseVO[];

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
        }

        parseStats = (response) => {
            this.homeStats.parseData(response.data);
        };

        getStats(): StatsVO {
            if (!this.homeStats) {
                this.homeStats = new StatsVO();
                this.makeCall(this.get, ServerConst.STATS_PATH, null, this.parseStats);
            }

            return this.homeStats;
        }

        getRecentJourneys(): JourneyBaseVO[] {
            if (!this.recentJourneys) {
                this.recentJourneys = [];
                //this.makeCall(this.get, ServerConst.STATS_PATH, null).then(this.parseJourneys);
            }
            return this.recentJourneys;
        }

        getRecentMoments(): MomentBaseVO[] {
            if (!this.recentMoments) {
                this.recentMoments = [];
                //this.makeCall(this.get, ServerConst.STATS_PATH, null).then(this.parseMoments);
            }
            return this.recentMoments;
        }
    }
}
