module jm.common {

    import IPromise = ng.IPromise;

    export interface IIdObject {
        id: string;
    }

    export class BaseResourceDAO extends BaseHttpDAO {

        path: string;

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
        }

        getId = (id: string): string => {
            return this.path + id;
        };

        getOne(id: string, successCallback): IPromise<any> {
            return this.makeCall(this.get, this.getId(id), null, successCallback);
        }

        getAll(data: Object, successCallback): IPromise<any> {
            return this.makeCall(this.get, this.path, data, successCallback);
        }

        create(data: Object, successCallback, queryParams ?: Object) {
            return this.makeCall(this.post, this.getQueryParams(this.path, queryParams), data, successCallback);
        }

        update(data: IIdObject, successCallback) {
            return this.makeCall(this.post, this.getId(data.id), data, successCallback);
        }

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
