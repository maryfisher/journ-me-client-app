module jm.moment {
    'use strict';

    import IResourceService = angular.resource.IResourceService;
    import IResourceClass = angular.resource.IResourceClass;
    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;
    import IUploadService = angular.angularFileUpload.IUploadService;
    import IUploadPromise = angular.angularFileUpload.IUploadPromise;
    import IFileProgressEvent = angular.angularFileUpload.IFileProgressEvent;
    import IFileUploadConfig = angular.angularFileUpload.IFileUploadConfig;

    export class BlinkDAO extends jm.common.BaseDAO {

        static NG_NAME: string = 'blinkDAO';

        private blinkDAO: IResourceClass < any > ;
        private Upload: IUploadService;

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            var $resource = $injector.get < IResourceService > (NGConst.$RESOURCE);
            this.Upload = $injector.get < IUploadService > (NGConst.UPLOAD);
            this.blinkDAO = $resource < any > (
                ServerConst.BLINK_ID_PATH
            );
        }

        getBlinkByIndex(momentId: string, index: number): IPromise <IBlinkVO>{
            return this.blinkDAO.get({
                momentId: momentId,
                index: index
            }).$promise;
        }

        getBlink(id: string): IPromise <IBlinkVO>{
            return this.blinkDAO.get({
                blinkId: id
            }).$promise;
        }

        getBlinks(momentId: string): IPromise < IBlinkVO[] > {
            return this.blinkDAO.query({
                momentId: momentId
            }).$promise;
        }

        createBlink(images: File[], blink:BlinkVO): IUploadPromise < any > {
            return this.uploadBlink(images, blink, ServerConst.BLINK_PATH);
        }

        updateBlink(images: File[], blink:BlinkVO): IUploadPromise < any > {
            return this.uploadBlink(images, blink, ServerConst.BLINK_PATH + blink._id);
        }

        uploadBlink(imageFiles: File[], blink:BlinkVO, url: string): IUploadPromise < any > {
            //TODO several images
            return this.Upload.upload(<IFileUploadConfig>{
                url: url,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                fields: {
                    blink: blink
                },
                file: imageFiles[0],
                method: null
            });
        }
    }
}