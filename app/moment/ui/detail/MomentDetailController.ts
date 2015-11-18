///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\const\RouteConst.ts"/>
///<reference path="..\..\..\common\const\JMConfigConst.ts"/>
///<reference path="..\..\model\MomentModel.ts"/>
///<reference path="..\..\model\StateVO.ts"/>
///<reference path="..\..\model\MomentDetailVO.ts"/>
///<reference path="..\..\model\FeedbackVO.ts"/>
module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import RouteConst = jm.common.RouteConst;
    import JMConfigConst = jm.common.JMConfigConst;

    export interface IMomentDetailScope extends ng.IScope {
        moment: MomentDetailVO;
        showSlides(): boolean;
        allStates: IStateVO[];
        missingStates: IStateVO[];
    }
    export class MomentDetailController extends jm.common.BaseController {
        static NG_NAME: string = 'MomentDetailController';
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS, NGConst.$STATE,
            JMConfigConst.STATES];

        private unregisterWatchStates: Function;

        constructor(private $scope: IMomentDetailScope,
                    private momentModel: MomentModel,
                    $stateParams: angular.ui.IStateParamsService,
                    private $state: angular.ui.IStateService,
                    private states: IStateVO[]) {
            super($scope);
            $scope.missingStates = [];
            $scope.moment = this.momentModel.getCurrentMoment($stateParams['momentId']);
            this.addScopeMethods('showsSlides', 'addFeedback');

            this.$scope.allStates = this.states;
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
            if (this.states.length > 0) {
                if (this.$scope.moment.states.length === 0) {
                    this.$scope.missingStates = this.states.slice();
                    return;
                }
                this.$scope.missingStates.length = 0;
                for (var j: number = 0; j < this.states.length; j++) {
                    var add: boolean = true;
                    for (var i: number = 0; i < this.$scope.moment.states.length; i++) {
                        if (this.$scope.moment.states[i].state.id === this.states[j].id) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        this.$scope.missingStates.push(this.states[j]);
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