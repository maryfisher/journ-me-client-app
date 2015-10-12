module jm.common {
    'use strict';

    import IPromise = ng.IPromise;
    import IQService = ng.IQService;
    import IHttpService = ng.IHttpService;

    export class BaseHttpDAO {

        GET = 'get';
        POST = 'post';
        PUT = 'put';
        DELETE = 'delete';

        $http: IHttpService;
        $q: IQService;

        constructor($injector: ng.auto.IInjectorService) {
            this.$http = $injector.get < IHttpService >('$http');
            this.$q = $injector.get < IQService >('$q');
        }

        post = (url: string, params: Object) => {
            return this.execute(this.POST, url, params);
        }

        get = (url: string, params: Object) => {
            return this.execute(this.GET, url, null, params);
        }

        put = (url: string, data: Object) => {
            return this.execute(this.PUT, url, data);
        }

        del = (url: string) => {
            return this.execute(this.DELETE, url);
        }

        execute(method, url, data?, params?) {
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
        }
    }
}