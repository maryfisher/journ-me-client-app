module jm.moment {
    'use strict';

    import IResourceService = angular.resource.IResourceService;
    import IResourceClass = angular.resource.IResourceClass;
    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;

    export class MomentDAO extends jm.common.BaseDAO {

        static NG_NAME: string = 'momentDAO';

        private momentDAO: IResourceClass < IMomentVOResource > ;

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            var $resource = $injector.get < IResourceService > (NGConst.$RESOURCE);
            this.momentDAO = $resource < IMomentVOResource > (
                ServerConst.MOMENT_ID_PATH
            );
        }

        getMoment(id: string) {
            return this.momentDAO.get({
                momentId: id
            });
        }

        createMoment(moment: MomentBaseVO): IPromise < IMomentBaseVO > {
            return this.momentDAO.save({}, {
                moment: moment
            }).$promise;
        }

        updateMoment(moment: MomentBaseVO): IPromise < IMomentBaseVO > {
            return this.momentDAO.save({
                    momentId: moment._id
                },
                moment
            ).$promise;
        }
    }
}