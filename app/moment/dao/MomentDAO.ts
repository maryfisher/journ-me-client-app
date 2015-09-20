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

/*
// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.factory('jmMomentService', function (jmServerConst, $q, $resource) {
        var momentDAO = $resource(
            jmServerConst.MOMENT_ID_PATH
        );

        var accept = function (data) {
            return data;
        };

        var reject = function (response) {
            return $q.reject(response);
        };

        return {
            getMoment: function (momentId) {
                return momentDAO.get({
                        momentId: momentId
                    },
                    accept,
                    reject
                ).$promise;
            },
            createMoment: function (moment, journeyId, aliasId) {
                return momentDAO.save({}, {
                        moment: moment,
                        journeyId: journeyId,
                        aliasId: aliasId
                    },
                    accept,
                    reject
                ).$promise;
            },
            updateMoment: function (moment) {
                return momentDAO.save({
                        momentId: moment._id
                    },
                    moment,
                    accept,
                    reject
                ).$promise;
            }
        };
    });

}(window.angular));*/