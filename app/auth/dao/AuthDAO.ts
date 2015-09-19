module jm {
    export module auth {
        'use strict';

        import IPromise = ng.IPromise;
        import IInjectorService = ng.auto.IInjectorService;

        export class AuthDAO extends jm.common.BaseHttpDAO {

            static NG_NAME: string = 'authDAO';

            constructor($injector: IInjectorService) {
                super($injector);
            }

            login(email, password): IPromise < any > {
                return this.$q.defer().promise;
            }
            tokenLogin(token): IPromise < any > {
                return this.$q.defer().promise;
            }
            register(email, password, name): IPromise < any > {
                return this.$q.defer().promise;
            }
            logout(id): IPromise < any > {
                return this.$q.defer().promise;
            }
        }
    }
}