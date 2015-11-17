module jm.error {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import IHttpPromiseCallbackArg = ng.IHttpPromiseCallbackArg;
    import IPromise = ng.IPromise;
    import IQService = ng.IQService;

    export interface IErrorListener {
        onError(errorCode: string);
    }

    export class ErrorIntercept implements ng.IHttpInterceptor {
        static NG_NAME: string = 'errorIntercept';

        private errorListeners: Object = {};
        private $q: IQService;

        constructor($injector: ng.auto.IInjectorService) {
            this.$q = $injector.get < IQService >('$q');
        }

        registerForError(errorListener: IErrorListener, errors: string[]) {
            for (var i: number = 0; i < errors.length; i++) {
                var errorCode: string = errors[i];
                var listener: IErrorListener[] = this.errorListeners[errorCode];
                if (!listener) {
                    listener = this.errorListeners[errorCode] = [];
                }
                listener.push(errorListener);
            }
        }

        unregisterForError(errorListener: IErrorListener, errors: string[]) {
            for (var i: number = 0; i < errors.length; i++) {
                var errorCode: string = errors[i];
                var listener: IErrorListener[] = this.errorListeners[errorCode];
                listener.splice(listener.indexOf(errorListener), 1);
            }
        }

        response = (res: IHttpPromiseCallbackArg<any>): IHttpPromiseCallbackArg<any> => {
            return this.handleError(res);
        };

        responseError = (response: IHttpPromiseCallbackArg<any>): IHttpPromiseCallbackArg<any> => {
            return this.handleError(response);
        };

        handleError = (res: IHttpPromiseCallbackArg<any>): any => {
            console.log('response ' + res.status + ' ' + res.data.code);
            if (res.status >= 400) {
                var listener: IErrorListener[] = this.errorListeners[res.data.code];
                if (!listener) {
                    return this.$q.reject(res);
                }
                for (var i: number = 0; i < listener.length; i++) {
                    listener[i].onError(res.data.code);
                }
                return this.$q.reject(res);
            }
            return res;
        }
    }
}