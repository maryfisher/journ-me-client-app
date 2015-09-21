module jm {
    export module auth {
        'use strict';

        import IPromise = ng.IPromise;
        import IInjectorService = ng.auto.IInjectorService;
        import ServerConst = jm.common.ServerConst;

        export class AuthDAO extends jm.common.BaseHttpDAO {

            static NG_NAME: string = 'authDAO';

            constructor($injector: IInjectorService) {
                super($injector);
                _.bindAll(this, 'reject');
            }

            login(email, password): IPromise < any > {
                return this.$http.post(
                    ServerConst.LOGIN_PATH, {
                        email: email,
                        password: password
                    },
                    ServerConst.DEFAULT_CONFIG
                ).then(
                    this.returnData,
                    this.reject
                );
                //return this.$q.defer().promise;
            }
            tokenLogin(token): IPromise < any > {
                return this.$http.post(
                    ServerConst.LOGIN_TOKEN_PATH, {
                        authToken: token
                    },
                    ServerConst.DEFAULT_CONFIG
                ).then(
                    this.returnData,
                    this.reject
                );
                //return this.$q.defer().promise;
            }
            register(email, password, name): IPromise < any > {
                return this.$http.post(
                    ServerConst.REGISTER_PATH, {
                        email: email,
                        password: password,
                        name: name
                    },
                    ServerConst.DEFAULT_CONFIG
                ).then(
                    this.returnData,
                    this.reject
                );
                //return this.$q.defer().promise;
            }
            logout(id): IPromise < any > {

                return this.$http.post(
                    ServerConst.LOGOUT_PATH, {
                        userId: id
                    },
                    ServerConst.DEFAULT_CONFIG
                );

                //return this.$q.defer().promise;
            }
        }
    }
}