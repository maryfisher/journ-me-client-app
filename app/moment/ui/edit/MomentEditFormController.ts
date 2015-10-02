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
        selectFormat(format: number);
        journey: IJourneyDetailVO;
        selectedBlink: BlinkFormVO;
        editBlink: boolean;
        formats: number[];
        selectedFormat: number;
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
            _.bindAll(this, 'saveNewSuccess');

            $scope.hasMoment = (!!$stateParams['momentId']);

            if ($scope.hasMoment) {
                $scope.moment = momentModel.getCurrentMoment($stateParams['momentId']);
            } else {
                $scope.journey = journeyModel.getCurrentJourney();
                $scope.moment = new MomentDetailVO();
                $scope.moment.isPublic = $scope.journey.isPublic;
            }
            this.isNewBlink = $scope.editBlink = $scope.moment.blinks.length === 0;

            $scope.selectedBlink = new BlinkFormVO();
            if(!this.isNewBlink){
                this.momentModel.getBlinkByIndex(0, $scope.selectedBlink);
            }

            $scope.formats = [];
            var i: number = 0;
            for (var item in BlinkFormatEnum) {
                if (/^\d+$/.test(item)) {
                    $scope.formats.push(i);
                    i++;
                }
            }
            $scope.selectedFormat = 0;
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
            if (!this.$scope.hasMoment) {
                this.momentModel.createMoment(this.$scope.moment, this.$stateParams['journeyId']).then(this.saveNewSuccess);
            } else {
                this.momentModel.updateMoment(this.$scope.moment).then(this.cancel);
            }
        }

        saveNewSuccess() {
            this.$scope.moment = this.momentModel.getCurrentMoment();
            this.cancel();
        }

        saveBlink() {
            if(this.isNewBlink){
                this.momentModel.createBlink(this.$scope.selectedBlink);
            }
        }

        cancelBlink() {
            if (this.$scope.moment.blinks.length > 0) {
                this.$scope.editBlink = false;
            }
        }

        selectFormat(format: number) {
            this.$scope.selectedBlink.format = format;
        }

        createNewBlink(){
            //TODO
            this.$scope.editBlink = true;
            this.$scope.selectedBlink = new BlinkFormVO();
            this.isNewBlink = true;
        }
    }
}