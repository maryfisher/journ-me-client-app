///<reference path="..\..\..\common\const\ErrorConst.ts"/>
///<reference path="..\..\..\common\const\JMConfigConst.ts"/>
///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\const\RouteConst.ts"/>
///<reference path="..\..\..\common\util\RouteUtil.ts"/>
///<reference path="..\..\..\journey\model\JourneyModel.ts"/>
///<reference path="..\..\..\journey\model\JourneyDetailVO.ts"/>
///<reference path="..\..\..\common\ctrl\BaseController.ts"/>
///<reference path="..\..\model\MomentModel.ts"/>
///<reference path="..\..\model\MomentDetailVO.ts"/>
///<reference path="..\..\model\BlinkFormVO.ts"/>
///<reference path="..\..\model\BlinkFormatEnum.ts"/>
///<reference path="..\..\..\common\const\BlinkFormatConst.ts"/>
///<reference path="..\..\model\BlinkVO.ts"/>
///<reference path="..\..\model\StateVO.ts"/>
module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;
    import RouteConst = jm.common.RouteConst;
    import ErrorConst = jm.common.ErrorConst;
    import RouteUtil = jm.common.RouteUtil;
    import JourneyModel = jm.journey.JourneyModel;
    import IJourneyDetailVO = jm.journey.IJourneyDetailVO;
    import IFormController = ng.IFormController;
    import JMConfigConst = jm.common.JMConfigConst;

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
        errors: string[];
    }

    export class MomentEditFormController extends jm.common.BaseController {
        static NG_NAME: string = 'MomentEditFormController';
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS, RouteUtil.NG_NAME,
            JourneyModel.NG_NAME, JMConfigConst.STATES];

        constructor(private $scope: IMomentEditScope,
                    private momentModel: MomentModel,
                    private $stateParams: angular.ui.IStateParamsService,
                    private routeUtil: RouteUtil,
                    private journeyModel: JourneyModel,
                    private states: IStateVO[]) {
            super($scope);
            this.addScopeMethods('cancel', 'cancelBlink', 'save', 'saveBlink', 'selectFormat', 'createNewBlink',
                'editBlink', 'isBlinkValid', 'selectState', 'removeState', 'openDatePicker');

            $scope.hasMoment = (!!$stateParams['momentId']);

            this.$scope.allStates = this.states;
            $scope.journey = journeyModel.getCurrentJourney();

            if ($scope.hasMoment) {
                $scope.moment = momentModel.getCurrentMoment($stateParams['momentId']);
                this.$scope.missingStates = [];
            } else {
                $scope.moment = new MomentDetailVO();
                $scope.moment.isPublic = $scope.journey.isPublic;
                this.$scope.missingStates = this.states.slice();
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

            $scope.isDateOpen = false;

            $scope.errors = [ErrorConst.FILE_TYPE_CORRUPTED_INVALID];
        }

        openDatePicker = ($event) => {
            this.$scope.isDateOpen = true;
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
        };

        save = () => {
            this.momentModel.updateMoment(this.$scope.moment).then(this.cancel);
        };

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
        };

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
        };

        selectFormat = (format: number) => {
            this.$scope.formBlink.blink.format = format;
        };

        createNewBlink = () => {
            this.$scope.formBlink.blink = new BlinkVO();
            this.$scope.canEditBlink = true;
            this.$scope.formBlink.imageFiles.length = 0;
            this.$scope.isNewBlink = true;
            this.$scope.selectedIndex = this.$scope.moment.blinks.length;
            this.$scope.missingStates = this.states.slice();
        };

        editBlink = () => {
            var b: BlinkVO = this.$scope.moment.currentBlink;
            this.$scope.formBlink.blink = b;
            this.$scope.canEditBlink = true;
            this.$scope.missingStates.length = 0;
            for (var j: number = 0; j < this.states.length; j++) {
                var add: boolean = true;
                for (var i: number = 0; i < b.states.length; i++) {
                    if (b.states[i].id === this.states[j].id) {
                        add = false;
                        break;
                    }
                }
                if (add) {
                    this.$scope.missingStates.push(this.states[j]);
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
        };

        removeState = (state: IStateVO) => {
            this.$scope.missingStates.push(state);
            this.$scope.formBlink.blink.states.splice(this.$scope.formBlink.blink.states.indexOf(state), 1);
        };
    }
}