module jm.common {
    'use strict';

    import IPromise = ng.IPromise;
    import IQService = ng.IQService;
    import IHttpService = ng.IHttpService;
    import IHttpPromise = ng.IHttpPromise;

    export class BaseHttpDAO {

        private static GET: string = 'get';
        private static POST: string = 'post';
        private static PUT: string = 'put';
        private static DELETE: string = 'delete';

        $http: IHttpService;
        $q: IQService;

        constructor($injector: ng.auto.IInjectorService) {
            this.$http = $injector.get < IHttpService >('$http');
            this.$q = $injector.get < IQService >('$q');
        }

        returnData<T>(response): T {
            return response.data;
        }

        post = <T>(url: string, data: Object): IHttpPromise<T> => {
            return this.execute(BaseHttpDAO.POST, url, data);
        };

        get = <T>(url: string, params: Object): IHttpPromise<T> => {
            return this.execute(BaseHttpDAO.GET, url, null, params);
        };

        put = <T>(url: string, data: Object): IHttpPromise<T> => {
            return this.execute(BaseHttpDAO.PUT, url, data);
        };

        del = <T>(url: string): IHttpPromise<T> => {
            return this.execute(BaseHttpDAO.DELETE, url);
        };

        private execute <T>(method, url, data?, params?): IHttpPromise<T> {
            var config: ng.IRequestConfig = {
                method: method,
                url: url,
                data: data,
                params: params,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };
            return this.$http(config);
        }

        makeCall = (method, url: string, params ?: Object, successCallback ?, errorCallback ?): IPromise < any > => {
            var deferred = this.$q.defer();
            method(url, params)
                .then(
                (response: any) => {
                    if (successCallback) {
                        deferred.resolve(successCallback(response));
                    } else {
                        deferred.resolve();
                    }
                },
                (response: any) => {
                    if (errorCallback) {
                        errorCallback(response);
                    }
                    deferred.reject();
                });
            return deferred.promise;
        };

        getQueryParams(path: string, queryParams ?: Object): string {
            var url: string = path;
            if (queryParams) {
                url += "?";
                for (var key in queryParams) {
                    url += key + '=' + queryParams[key] + '&';
                }
                //chop of the last '&'
                url = url.substr(0, url.length - 1);
            }

            return url;
        }
    }
}