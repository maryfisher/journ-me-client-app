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
        allStates: IStateVO[];
        openDatePicker($event);
        isDateOpen: boolean;
    }

    export class MomentEditFormController extends jm.common.BaseController {
        static NG_NAME: string = 'MomentEditFormController';
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS, RouteUtil.NG_NAME, JourneyModel.NG_NAME];

        private unregisterWatchStates: Function;

        constructor(private $scope: IMomentEditScope, private momentModel: MomentModel, private $stateParams: angular.ui.IStateParamsService, private routeUtil: RouteUtil, journeyModel: JourneyModel) {
            super($scope);
            this.addScopeMethods('cancel', 'cancelBlink', 'save', 'saveBlink', 'selectFormat', 'createNewBlink',
                'editBlink', 'isBlinkValid', 'selectState', 'removeState', 'openDatePicker');

            $scope.hasMoment = (!!$stateParams['momentId']);

            this.$scope.allStates = momentModel.getStates();
            this.$scope.missingStates = [];
            $scope.journey = journeyModel.getCurrentJourney();

            if ($scope.hasMoment) {
                $scope.moment = momentModel.getCurrentMoment($stateParams['momentId']);
            } else {
                $scope.moment = new MomentDetailVO();
                $scope.moment.isPublic = $scope.journey.isPublic;
                if (this.$scope.allStates.length === 0) {
                    this.unregisterWatchStates = $scope.$watch('allStates', this.updateMissingStates, true);
                }
            }

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

            this.$scope.isDateOpen = false;
        }

        openDatePicker = ($event) => {
            this.$scope.isDateOpen = true;
        };

        updateMissingStates = () => {
            if (this.$scope.allStates.length > 0) {
                this.$scope.missingStates = this.$scope.allStates.slice();
                this.unregisterWatchStates();
            }
        };

        cancel = () => {
            if (!this.$scope.hasMoment && !this.$scope.moment.id) {
                this.routeUtil.redirectTo(RouteConst.JOURNEY_DETAIL, {
                    journeyId: this.$stateParams['journeyId']
                });
            } else {
                var momentId = this.$scope.moment.id || this.$stateParams['momentId'];
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
            var format: BlinkFormatVO = jm.common.BlinkFormatConst.getFormat(this.$scope.formBlink.blink.format);
            for (var i: number = 0; i < format.textsRequired; i++) {
                if (this.$scope.blinkForm['text' + i] && this.$scope.blinkForm['text' + i].$invalid) {
                    return false;
                }
            }
            for (i = 0; i < format.imagesRequired; i++) {
                if (this.$scope.blinkForm['imageFile' + i]
                    && this.$scope.blinkForm['imageFile' + i].$invalid
                    && !this.$scope.formBlink.blink.images[i]) {
                    return false;
                }
            }
            return true;
        }

        saveBlink = () => {
            if (!this.$scope.hasMoment) {
                this.momentModel.createMoment(this.$scope.moment, this.$stateParams['journeyId']).then(this.createMomentSuccess);
                return;
            }
            if (this.$scope.isNewBlink) {
                this.momentModel.createBlink(this.$scope.formBlink).then(this.reset);
            } else {
                this.momentModel.editBlink(this.$scope.formBlink).then(this.reset);
            }

        };

        reset = () => {
            this.$scope.canEditBlink = this.$scope.isNewBlink = false;
        };

        createMomentSuccess = () => {
            this.$scope.moment = this.momentModel.getCurrentMoment();
            this.momentModel.createBlink(this.$scope.formBlink).then(this.createBlinkSuccess);
        };

        createBlinkSuccess = () => {
            this.$scope.hasMoment = true;
            this.$scope.canEditBlink = false;
        };

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
            this.$scope.missingStates = this.$scope.allStates.slice();
        };

        editBlink = () => {
            var b: BlinkVO = this.$scope.moment.currentBlink;
            this.$scope.formBlink.blink = b;
            this.$scope.canEditBlink = true;
            this.$scope.missingStates.length = 0;
            for (var j: number = 0; j < this.$scope.allStates.length; j++) {
                var add: boolean = true;
                for (var i: number = 0; i < b.states.length; i++) {
                    if (b.states[i].id === this.$scope.allStates[j].id) {
                        add = false;
                        break;
                    }
                }
                if (add) {
                    this.$scope.missingStates.push(this.$scope.allStates[j]);
                }
            }
        };

        getBlink() {
            this.$scope.formBlink.blink = new BlinkVO();
            this.momentModel.getBlinkByIndex(this.$scope.selectedIndex, this.$scope.formBlink.blink);
        }

        selectState = (state: IStateVO) => {
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