module jm.user.ctrl {

    import NGConst = jm.common.NGConst;
    import AliasModel = jm.user.AliasModel;

    export interface IAliasListItemScope {
        alias: IAliasBaseVO;
        aliasId: string;
    }

    export class AliasListItemController {

        static NG_NAME: string = 'AliasListItemController';
        static $inject = [NGConst.$SCOPE, AliasModel.NG_NAME];

        constructor(private $scope: IAliasListItemScope, private aliasModel: AliasModel) {
            //TODO - implement a rest call for base alias
            if (!$scope.alias) {
                //$scope.alias = aliasModel.getAlias($scope.aliasId);
            } else {
                //NOTE: sometimes alias is not parsed but used as is from BE
                if (!($scope.alias instanceof AliasBaseVO)) {
                    $scope.alias = new AliasBaseVO($scope.alias);
                }

            }
        }
    }
}