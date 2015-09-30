/// <reference path="../../model/MomentModel.ts" />
module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import AliasModel = jm.user.AliasModel;
    import AliasDetailVO = jm.user.AliasDetailVO;

    export interface IMomentEmpathiesScope extends ng.IScope {
        alias: AliasDetailVO;
        moment: MomentDetailVO;
        addEmpathy();
        empathy: string;
        empathyForm: ng.IFormController;
    }

    export class MomentEmpathiesController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, AliasModel.NG_NAME];

        constructor(private $scope: IMomentEmpathiesScope, private momentModel: MomentModel, private aliasModel: AliasModel) {
            super($scope);
            $scope.alias = this.aliasModel.getCurrentAlias();
            $scope.moment = this.momentModel.getCurrentMoment();
            this.momentModel.getEmpathies();
            this.addScopeMethod('addEmpathy');
        }

        addEmpathy() {
            if (this.$scope.empathyForm.$valid) {
                this.momentModel.createEmpathy(this.$scope.empathy);
            }
        }
    }
}