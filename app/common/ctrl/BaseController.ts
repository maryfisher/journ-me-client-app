module jm.common {
    export class BaseController {

        constructor(private $baseScope: ng.IScope) {

        }

        addScopeMethods(...methodNames: string[]) {
            for (var i: number = 0; i < methodNames.length; i++) {
                this.$baseScope[methodNames[i]] = this[methodNames[i]];
            }
        }
    }
}