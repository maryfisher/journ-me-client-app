module jm {
    export module user {
        'use strict';

        import IResourceService = angular.resource.IResourceService;
        import IResourceClass = angular.resource.IResourceClass;
        import ServerConst = jm.common.ServerConst;
        import NGConst = jm.common.NGConst;

        export class AliasDAO extends jm.common.BaseDAO {

            static NG_NAME: string = 'aliasDAO';

            private aliasDAO: IResourceClass < IAliasVOResource > ;

            constructor($injector: ng.auto.IInjectorService) {
                super($injector);
                var $resource = $injector.get < IResourceService > (NGConst.$RESOURCE);
                this.aliasDAO = $resource < IAliasVOResource > (
                    ServerConst.ALIAS_ID_PATH
                );
            }

            getAlias(aliasId): IAliasVOResource {
                return this.aliasDAO.get({
                    aliasId: aliasId
                });
            }
        }
    }
}