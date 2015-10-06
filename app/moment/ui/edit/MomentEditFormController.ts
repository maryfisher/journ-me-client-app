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
    }

    export class MomentEditFormController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME, NGConst.$STATE_PARAMS, RouteUtil.NG_NAME, JourneyModel.NG_NAME];

        private isNewBlink: boolean;

        constructor(private $scope: IMomentEditScope, private momentModel: MomentModel, private $stateParams: angular.ui.IStateParamsService, private routeUtil: RouteUtil, journeyModel: JourneyModel) {
            super($scope);
            this.addScopeMethod('cancel');
            this.addScopeMethod('cancelBlink');
            this.addScopeMethod('save');
            this.addScopeMethod('saveBlink');
            this.addScopeMethod('selectFormat');
            this.addScopeMethod('createNewBlink');
            this.addScopeMethod('editBlink');
            this.addScopeMethod('isBlinkValid');
            _.bindAll(this, 'createMomentSuccess', 'createBlinkSuccess');

            $scope.hasMoment = (!!$stateParams['momentId']);

            if ($scope.hasMoment) {
                $scope.moment = momentModel.getCurrentMoment($stateParams['momentId']);
            } else {
                $scope.journey = journeyModel.getCurrentJourney();
                $scope.moment = new MomentDetailVO();
                $scope.moment.isPublic = $scope.journey.isPublic;
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
        }

        cancel() {
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

        save() {
            this.momentModel.updateMoment(this.$scope.moment).then(this.cancel);
        }

        isBlinkValid(): boolean {
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

        saveBlink() {
            if (!this.$scope.hasMoment) {
                //put blink on moment
                this.momentModel.createMoment(this.$scope.moment, this.$stateParams['journeyId']).then(this.createMomentSuccess);
                return;
            }
            if (this.isNewBlink) {
                this.momentModel.createBlink(this.$scope.formBlink);
            } else {
                this.momentModel.editBlink(this.$scope.formBlink);
            }
            this.$scope.canEditBlink = this.isNewBlink = false;
        }

        createMomentSuccess() {
            this.$scope.moment = this.momentModel.getCurrentMoment();
            this.momentModel.createBlink(this.$scope.formBlink).then(this.createBlinkSuccess);
        }

        createBlinkSuccess() {
            this.$scope.hasMoment = true;
            this.$scope.canEditBlink = false;
        }

        cancelBlink() {
            if (!this.$scope.hasMoment) {
                this.cancel();
                return;
            }
            if (this.$scope.moment.blinks.length > 0) {
                this.$scope.canEditBlink = this.isNewBlink = false;
            }
        }

        selectFormat(format: number) {
            this.$scope.formBlink.blink.format = format;
        }

        createNewBlink() {
            this.$scope.formBlink.blink = new BlinkVO();
            this.$scope.canEditBlink = true;
            this.$scope.formBlink.imageFiles.length = 0;
            this.isNewBlink = true;
            this.$scope.selectedIndex = this.$scope.moment.blinks.length;
        }

        editBlink() {
            this.$scope.formBlink.blink = this.$scope.moment.currentBlink;
            this.$scope.canEditBlink = true;
        }

        getBlink() {
            this.$scope.formBlink.blink = new BlinkVO();
            this.momentModel.getBlinkByIndex(this.$scope.selectedIndex, this.$scope.formBlink.blink);
        }
    }
}