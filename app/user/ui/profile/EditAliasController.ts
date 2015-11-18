///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\const\ErrorConst.ts"/>
///<reference path="..\..\model\AliasDetailVO.ts"/>
///<reference path="..\..\..\common\ctrl\BaseController.ts"/>
///<reference path="..\..\model\AliasModel.ts"/>
module jm.user.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import ErrorConst = jm.common.ErrorConst;

    export interface IEditAliasScope extends ng.IScope {
        alias: AliasDetailVO;
        file: File;
        upload();
        errors: string[];
    }

    export class EditAliasController extends jm.common.BaseController {

        static NG_NAME: string = 'EditAliasController';
        static $inject = [NGConst.$SCOPE, AliasModel.NG_NAME];

        constructor(private $scope: IEditAliasScope, private aliasModel: AliasModel) {
            super($scope);
            $scope.alias = this.aliasModel.getCurrentAlias();
            this.addScopeMethods('saveChanges');

            $scope.errors = [ErrorConst.FILE_TYPE_CORRUPTED_INVALID];
        }

        saveChanges = () => {
            //TODO
            if (this.$scope.file) { // && !this.$scope.file.$error) {
                this.upload(this.$scope.file);
            }
        };

        upload = (file: File) => {
            this.aliasModel.updateAlias(file);
        };
    }
}