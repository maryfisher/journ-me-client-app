module jm.auth {
    'use strict';

    import IPromise = ng.IPromise;
    import IInjectorService = ng.auto.IInjectorService;
    import ServerConst = jm.common.ServerConst;

    export class AuthDAO extends jm.common.BaseHttpDAO {

        static NG_NAME: string = 'authDAO';

        constructor($injector: IInjectorService) {
            super($injector);
        }

        //TODO
        //specify this more/split into different methods so that we know what is returned
        returnData = (response) => {
            return response.data;
        };

        login(email: string, password: string): IPromise < any > {
            return this.makeCall(this.post, ServerConst.LOGIN_PATH, {
                email: email,
                password: password
            }, this.returnData);
        }

        tokenLogin(token: string): IPromise < any > {
            return this.makeCall(this.post, ServerConst.LOGIN_TOKEN_PATH, {
                authToken: token
            }, this.returnData);
        }

        register(email: string, password: string, name: string): IPromise < any > {
            return this.makeCall(this.post, ServerConst.REGISTER_PATH, {
                email: email,
                password: password,
                name: name
            }, this.returnData);
        }

        logout(id: string): IPromise < any > {
            return this.makeCall(this.post, ServerConst.LOGOUT_PATH, {
                userId: id
            }, this.returnData);
        }
    }
}