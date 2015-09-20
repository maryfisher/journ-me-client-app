/// <reference path="../../model/AliasModel.ts" />
module jm {
    export module user {
        'use strict';
        export module ctrl {

            import NGConst = jm.common.NGConst;

            export interface IDashboardScope extends ng.IScope {
                alias: AliasDetailVO;
            }

            export class DashboardController extends jm.common.BaseController {
                static $inject = [NGConst.$SCOPE, AliasModel.NG_NAME];

                constructor(private $scope: IDashboardScope, private aliasModel: AliasModel) {
                    super($scope);
                    $scope.alias = this.aliasModel.getCurrentAlias();
                }
            }
        }
    }

}