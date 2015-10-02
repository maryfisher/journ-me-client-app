module jm.moment {

    import AliasDetailVO = jm.user.AliasDetailVO;
    import AliasBaseVO = jm.user.AliasBaseVO;
    import IPromise = ng.IPromise;

    export class MomentModel {

        static NG_NAME: string = 'momentModel';

        private currentMoment: MomentDetailVO;
        private momentService: MomentDAO;
        private empathyService: EmpathyDAO;
        private blinkService: BlinkDAO;
        private currentAlias: AliasDetailVO;

        constructor($injector: ng.auto.IInjectorService) {
            this.momentService = $injector.get < MomentDAO > (MomentDAO.NG_NAME);
            this.empathyService = $injector.get < EmpathyDAO > (EmpathyDAO.NG_NAME);
            this.blinkService = $injector.get < BlinkDAO > (BlinkDAO.NG_NAME);
            this.currentMoment = new MomentDetailVO();
            _.bindAll(this, 'setMoment', 'setEmpathies', 'addEmpathy');
        }

        private setMoment(data: IMomentDetailVO) {
            this.currentMoment.parseDetailData(data);
            if (this.currentAlias) {
                this.currentMoment.updateAlias(this.currentAlias);
            }
        }

        private setEmpathies(data: IEmpathyVO[]) {
            this.currentMoment.addEmpathies(data);
        }

        private addEmpathy(data: IEmpathyVO) {
            this.currentMoment.empathies.push(data);
        }

        getCurrentMoment(id ? : string): MomentDetailVO {
            if (id) {
                if (this.currentMoment._id !== id) {
                    this.currentMoment.invalidateData();
                }
                this.momentService.getMoment(id).$promise.then(this.setMoment);
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
            return this.momentService.updateMoment(moment).then(this.setMoment);
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

        getBlinkByIndex(index: number, blinkVO ? : BlinkVO){
            this.blinkService.getBlinkByIndex(this.currentMoment._id, index).then(function(data: BlinkVO){
                blinkVO.parseData(data);
            })
        }

        createBlink(blink: BlinkFormVO){
            blink.moment = this.currentMoment._id;
            return this.blinkService.createBlink(blink).then(function (response: BlinkVO) {
                blink.parseData(response);
            });
        }
    }
}