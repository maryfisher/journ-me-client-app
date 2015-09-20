/// <reference path="../dao/IAliasVOResource.ts" />
/// <reference path="../../journey/model/JourneyModel.ts" />
module jm {
    export module user {
        'use strict';

        import JourneyModel = jm.journey.JourneyModel;

        export class AliasModel {

            static NG_NAME: string = 'aliasModel';

            private currentAlias: AliasDetailVO;
            private aliasService: AliasDAO;
            private journeyModel: JourneyModel;

            constructor($injector: ng.auto.IInjectorService) {
                this.aliasService = $injector.get < AliasDAO > (AliasDAO.NG_NAME);
                this.journeyModel = $injector.get < JourneyModel > (JourneyModel.NG_NAME);

                this.currentAlias = new AliasDetailVO();

                _.bindAll(this, 'setAlias');
            }

            private setAlias(data: IAliasVOResource) {
                this.currentAlias.parseData(data);
                this.journeyModel.refreshJourney(this.currentAlias);
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