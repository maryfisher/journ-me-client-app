///<reference path="..\..\common\const\ServerConst.ts"/>
///<reference path="..\..\common\const\NGConst.ts"/>
///<reference path="..\..\user\model\AliasModel.ts"/>
module jm.auth {
    'use strict';

    import AliasModel = jm.user.AliasModel;
    import ServerConst = jm.common.ServerConst;
    import IPromise = ng.IPromise;
    import ICookiesService = angular.cookies.ICookiesService;
    import IQService = ng.IQService;
    import NGConst = jm.common.NGConst;

    export class AuthModel {

        static NG_NAME: string = 'authModel';

        private userVO: UserVO;
        private aliasModel: AliasModel;
        private authDAO: AuthDAO;
        private authTokenIntercept: AuthTokenIntercept;
        private $cookies: ICookiesService;
        private $q: IQService;
        private rememberMe: boolean;

        constructor($injector: ng.auto.IInjectorService) {
            this.$q = $injector.get < IQService >(NGConst.$Q);
            this.$cookies = $injector.get < ICookiesService >(NGConst.$COOKIES);
            this.authDAO = $injector.get < AuthDAO >(AuthDAO.NG_NAME);
            this.aliasModel = $injector.get < AliasModel >(AliasModel.NG_NAME);
            this.authTokenIntercept = $injector.get < AuthTokenIntercept >(AuthTokenIntercept.NG_NAME);
            this.userVO = new UserVO();
            this.authTokenIntercept.init(this);
        }

        private clearAll = () => {
            this.userVO.invalidateData();
            this.aliasModel.invalidateAlias();
        };

        private clearAllResponse = (response): IPromise < any > => {
            this.clearAll();
            return response;
        };

        private reject = (response): IPromise < any > => {
            this.clearAll();
            return this.$q.reject();
        };

        private setData = (data: IUserVO) => {
            this.userVO.parseJson(data);
            this.aliasModel.getCurrentAlias(data.currentAlias);
        };

        private setDataAndCookie = (data: IUserVO) => {
            this.setData(data);
            if (this.rememberMe) {
                this.$cookies.put(ServerConst.COOKIE_TOKEN_KEY, this.userVO.authToken);
            }
        };

        private removeCookie = (response): IPromise < any > => {
            this.$cookies.remove(ServerConst.COOKIE_TOKEN_KEY);
            return this.reject(response);
        };

        login(email, password, rememberMe): IPromise < any > {
            this.rememberMe = rememberMe;
            return this.authDAO.login(email, password).then(
                this.setDataAndCookie, this.reject);
        }

        tokenLogin(): IPromise < any > {
            this.rememberMe = true;
            this.userVO.authToken = this.$cookies.get(ServerConst.COOKIE_TOKEN_KEY);
            if (this.userVO.authToken) {
                return this.authDAO.tokenLogin().then(
                    this.setDataAndCookie,
                    this.removeCookie
                );
            } else {
                return this.$q.reject();
            }
        }

        register(email, password, name): IPromise < any > {
            return this.authDAO.register(email, password, name).then(this.setData, this.clearAllResponse);
        }

        logout(): IPromise < any > {
            if (this.isLoggedIn()) {
                this.$cookies.remove(ServerConst.COOKIE_TOKEN_KEY);
                return this.authDAO.logout(this.userVO.id).finally(this.clearAll);
            } else {
                return this.$q.reject('Cannot log out if not logged in.');
            }
        }

        get currentUser(): UserVO {
            return this.userVO;
        }

        isLoggedIn(): boolean {
            return this.userVO.id !== undefined;
        }

        hasAuth(): boolean {
            return this.userVO.id !== undefined || this.userVO.authToken !== undefined;
        }
    }
}