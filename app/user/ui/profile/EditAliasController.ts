module jm.user.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export interface IEditAliasScope extends ng.IScope {
        alias: AliasDetailVO;
        file: File;
        upload();
    }

    export class EditAliasController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE, AliasModel.NG_NAME];

        constructor(private $scope: IEditAliasScope, private aliasModel: AliasModel) {
            super($scope);
            $scope.alias = this.aliasModel.getCurrentAlias();
            this.addScopeMethods('saveChanges');
        }

        saveChanges = () => {
            //TODO
            if (this.$scope.file) { // && !this.$scope.file.$error) {
                this.upload(this.$scope.file);
            }
        }

        upload = (file: File) => {
            this.aliasModel.updateAlias(file);
        }
    }
}