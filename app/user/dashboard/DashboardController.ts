/// <reference path="../model/AliasModel.ts" />
module jm {
    export module auth {
        'use strict';
        export module ctrl {

            import AliasModel = jm.user.AliasModel;
            import AliasVO = jm.user.AliasVO;
            import NGConst = jm.common.NGConst;

            export interface IDashboardScope extends ng.IScope {
                alias: AliasVO;
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