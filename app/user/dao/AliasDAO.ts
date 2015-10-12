module jm.user {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = ng.IPromise;

    export class AliasDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'aliasDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.path = ServerConst.ALIAS_PATH;
        }

        returnAlias = (response): IAliasDetailVO => {
            return response.data;
        }

        getAlias(aliasId: string): IPromise<IAliasDetailVO> {
            return this.getOne(aliasId, this.returnAlias);
        }
    }
}