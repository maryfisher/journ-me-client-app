module jm.moment {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = ng.IPromise;
    import IUploadService = angular.angularFileUpload.IUploadService;
    import IUploadPromise = angular.angularFileUpload.IUploadPromise;
    import IFileProgressEvent = angular.angularFileUpload.IFileProgressEvent;

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
            var mediaFileCount: number = mapFormatToFileCout(blink.format);

            images = images || [];
            for (var k: number = 0; k < images.length; k++) {
                // case where user did not select a new file for 1st image but a subsequent image
                // must pad the skipped array locations with null
                images[k] = images[k] ? images[k] : null;
            }

            if (mediaFileCount > images.length) {
                // case where blink format allows n file uploads but fewer have been selected by the user
                // must pad out the remaining array locations with null
                for (var j: number = mediaFileCount - images.length; j > 0; j--) {
                    images.push(null);
                }

            }

            return this.uploadBlink(images, blink, ServerConst.BLINK_PATH + blink.id);
        }

        uploadBlink(imageFiles: File[], blink: BlinkVO, url: string): IUploadPromise < any > {
            return this.Upload.upload({
                url: url,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    blink: this.Upload.json(blink),
                    file: imageFiles
                },
                arrayKey: '',
                method: null
            });
        }
    }

    function mapFormatToFileCout(format: BlinkFormat): number {
        switch (format) {
            case BlinkFormat.DOUBLE_IMAGE:
                return 2;
                break;
            case BlinkFormat.RIGHT_IMAGE:
            case BlinkFormat.LEFT_IMAGE:
            case BlinkFormat.VIDEO:
            case BlinkFormat.SINGLE_IMAGE:
                return 1;
                break;
            case BlinkFormat.SINGLE_TEXT:
            case BlinkFormat.DOUBLE_TEXT:
            default:
                return 0;
                break;
        }
    }
}