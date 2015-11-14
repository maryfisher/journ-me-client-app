///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\model\AliasModel.ts"/>
///<reference path="..\..\..\moment\model\FeedbackVO.ts"/>
module jm.user.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import FeedbackVO = jm.moment.FeedbackVO;

    export interface IDashboardScope extends ng.IScope {
        alias: AliasDetailVO;
        dashboard: DashboardVO;
    }

    export class DashboardController extends jm.common.BaseController {
        static NG_NAME: string = 'DashboardController';
        static $inject = [NGConst.$SCOPE, AliasModel.NG_NAME];

        constructor(private $scope: IDashboardScope, private aliasModel: AliasModel) {
            super($scope);
            $scope.alias = this.aliasModel.getCurrentAlias();
            $scope.dashboard = this.aliasModel.getDashboard();
        }
    }
}