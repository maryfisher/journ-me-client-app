module jm.user {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = ng.IPromise;
    import IUploadService = angular.angularFileUpload.IUploadService;
    import IUploadPromise = angular.angularFileUpload.IUploadPromise;

    export class AliasDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'aliasDAO';

        private Upload: IUploadService;

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.Upload = $injector.get < IUploadService >(NGConst.UPLOAD);
            this.path = ServerConst.ALIAS_PATH;
        }

        returnAlias = (response): IAliasDetailVO => {
            return response.data;
        }

        getAlias(aliasId: string): IPromise<IAliasDetailVO> {
            return this.getOne(aliasId, this.returnAlias);
        }

        updateAlias(file: File, alias: AliasBaseVO): IUploadPromise < any > {
            return this.Upload.upload({
                url: ServerConst.ALIAS_PATH + alias.id,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                fields: {
                    alias: alias
                },
                file: file,
                method: null
            })
        }
    }
}