///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\const\ErrorConst.ts"/>
///<reference path="..\..\..\common\ctrl\BaseController.ts"/>
module jm.auth.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import ErrorConst = jm.common.ErrorConst;
    import BaseController = jm.common.BaseController;

    export interface IAuthBarScope extends ng.IScope {
        errors: string[];
    }

    export class AuthBarController extends BaseController {

        static $inject: string[] = [NGConst.$SCOPE];
        static NG_NAME: string = 'AuthBarController';

        constructor($scope: IAuthBarScope) {
            super($scope);
            $scope.errors = [
                ErrorConst.CLIENT_SERVER_PROBLEM,
                ErrorConst.INTERNAL_SYSTEM_PROBLEM,
                ErrorConst.POOL_EXHAUSTED,
                ErrorConst.UPSTREAM_SYSTEM_PROBLEM];
        }
    }
}
