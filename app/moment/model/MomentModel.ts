module jm.moment {

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
        private allStates: StateVO[];

        constructor($injector: ng.auto.IInjectorService) {
            this.momentService = $injector.get < MomentDAO >(MomentDAO.NG_NAME);
            this.feedbackService = $injector.get < FeedbackDAO >(FeedbackDAO.NG_NAME);
            this.blinkService = $injector.get < BlinkDAO >(BlinkDAO.NG_NAME);
            this.currentMoment = new MomentDetailVO();
        }

        private setMoment = (data: IMomentDetailVO) => {
            this.currentMoment.parseJson(data);
            if (this.currentAlias) {
                this.currentMoment.updateAlias(this.currentAlias);
            }
        };

        private addFeedback = (data: IFeedbackVO) => {
            this.currentMoment.addFeedback(data);
            data.alias = this.currentAlias;
        };

        getStates(): StateVO[] {
            if (!this.allStates) {
                this.allStates = [];
                this.momentService.getStates().then(
                    (data: StateVO[]) => {
                        for (var i: number = 0; i < data.length; i++) {
                            this.allStates.push(data[i]);
                        }
                    }
                );
            }
            return this.allStates;
        }

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
            moment.alias = this.currentAlias.id;
            moment.journey = journeyId;
            return this.momentService.createMoment(moment).then(this.setMoment);
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
            f.moment = this.currentMoment.id;
            f.alias = new AliasBaseVO();
            f.alias.id = this.currentAlias.id;
            return this.feedbackService.createFeedback(f).then(this.addFeedback);
        }

        getBlinkByIndex(index: number, blinkVO ?: BlinkVO) {
            this.blinkService.getBlinkByIndex(this.currentMoment.id, index).then(function (data: BlinkVO) {
                blinkVO.parseJson(data);
            })
        }

        createBlink(formBlink: BlinkFormVO) {
            formBlink.blink.moment = this.currentMoment.id;
            var moment: MomentDetailVO = this.currentMoment;
            return this.blinkService.createBlink(formBlink.imageFiles, formBlink.blink).then(function (response: any) {
                formBlink.blink.parseJson(response.data);
                moment.blinks.push(formBlink.blink.id);
            });
        }

        editBlink(formBlink: BlinkFormVO) {
            var saveBlink: BlinkVO = new BlinkVO(formBlink.blink);
            saveBlink.images.length = 0;
            return this.blinkService.updateBlink(formBlink.imageFiles, saveBlink).then(function (response: any) {
                formBlink.blink.parseJson(response.data);
            });
        }
    }
}