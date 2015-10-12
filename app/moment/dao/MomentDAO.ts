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

        getMoment(id: string): IPromise < IMomentDetailVO > {
            return this.getOne(id, this.returnMoment);
        }

        createMoment(moment: MomentBaseVO): IPromise < IMomentBaseVO > {
            return this.create(moment, this.returnBaseMoment);
        }

        updateMoment(moment: MomentBaseVO): IPromise < IMomentBaseVO > {
            return this.update(moment, this.returnBaseMoment);
        }
    }
}