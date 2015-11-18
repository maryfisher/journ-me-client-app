///<reference path="..\..\common\const\JMConfigConst.ts"/>
///<reference path="..\..\user\model\AliasDetailVO.ts"/>
///<reference path="..\..\user\model\AliasBaseVO.ts"/>
///<reference path="..\dao\MomentDAO.ts"/>
///<reference path="..\dao\FeedbackDAO.ts"/>
///<reference path="..\dao\BlinkDAO.ts"/>
///<reference path="FeedbackVO.ts"/>
///<reference path="StateVO.ts"/>
//FIXME: for some reason we cannot reference ///<reference path="MomentDetailVO.ts"/>
module jm.moment {

    import JMConfigConst = jm.common.JMConfigConst;
    import AliasDetailVO = jm.user.AliasDetailVO;
    import AliasBaseVO = jm.user.AliasBaseVO;
    import IPromise = ng.IPromise;
    import IHttpPromiseCallbackArg = ng.IHttpPromiseCallbackArg;

    export class MomentModel {

        static NG_NAME: string = 'momentModel';

        private currentMoment: MomentDetailVO;
        private momentService: MomentDAO;
        private feedbackService: FeedbackDAO;
        private blinkService: BlinkDAO;
        private currentAlias: AliasDetailVO;
        private stateRefs: Object; // IStateVO.id => IStateVO

        constructor($injector: ng.auto.IInjectorService) {
            this.momentService = $injector.get < MomentDAO >(MomentDAO.NG_NAME);
            this.feedbackService = $injector.get < FeedbackDAO >(FeedbackDAO.NG_NAME);
            this.blinkService = $injector.get < BlinkDAO >(BlinkDAO.NG_NAME);
            var states: IStateVO[] = $injector.get < IStateVO[] >(JMConfigConst.STATES);
            this.stateRefs = {};
            for (var i: number = 0; i < states.length; i++) {
                var state: IStateVO = states[i];
                this.stateRefs[state.id] = state;
            }
            this.currentMoment = new MomentDetailVO();
        }

        private setMoment = (data: IMomentDetailVO) => {
            this.currentMoment.parseJson(data, this.stateRefs);
            if (this.currentAlias) {
                this.currentMoment.updateAlias(this.currentAlias);
            }
        };

        private addFeedback = (data: IFeedbackVO) => {
            this.currentMoment.addFeedback(data, this.stateRefs);
            data.alias = this.currentAlias;
        };

        getCurrentMoment(id ?: string): MomentDetailVO {
            if (id) {
                if (this.currentMoment.id !== id) {
                    this.currentMoment.invalidateData();
                }
                this.momentService.getMoment(id).then(this.setMoment);
                this.currentMoment.id = id;
            }
            return this.currentMoment;
        }

        refreshMoment(alias: AliasDetailVO) {
            this.currentAlias = alias;
            this.currentMoment.updateAlias(alias);
        }

        createMoment(moment: MomentBaseVO, journeyId: string): IPromise < void > {
            return this.momentService.createMoment(moment, this.currentAlias.id, journeyId).then(this.setMoment);
            /*function (data) {
             this.setMoment(data);
             //TODO do we really need to do this?
             //this.journeyModel.getCurrentJourney().moments.push(data);
             });*/
        }

        updateMoment(moment): IPromise < void > {
            //so as not to send blink details
            var sendMoment: MomentDetailVO = new MomentDetailVO(moment);
            sendMoment.currentBlink = undefined;
            return this.momentService.updateMoment(sendMoment).then(this.setMoment);
        }

        createFeedback(f: FeedbackVO) {
            return this.feedbackService.createFeedback(f, this.currentMoment.id, this.currentAlias.id).then(this.addFeedback);
        }

        getBlinkByIndex(index: number, blinkVO ?: BlinkVO) {
            var stateRefs: Object = this.stateRefs;
            this.blinkService.getBlink(this.currentMoment.blinks[index]).then(function (data: BlinkVO) {
                blinkVO.parseData(data, stateRefs);
            });
        }

        createBlink(formBlink: BlinkFormVO) {
            var moment: MomentDetailVO = this.currentMoment;
            var stateRefs: Object = this.stateRefs;
            return this.blinkService.createBlink(formBlink.imageFiles, formBlink.blink, this.currentMoment.id).then(function (response: any) {
                formBlink.blink.parseData(response.data, stateRefs);
                moment.blinks.push(formBlink.blink.id);
            });
        }

        editBlink(formBlink: BlinkFormVO) {
            var saveBlink: BlinkVO = new BlinkVO(formBlink.blink);
            saveBlink.images.length = 0;
            var stateRefs: Object = this.stateRefs;
            return this.blinkService.updateBlink(formBlink.imageFiles, saveBlink).then(function (response: any) {
                formBlink.blink.parseData(response.data, stateRefs);
            });
        }
    }
}