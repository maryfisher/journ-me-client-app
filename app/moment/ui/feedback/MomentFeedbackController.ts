/// <reference path="../../model/MomentModel.ts" />
module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import AliasModel = jm.user.AliasModel;
    import AliasDetailVO = jm.user.AliasDetailVO;

    export interface IMomentFeedbackScope extends ng.IScope {
        alias: AliasDetailVO;
        moment: MomentDetailVO;
        addFeedback();
        feedback: string;
        feedbackForm: ng.IFormController;
    }

    export class MomentFeedbackController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, AliasModel.NG_NAME];

        constructor(private $scope: IMomentFeedbackScope, private momentModel: MomentModel, private aliasModel: AliasModel) {
            super($scope);
            $scope.alias = this.aliasModel.getCurrentAlias();
            $scope.moment = this.momentModel.getCurrentMoment();
            this.momentModel.getFeedback();
            this.addScopeMethods('addFeedback');
        }

        addFeedback = () => {
            if (this.$scope.feedbackForm.$valid) {
                this.momentModel.createFeedback(this.$scope.feedback);
            }
        }
    }
}