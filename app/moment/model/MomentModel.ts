module jm.moment {

    import AliasDetailVO = jm.user.AliasDetailVO;
    import AliasBaseVO = jm.user.AliasBaseVO;
    import IPromise = ng.IPromise;
    import IHttpPromiseCallbackArg = ng.IHttpPromiseCallbackArg;

    export class MomentModel {

        static NG_NAME: string = 'momentModel';

        private currentMoment: MomentDetailVO;
        private momentService: MomentDAO;
        private empathyService: EmpathyDAO;
        private blinkService: BlinkDAO;
        private currentAlias: AliasDetailVO;
        private allStates: StateVO[];

        constructor($injector: ng.auto.IInjectorService) {
            this.momentService = $injector.get < MomentDAO >(MomentDAO.NG_NAME);
            this.empathyService = $injector.get < EmpathyDAO >(EmpathyDAO.NG_NAME);
            this.blinkService = $injector.get < BlinkDAO >(BlinkDAO.NG_NAME);
            this.currentMoment = new MomentDetailVO();
        }

        private setMoment = (data: IMomentDetailVO) => {
            this.currentMoment.parseJson(data);
            if (this.currentAlias) {
                this.currentMoment.updateAlias(this.currentAlias);
            }
        }

        private setEmpathies = (data: IEmpathyVO[]) => {
            this.currentMoment.addEmpathies(data);
        }

        private addEmpathy = (data: IEmpathyVO) => {
            this.currentMoment.empathies.push(data);
            data.alias = this.currentAlias;
        }

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
                if (this.currentMoment._id !== id) {
                    this.currentMoment.invalidateData();
                }
                this.momentService.getMoment(id).then(this.setMoment);
                this.currentMoment._id = id;
            }
            return this.currentMoment;
        }

        refreshMoment(alias: AliasDetailVO) {
            this.currentAlias = alias;
            this.currentMoment.updateAlias(alias);
        }

        createMoment(moment: MomentBaseVO, journeyId: string): IPromise < void > {
            moment.alias = this.currentAlias._id;
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
            var sendMoment: MomentDetailVO = new MomentDetailVO();
            sendMoment.parseJson(moment);
            sendMoment.currentBlink = undefined;
            return this.momentService.updateMoment(sendMoment).then(this.setMoment);
        }

        getEmpathies(): IPromise < void > {
            //TODO
            //make a note when empathies have been fetched once so as not to send a request every time?
            return this.empathyService.getEmpathies(this.currentMoment._id).then(this.setEmpathies);
        }

        createEmpathy(empathyBody: string) {
            var empathy: EmpathyVO = new EmpathyVO();
            empathy.moment = this.currentMoment._id;
            empathy.alias = new AliasBaseVO();
            empathy.alias._id = this.currentAlias._id;
            empathy.body = empathyBody;
            return this.empathyService.createEmpathy(empathy).then(this.addEmpathy);
        }

        getBlinkByIndex(index: number, blinkVO ?: BlinkVO) {
            this.blinkService.getBlinkByIndex(this.currentMoment._id, index).then(function (data: BlinkVO) {
                blinkVO.parseJson(data);
            })
        }

        createBlink(formBlink: BlinkFormVO) {
            formBlink.blink.moment = this.currentMoment._id;
            var moment: MomentDetailVO = this.currentMoment;
            return this.blinkService.createBlink(formBlink.imageFiles, formBlink.blink).then(function (response: any) {
                formBlink.blink.parseJson(response.data);
                moment.blinks.push(formBlink.blink._id);
            });
        }

        editBlink(formBlink: BlinkFormVO) {
            var saveBlink: BlinkVO = new BlinkVO();
            saveBlink.parseJson(formBlink.blink);
            saveBlink.images.length = 0;
            return this.blinkService.updateBlink(formBlink.imageFiles, saveBlink).then(function (response: any) {
                formBlink.blink.parseJson(response.data);
            });
        }
    }
}