/// <reference path="AuthVO.ts" />
module jm {
    export module auth {
        'use strict';

        import AliasModel = jm.user.AliasModel;
        import ServerConst = jm.common.ServerConst;
        import IPromise = ng.IPromise;
        import ICookiesService = angular.cookies.ICookiesService;
        import IQService = ng.IQService;
        import NGConst = jm.common.NGConst;

        export class AuthModel {

            static NG_NAME: string = 'authModel';

            private authVO: AuthVO;
            private aliasModel: AliasModel;
            private authDAO: AuthDAO;
            private $cookies: ICookiesService;
            private $q: IQService;
            private rememberMe: boolean;

            constructor($injector: ng.auto.IInjectorService) {
                this.$q = $injector.get < IQService > (NGConst.$Q);
                this.$cookies = $injector.get < ICookiesService > (NGConst.$COOKIES);
                this.authDAO = $injector.get < AuthDAO > (AuthDAO.NG_NAME);
                this.aliasModel = $injector.get < AliasModel > (AliasModel.NG_NAME);
                this.authVO = new AuthVO();
                _.bindAll(this, 'clearAll', 'clearAllResponse', 'reject', 'setData', 'setCookie', 'removeCookie');
            }

            private clearAll() {
                this.authVO.invalidateData();
                this.aliasModel.invalidateAlias();
            }

            private clearAllResponse(response): IPromise < any > {
                this.clearAll();
                return response;
            }

            private reject(response): IPromise < any > {
                this.clearAll();
                return response;
            }

            private setData(data: IAuthVO): IAuthVO {
                this.authVO.parseData(data);
                this.aliasModel.getCurrentAlias(data.currentAlias);
                return data;
            }

            private setCookie(data: IAuthVO): IAuthVO {
                if (this.rememberMe) {
                    this.$cookies.put(ServerConst.COOKIE_TOKEN_KEY, data.authToken);
                }
                return this.setData(data);
            }

            private removeCookie(response): IPromise < any > {
                this.$cookies.remove(ServerConst.COOKIE_TOKEN_KEY);
                return this.reject(response);
            }

            login(email, password, rememberMe): IPromise < any > {
                this.rememberMe = rememberMe;
                return this.authDAO.login(email, password).then(
                    this.setCookie, this.reject);
            }

            tokenLogin(): IPromise < any > {
                var token = this.$cookies.get(ServerConst.COOKIE_TOKEN_KEY);
                this.rememberMe = true;
                if (token) {
                    return this.authDAO.tokenLogin(this.authVO.authToken).then(
                        this.setCookie,
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
                    return this.authDAO.logout(this.authVO._id).finally(this.clearAll);
                } else {
                    return this.$q.reject('Cannot log out if not logged in.');
                }
            }

            currentUser(): AuthVO {
                return this.authVO;
            }

            isLoggedIn(): boolean {
                return this.authVO._id !== undefined;
            }
        }
    }
}