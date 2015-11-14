///<reference path="..\..\common\const\ServerConst.ts"/>
///<reference path="..\..\common\const\NGConst.ts"/>
module jm.main {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;

    export class HomeDAO extends jm.common.BaseHttpDAO {

        static NG_NAME: string = 'homeDAO';

        private homeStats: StatsVO;

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
    }
}
