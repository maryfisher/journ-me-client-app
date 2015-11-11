/// <reference path="../../model/AliasModel.ts" />
module jm.user.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export interface IAliasDetailScope extends ng.IScope {
        alias: IAliasDetailVO;
    }

    export class AliasDetailController extends jm.common.BaseController {

        static NG_NAME: string = 'AliasDetailController';
        static $inject = [NGConst.$SCOPE, AliasModel.NG_NAME, NGConst.$STATE_PARAMS];

        constructor(private $scope: IAliasDetailScope, private aliasModel: AliasModel, private $stateParams: angular.ui.IStateParamsService) {
            super($scope);
            $scope.alias = this.aliasModel.getAlias($stateParams['aliasId']);
        }
    }

}