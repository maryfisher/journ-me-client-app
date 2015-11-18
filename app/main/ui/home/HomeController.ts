///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\dao\HomeDAO.ts"/>
module jm.main.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export interface IHomeScope extends ng.IScope {
        stats: StatsVO;
    }

    export class HomeController extends jm.common.BaseController {

        static NG_NAME: string = 'HomeController';

        static $inject = [NGConst.$SCOPE, HomeDAO.NG_NAME];

        constructor(private $scope: IHomeScope, private homeDAO: HomeDAO) {
            super($scope);
            $scope.stats = homeDAO.getStats();
        }
    }
}
