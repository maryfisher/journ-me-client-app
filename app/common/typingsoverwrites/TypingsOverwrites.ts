declare module angular.angularFileUpload {

    interface IUploadService {

        http<T>(config: IRequestConfig): IUploadPromise<T>;
        upload<T>(config: IFileUploadConfigFiles|IFileUploadConfigFile): IUploadPromise<T>;
        json(obj: any): string;
    }

    interface IUploadPromise<T> extends IHttpPromise<T> {
        abort(): IUploadPromise<T>;
        progress(callback: IHttpPromiseCallback<T>): IUploadPromise<T>;
        xhr(callback: IHttpPromiseCallback<T>): IUploadPromise<T>;
    }

    interface IFileUploadConfigFile extends IRequestConfig {
        data: {
            blink?: {},
            alias?: {},
            file: File
        };
    }

    interface IFileUploadConfigFiles extends IRequestConfig {

        data: {
            blink?: {},
            alias?: {},
            file: File[]
        };
        arrayKey: string;
    }

    interface IFilesProgressEvent extends ProgressEvent {

        config: IFileUploadConfigFiles;
    }

    interface IFileProgressEvent extends ProgressEvent {

        config: IFileUploadConfigFile;
    }
}