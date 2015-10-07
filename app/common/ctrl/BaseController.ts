module jm {
    export module common {
        export class BaseController {

            constructor(private $baseScope: ng.IScope) {

            }

            addScopeMethod(methodName: string) {
                _.bindAll(this, methodName);
                this.$baseScope[methodName] = this[methodName];
            }
        }
    }
}