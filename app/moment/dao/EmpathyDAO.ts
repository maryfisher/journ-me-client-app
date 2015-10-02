module jm.moment {
    'use strict';

    import IResourceService = angular.resource.IResourceService;
    import IResourceClass = angular.resource.IResourceClass;
    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;

    export class EmpathyDAO extends jm.common.BaseDAO {

        static NG_NAME: string = 'empathyDAO';

        private empathyDAO: IResourceClass < any > ;

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            var $resource = $injector.get < IResourceService > (NGConst.$RESOURCE);
            this.empathyDAO = $resource < any > (
                ServerConst.EMPATHY_ID_PATH
            );
        }

        getEmpathies(momentId: string): IPromise < IEmpathyVO[] > {
            return this.empathyDAO.query({
                momentId: momentId
            }).$promise;
        }

        createEmpathy(empathy: EmpathyVO): IPromise < IEmpathyVO > {
            return this.empathyDAO.save({}, {
                empathy: empathy
            }).$promise;
        }

        updateEmpathy(empathy: EmpathyVO): IPromise < IEmpathyVO > {
            return this.empathyDAO.save({
                    empathyId: empathy._id
                },
                empathy
            ).$promise;
        }
    }
}