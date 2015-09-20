/// <reference path="../dao/IAliasVOResource.ts" />
/// <reference path="../../journey/model/JourneyModel.ts" />
/// <reference path="../../moment/model/MomentModel.ts" />
module jm {
    export module user {
        'use strict';

        import JourneyModel = jm.journey.JourneyModel;
        import MomentModel = jm.moment.MomentModel;

        export class AliasModel {

            static NG_NAME: string = 'aliasModel';

            private currentAlias: AliasDetailVO;
            private aliasService: AliasDAO;
            private journeyModel: JourneyModel;
            private momentModel: MomentModel;

            constructor($injector: ng.auto.IInjectorService) {
                this.aliasService = $injector.get < AliasDAO > (AliasDAO.NG_NAME);
                this.journeyModel = $injector.get < JourneyModel > (JourneyModel.NG_NAME);
                this.momentModel = $injector.get < MomentModel > (MomentModel.NG_NAME);

                this.currentAlias = new AliasDetailVO();

                _.bindAll(this, 'setAlias');
            }

            private setAlias(data: IAliasVOResource) {
                this.currentAlias.parseData(data);
                this.journeyModel.refreshJourney(this.currentAlias);
                this.momentModel.refreshMoment(this.currentAlias);
            }

            invalidateAlias() {
                this.currentAlias.invalidateData();
            }

            getCurrentAlias(id ? : string): AliasDetailVO {
                if (id) {
                    this.aliasService.getAlias(id).$promise.then(this.setAlias);
                }
                return this.currentAlias;
            }
        }
    }
}