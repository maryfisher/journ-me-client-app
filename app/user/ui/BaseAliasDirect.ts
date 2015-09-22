module jm.user {

    export interface IBaseAliasScope extends ng.IScope {
        alias: AliasBaseVO;
        aliasStr: string;
    }

    export class BaseAliasDirect implements ng.IDirective {

        scope: any;

        constructor(attrName: string) {
            this.scope = {
                aliasStr: attrName
            };
        }

        parseAlias(scope: IBaseAliasScope) {
            if (scope.aliasStr) {
                scope.alias = JSON.parse(scope.aliasStr);
            }
        }
    }
}