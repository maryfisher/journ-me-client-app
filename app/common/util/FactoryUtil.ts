module jm {
    export module common {

        import IInjectorService = ng.auto.IInjectorService;

        export class FactoryUtil {
            static getDirective < T extends ng.IDirective > (classType: {
                new($injector: IInjectorService): T
            }): ng.IDirectiveFactory {

                var factory = ($injector: IInjectorService): T => {
                    return new classType($injector);
                }
                factory.$inject = ['$injector'];
                return factory;
            }

            static getFactory < T > (classType: {
                new($injector: IInjectorService): T
            }): any {

                var factory = ($injector: IInjectorService): T => {
                    return new classType($injector);
                }
                factory.$inject = ['$injector'];
                return factory;
            }
        }
    }
}