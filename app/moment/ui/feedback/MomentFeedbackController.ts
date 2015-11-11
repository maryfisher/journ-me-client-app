/// <reference path="../../model/MomentModel.ts" />
module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import AliasModel = jm.user.AliasModel;
    import AliasDetailVO = jm.user.AliasDetailVO;

    export interface IMomentFeedbackScope extends ng.IScope {
        alias: AliasDetailVO;
        moment: MomentDetailVO;
        addFeedback();
        feedback: FeedbackVO;
        feedbackForm: ng.IFormController;
    }

    export class MomentFeedbackController extends jm.common.BaseController {
        static NG_NAME: string = 'MomentFeedbackController';
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, AliasModel.NG_NAME];

        constructor(private $scope: IMomentFeedbackScope, private momentModel: MomentModel, private aliasModel: AliasModel) {
            super($scope);
            $scope.alias = this.aliasModel.getCurrentAlias();
            $scope.moment = this.momentModel.getCurrentMoment();
            $scope.feedback = new FeedbackVO();
            //this.momentModel.getFeedback();
            this.addScopeMethods('addFeedback', 'canSendFeedback', 'selectState', 'removeState');
        }

        addFeedback = () => {
            if (this.$scope.feedbackForm.$valid) {
                this.momentModel.createFeedback(this.$scope.feedback);
            }
        };

        canSendFeedback = (): boolean => {
            if (this.$scope.feedbackForm.$invalid) {
                return false;
            }
            if (this.$scope.feedback.states.length === 0) {
                return false;
            }

            return true;
        };

        selectState = (state: IStateVO) => {
            this.$scope.feedback.states.push(state);
        };

        removeState = (state: IStateVO) => {
            this.$scope.feedback.states.splice(this.$scope.feedback.states.indexOf(state), 1);
        };
    }
}