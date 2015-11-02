/// <reference path="../../journey/model/JourneyModel.ts" />
/// <reference path="../../moment/model/MomentModel.ts" />
module jm.user {
    'use strict';

    import JourneyModel = jm.journey.JourneyModel;
    import MomentModel = jm.moment.MomentModel;
    import NGConst = jm.common.NGConst;
    import IUploadService = angular.angularFileUpload.IUploadService;
    import IFileProgressEvent = angular.angularFileUpload.IFileProgressEvent;
    import IFileUploadConfig = angular.angularFileUpload.IFileUploadConfig;

    export class AliasModel {

        static NG_NAME: string = 'aliasModel';

        private currentAlias: AliasDetailVO;
        private aliasService: AliasDAO;
        private journeyModel: JourneyModel;
        private momentModel: MomentModel;
        private Upload: IUploadService;

        constructor($injector: ng.auto.IInjectorService) {
            this.aliasService = $injector.get < AliasDAO >(AliasDAO.NG_NAME);
            this.journeyModel = $injector.get < JourneyModel >(JourneyModel.NG_NAME);
            this.momentModel = $injector.get < MomentModel >(MomentModel.NG_NAME);
            this.Upload = $injector.get < IUploadService >(NGConst.UPLOAD);

            this.currentAlias = new AliasDetailVO();
        }

        private setAlias = (data: IAliasDetailVO) => {
            this.currentAlias.parseJson(data);
            this.journeyModel.refreshJourney(this.currentAlias);
            this.momentModel.refreshMoment(this.currentAlias);
        }

        invalidateAlias() {
            this.currentAlias.invalidateData();
        }

        getCurrentAlias(id ?: string): AliasDetailVO {
            if (id) {
                this.currentAlias.id = id;
                this.aliasService.getAlias(id).then(this.setAlias);
            }
            return this.currentAlias;
        }

        getAlias(id: string): IAliasDetailVO {
            if (id === this.currentAlias.id) {
                return this.currentAlias;
            }
            var alias: AliasDetailVO = new AliasDetailVO();
            this.aliasService.getAlias(id).then(
                (data: IAliasDetailVO) => {
                    alias.parseJson(data);
                }
            )
            return alias;
        }

        updateAlias(file: File) {
            var alias = angular.copy(this.currentAlias);
            alias.image = undefined;
            alias.journeys = undefined;
            alias.followedJourneys = undefined;
            this.Upload.upload({
                url: 'api/user/profile/' + this.currentAlias.id,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                fields: {
                    alias: alias
                },
                file: file,
                method: null
            })
                .progress(this.updateAliasProgress)
                .success(this.updateAliasSuccess)
                .error(this.updateAliasError);
        }

        updateAliasProgress = (evt: IFileProgressEvent) => {
            var progressPercentage: number = 100.0 * evt.loaded / evt.total;
            //console.log('progress: ' + progressPercentage.toString() + '% ' + evt.config.file.name);
        }

        updateAliasSuccess = (data: any, status: number, headers: ng.IHttpHeadersGetter, config: IFileUploadConfig) => {
            this.currentAlias.image = data.image;
            this.currentAlias.name = data.name;
            //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        }

        updateAliasError = (status: number) => {
            //console.log('error status: ' + status);
        }
    }
}