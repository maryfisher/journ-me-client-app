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

        createBlink(blinkForm: BlinkFormVO): IUploadPromise < IBlinkVO > {
            return this.uploadBlink(blinkForm, ServerConst.BLINK_PATH);
            /*return this.blinkDAO.save({}, {
             blink: blink
             }).$promise;*/
        }

        updateBlink(blinkForm: BlinkFormVO): IUploadPromise < IBlinkVO > {
            return this.uploadBlink(blinkForm, ServerConst.BLINK_PATH + blinkForm._id);
            /*return this.blinkDAO.save({
                    blinkId: blink._id
                },
                blink
            ).$promise;*/
        }

        uploadBlink(blinkForm: BlinkFormVO, url: string): IUploadPromise < IBlinkVO > {
            var blink: BlinkVO = new BlinkVO(blinkForm);
            //TODO several images
            return this.Upload.upload<IBlinkVO>(<IFileUploadConfig>{
                url: url,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                fields: {
                    blink: blink
                },
                file: blinkForm.imageFiles[0],
                method: null
            });
        }
    }
}