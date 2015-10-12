/// <reference path="../../../journey/model/JourneyModel.ts" />
module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import RouteConst = jm.common.RouteConst;
    import RouteUtil = jm.common.RouteUtil;
    import JourneyModel = jm.journey.JourneyModel;
    import IJourneyDetailVO = jm.journey.IJourneyDetailVO;
    import IFormController = ng.IFormController;

    export interface IMomentEditScope extends IMomentDetailScope {
        hasMoment: boolean;
        cancel();
        save();
        saveBlink();
        cancelBlink();
        createNewBlink();
        editBlink();
        isBlinkValid();
        selectFormat(format: number);
        journey: IJourneyDetailVO;
        formBlink: BlinkFormVO;
        selectedIndex: number;
        canEditBlink: boolean;
        formats: number[];
        momentForm: IFormController;
        blinkForm: IFormController;
        missingStates: IStateVO[];
        isNewBlink: boolean;
        selectedFeel: IStateVO;
        selectFeel(state: IStateVO);
        removeState(state: IStateVO);
    }

    export class MomentEditFormController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS, RouteUtil.NG_NAME, JourneyModel.NG_NAME];

        private allStates: IStateVO[];

        constructor(private $scope: IMomentEditScope, private momentModel: MomentModel, private $stateParams: angular.ui.IStateParamsService, private routeUtil: RouteUtil, journeyModel: JourneyModel) {
            super($scope);
            this.addScopeMethods('cancel', 'cancelBlink', 'save', 'saveBlink', 'selectFormat', 'createNewBlink',
                'editBlink', 'isBlinkValid', 'selectFeel', 'removeState');

            $scope.hasMoment = (!!$stateParams['momentId']);

            if ($scope.hasMoment) {
                $scope.moment = momentModel.getCurrentMoment($stateParams['momentId']);
            } else {
                $scope.journey = journeyModel.getCurrentJourney();
                $scope.moment = new MomentDetailVO();
                $scope.moment.isPublic = $scope.journey.isPublic;
            }

            this.allStates = momentModel.getStates();
            this.$scope.missingStates = [];

            $scope.formBlink = new BlinkFormVO();
            if ($scope.moment.blinks.length !== 0) {
                this.$scope.selectedIndex = 0;
                this.getBlink();
            } else {
                this.createNewBlink();
            }

            $scope.formats = [];
            var i: number = 0;
            for (var item in BlinkFormatEnum) {
                if (/^\d+$/.test(item)) {
                    $scope.formats.push(i);
                    i++;
                }
            }
        }

        cancel = () => {
            if (!this.$scope.hasMoment && !this.$scope.moment._id) {
                this.routeUtil.redirectTo(RouteConst.JOURNEY_DETAIL, {
                    journeyId: this.$stateParams['journeyId']
                });
            } else {
                var momentId = this.$scope.moment._id || this.$stateParams['momentId'];
                this.routeUtil.redirectTo(RouteConst.MOMENT_BLINKS, {
                    journeyId: this.$stateParams['journeyId'],
                    momentId: momentId
                });
            }
        }

        save = () => {
            this.momentModel.updateMoment(this.$scope.moment).then(this.cancel);
        }

        isBlinkValid = (): boolean => {
            if (this.$scope.formBlink.blink.states.length === 0) {
                return false;
            }
            if (!this.$scope.blinkForm) {
                return false;
            }
            if (this.$scope.blinkForm.$valid) {
                return true;
            }
            if (this.$scope.blinkForm['imageFile0'] && !this.$scope.formBlink.blink.images[0]) {
                return false;
            }
            if (this.$scope.blinkForm['imageFile1'] && !this.$scope.formBlink.blink.images[1]) {
                return false;
            }
            if (this.$scope.blinkForm['text0'] && this.$scope.blinkForm['text0'].$invalid) {
                return false;
            }
            if (this.$scope.blinkForm['text1'] && this.$scope.blinkForm['text1'].$invalid) {
                return false;
            }
            return true;
        }

        saveBlink = () => {
            if (!this.$scope.hasMoment) {
                this.momentModel.createMoment(this.$scope.moment, this.$stateParams['journeyId']).then(this.createMomentSuccess);
                return;
            }
            if (this.$scope.isNewBlink) {
                this.momentModel.createBlink(this.$scope.formBlink);
            } else {
                this.momentModel.editBlink(this.$scope.formBlink);
            }
            this.$scope.canEditBlink = this.$scope.isNewBlink = false;
        }

        createMomentSuccess = () => {
            this.$scope.moment = this.momentModel.getCurrentMoment();
            this.momentModel.createBlink(this.$scope.formBlink).then(this.createBlinkSuccess);
        }

        createBlinkSuccess = () => {
            this.$scope.hasMoment = true;
            this.$scope.canEditBlink = false;
        }

        cancelBlink = () => {
            if (!this.$scope.hasMoment) {
                this.cancel();
                return;
            }
            if (this.$scope.moment.blinks.length > 0) {
                this.$scope.canEditBlink = this.$scope.isNewBlink = false;
            }
        }

        selectFormat = (format: number) => {
            this.$scope.formBlink.blink.format = format;
        }

        createNewBlink = () => {
            this.$scope.formBlink.blink = new BlinkVO();
            this.$scope.canEditBlink = true;
            this.$scope.formBlink.imageFiles.length = 0;
            this.$scope.isNewBlink = true;
            this.$scope.selectedIndex = this.$scope.moment.blinks.length;
        };

        editBlink = () => {
            var b: BlinkVO = this.$scope.moment.currentBlink;
            this.$scope.formBlink.blink = b;
            this.$scope.canEditBlink = true;
            this.$scope.missingStates.length = 0;
            for (var j: number = 0; j < this.allStates.length; j++) {
                var add: boolean = true;
                for (var i: number = 0; i < b.states.length; i++) {
                    if (b.states[i]._id === this.allStates[j]._id) {
                        add = false;
                        break;
                    }
                }
                if (add) {
                    this.$scope.missingStates.push(this.allStates[j]);
                }
            }
        };

        getBlink() {
            this.$scope.formBlink.blink = new BlinkVO();
            this.momentModel.getBlinkByIndex(this.$scope.selectedIndex, this.$scope.formBlink.blink);
        }

        selectFeel = (state: IStateVO) => {
            this.$scope.formBlink.blink.states.push(state);
            this.$scope.missingStates.splice(this.$scope.missingStates.indexOf(state), 1);
            this.$scope.selectedFeel = undefined;
        }

        removeState = (state: IStateVO) => {
            this.$scope.missingStates.push(state);
            this.$scope.formBlink.blink.states.splice(this.$scope.formBlink.blink.states.indexOf(state), 1);
        }
    }
}