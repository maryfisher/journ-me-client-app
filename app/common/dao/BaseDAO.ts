module jm {
    export module common {
        'use strict';

        import IPromise = ng.IPromise;
        import IQService = ng.IQService;
        import IInjectorService = ng.auto.IInjectorService;

        export class BaseDAO {
            $q: IQService;

            constructor($injector: IInjectorService) {
                this.$q = $injector.get < IQService > ('$q');
            }
        }
    }
}