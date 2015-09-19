module jm {
    export module user {
        'use strict';

        export class AliasModel {

            static NG_NAME: string = 'aliasModel';

            private currentAlias: AliasVO;

            constructor($injector: ng.auto.IInjectorService) {}

            invalidateAlias() {

            }

            getCurrentAlias(id ? : string) {
                return this.currentAlias;
            }
        }
    }
}