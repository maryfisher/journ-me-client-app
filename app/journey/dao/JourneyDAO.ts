module jm {
    export module journey {
        'use strict';

        import IResourceService = angular.resource.IResourceService;
        import IResourceClass = angular.resource.IResourceClass;
        import ServerConst = jm.common.ServerConst;
        import NGConst = jm.common.NGConst;
        import IPromise = angular.IPromise;

        export class JourneyDAO extends jm.common.BaseDAO {

            static NG_NAME: string = 'journeyDAO';

            private journeyDAO: IResourceClass < IJourneyVOResource > ;

            constructor($injector: ng.auto.IInjectorService) {
                super($injector);
                var $resource = $injector.get < IResourceService > (NGConst.$RESOURCE);
                this.journeyDAO = $resource < IJourneyVOResource > (
                    ServerConst.JOURNEY_ID_PATH
                );
            }

            getJourney(id) {
                return this.journeyDAO.get({
                    journeyId: id
                });
            }

            createJourney(journey: JourneyBaseVO): IPromise < IJourneyBaseVO > {
                return this.journeyDAO.save({},
                    journey
                ).$promise;
            }

            updateJourney(journey: JourneyBaseVO): IPromise < IJourneyBaseVO > {
                return this.journeyDAO.save({
                        journeyId: journey._id
                    },
                    journey
                ).$promise;
            }
        }
    }
}
/*
// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyService', function (jmServerConst, $q, $resource) {

        var journeyDAO = $resource(
            jmServerConst.JOURNEY_ID_PATH
        );

        return {
            getJourney: function (id) {
                return journeyDAO.get({
                        journeyId: id
                    },
                    function (data) {
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                );
            },
            createJourney: function (journey) {
                return journeyDAO.save({},
                    journey,
                    function (data) {
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            updateJourney: function (journey) {
                return journeyDAO.save({
                        journeyId: journey._id
                    },
                    journey,
                    function (data) {
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            }
        };
    });

}(window.angular));*/