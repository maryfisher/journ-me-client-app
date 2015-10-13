module jm.moment {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;

    export class EmpathyDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'empathyDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.path = ServerConst.EMPATHY_PATH;
        }

        returnEmpathies = (response): IEmpathyVO[] => {
            var empathies: IEmpathyVO[] = [];
            for (var i = 0; i < response.data.length; i++) {
                empathies.push(new EmpathyVO(response.data[i]));
            }
            return empathies;
        };

        returnEmpathy = (response): IEmpathyVO => {
            return response.data;
        }

        getEmpathies(momentId: string): IPromise < IEmpathyVO[] > {
            return this.getAll({momentId: momentId}, this.returnEmpathies);
        }

        createEmpathy(empathy: EmpathyVO): IPromise < IEmpathyVO > {
            return this.create(empathy, this.returnEmpathy);
        }

        updateEmpathy(empathy: EmpathyVO): IPromise < IEmpathyVO > {
            return this.update(empathy, this.returnEmpathy);
        }
    }
}