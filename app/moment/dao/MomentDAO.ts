module jm.moment {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;

    export class MomentDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'momentDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.path = ServerConst.MOMENT_PATH;
        }

        returnMoment = (response): IMomentDetailVO => {
            return response.data;
        };

        returnBaseMoment = (response): IMomentBaseVO => {
            return response.data;
        };

        returnStates = (response): StateVO[] => {
            var states: StateVO[] = [];
            for (var i = 0; i < response.data.length; i++) {
                states.push(new StateVO(response.data[i]));
            }
            return states;
        }

        getMoment(id: string): IPromise < IMomentDetailVO > {
            return this.getOne(id, this.returnMoment);
        }

        getStates(): IPromise<StateVO[]> {
            return this.makeCall(this.get, ServerConst.STATE_PATH, null, this.returnStates);
        }

        createMoment(moment: MomentBaseVO, aliasId: string, journeyId: string): IPromise < IMomentBaseVO > {
            return this.create(moment, this.returnBaseMoment, {'aliasId' : aliasId, 'journeyId': journeyId});
        }

        updateMoment(moment: MomentBaseVO): IPromise < IMomentBaseVO > {
            return this.update(moment, this.returnBaseMoment);
        }
    }
}