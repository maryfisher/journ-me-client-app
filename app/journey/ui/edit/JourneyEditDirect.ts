module jm {
    export module journey {

        export class JourneyEditDirect implements ng.IDirective {

            static NG_NAME: string = 'jmJourneyEdit';

            restrict: string = 'A';
            scope: any = {
                journeyStr: '@?jmJourneyEdit'
            };
            //IMPORTANT
            //the reason we use a controller here is that we want to isolate the scope
            //every directive is only instantiated once and its scope is shared between all directive elements
            //however controller are instantiated for each directive element
            //that means, using one is the only way to get a unique (not shared) scope
            controller: string = 'JourneyEditController';

            constructor($injector: ng.auto.IInjectorService) {}
        }
    }
}