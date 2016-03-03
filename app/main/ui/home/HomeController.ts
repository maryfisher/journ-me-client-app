///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\model\PageVO.ts"/>
///<reference path="..\..\dao\HomeDAO.ts"/>
module jm.main.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import IPage = jm.common.IPage;
    import PageVO = jm.common.PageVO;
    import PageRequestVO = jm.common.PageRequestVO;
    import JourneyDAO = jm.journey.JourneyDAO;
    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;
    import MomentDAO = jm.moment.MomentDAO;
    import IMomentBaseVO = jm.moment.IMomentBaseVO;

    export class HomeController extends jm.common.BaseController {

        static NG_NAME: string = 'HomeController';

        static $inject = [NGConst.$SCOPE, HomeDAO.NG_NAME, JourneyDAO.NG_NAME, MomentDAO.NG_NAME];

        stats: StatsVO;
        recentMoments: PageVO < IMomentBaseVO>;
        recentJourneys: PageVO < IJourneyBaseVO>;

        constructor(private $scope: ng.IScope, private homeDAO: HomeDAO,
                    private journeyDAO: JourneyDAO,
                    private momentDAO: MomentDAO) {
            super($scope);
            this.stats = homeDAO.getStats();
            journeyDAO.getJourneys(new PageRequestVO(0, 5)).then(this.getJourneysSuccess);
            momentDAO.getMoments(new PageRequestVO()).then(this.getMomentsSuccess);
        }

        private getJourneysSuccess = (data: PageVO < IJourneyBaseVO >) => {
            this.recentJourneys = data;
        };

        private getMomentsSuccess = (data: PageVO < IMomentBaseVO >) => {
            this.recentMoments = data;
        };
    }
}
