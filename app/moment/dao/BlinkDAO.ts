module jm.moment {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = ng.IPromise;
    import IUploadService = angular.angularFileUpload.IUploadService;
    import IUploadPromise = angular.angularFileUpload.IUploadPromise;
    import IFileProgressEvent = angular.angularFileUpload.IFileProgressEvent;
    import IFileUploadConfigFiles = angular.angularFileUpload.IFileUploadConfigFiles;

    export class BlinkDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'blinkDAO';

        private Upload: IUploadService;

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.Upload = $injector.get < IUploadService >(NGConst.UPLOAD);
            this.path = ServerConst.BLINK_PATH;
        }

        returnBlink = (response): IBlinkVO => {
            return response.data;
        };

        getBlink(id: string): IPromise <IBlinkVO> {
            return this.getOne(id, this.returnBlink);
        }

        createBlink(images: File[], blink: BlinkVO, momentId: string): IUploadPromise < any > {
            return this.uploadBlink(images, blink, this.getQueryParams(ServerConst.BLINK_PATH, {'momentId': momentId}));
        }

        updateBlink(images: File[], blink: BlinkVO): IUploadPromise < any > {
            return this.uploadBlink(images, blink, ServerConst.BLINK_PATH + blink.id);
        }

        uploadBlink(imageFiles: File[], blink: BlinkVO, url: string): IUploadPromise < any > {
            //TODO several images
            return this.Upload.upload(<IFileUploadConfigFiles>{
                url: url,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                fields: {
                    blink: blink
                },
                file: imageFiles,
                method: null
            });
        }
    }
}