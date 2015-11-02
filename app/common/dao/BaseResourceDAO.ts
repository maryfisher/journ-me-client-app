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

        create(data: Object, successCallback) {
            return this.makeCall(this.post, this.path, data, successCallback);
        }

        update(data: IIdObject, successCallback) {
            return this.makeCall(this.post, this.getId(data.id), data, successCallback);
        }
    }
}
