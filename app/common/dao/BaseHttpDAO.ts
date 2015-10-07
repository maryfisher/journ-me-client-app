/// <reference path="BaseDAO.ts" />
module jm.common {
    'use strict';

    import IPromise = ng.IPromise;
    import IQService = ng.IQService;
    import IHttpService = ng.IHttpService;

    export class BaseHttpDAO extends jm.common.BaseDAO {

        $http: IHttpService;

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.$http = $injector.get < IHttpService >('$http');
        }

        returnData(response) {
            return response.data;
        }

        reject = (response) => {
            return this.$q.reject(response);
        }
    }
}