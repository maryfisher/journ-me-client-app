module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import RouteConst = jm.common.RouteConst;

    export interface IMomentDetailScope extends ng.IScope {
        moment: MomentDetailVO;
        showSlides(): boolean;
        allStates: IStateVO[];
        missingStates: IStateVO[];
    }
    export class MomentDetailController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS, NGConst.$STATE];

        private unregisterWatchStates: Function;

        constructor(private $scope: IMomentDetailScope,
                    private momentModel: MomentModel,
                    $stateParams: angular.ui.IStateParamsService,
                    private $state: angular.ui.IStateService) {
            super($scope);
            $scope.missingStates = [];
            $scope.moment = this.momentModel.getCurrentMoment($stateParams['momentId']);
            this.addScopeMethods('showsSlides', 'addFeedback');

            this.$scope.allStates = momentModel.getStates();
            if (this.$scope.allStates.length === 0) {
                this.unregisterWatchStates = $scope.$watch('allStates', this.updateMissingStates, true);
            }

            $scope.$watch('moment', this.updateMoment, true);
        }

        updateMissingStates = () => {
            if (this.$scope.allStates.length > 0) {
                this.updateMoment();
                this.unregisterWatchStates();
            }
        };

        updateMoment = () => {
            if (this.$scope.allStates.length > 0) {
                if (this.$scope.moment.states.length === 0) {
                    this.$scope.missingStates = this.$scope.allStates.slice();
                    return;
                }
                this.$scope.missingStates.length = 0;
                for (var j: number = 0; j < this.$scope.allStates.length; j++) {
                    var add: boolean = true;
                    for (var i: number = 0; i < this.$scope.moment.states.length; i++) {
                        if (this.$scope.moment.states[i].state.id === this.$scope.allStates[j].id) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        this.$scope.missingStates.push(this.$scope.allStates[j]);
                    }
                }
            }
        };

        showsSlides = (): boolean => {
            return this.$state.includes(RouteConst.MOMENT_BLINKS);
        };

        addFeedback = (state: IStateVO) => {
            var f: FeedbackVO = new FeedbackVO();
            f.states.push(state);
            console.log(state);
            this.momentModel.createFeedback(f);
        };
    }
}