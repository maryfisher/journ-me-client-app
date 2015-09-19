module jm {
    export module auth {

        import IAnimateService = ng.IAnimateService;
        import NGConst = jm.common.NGConst;

        export class LoggedInDirect implements ng.IDirective {
            static NG_NAME: string = 'jmLoggedInShow';

            private authModel: AuthModel;
            private $animate: IAnimateService;
            private showElm: boolean;
            private element: ng.IAugmentedJQuery;

            restrict: string = 'A';

            link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                var showElm = attrs[LoggedInDirect.NG_NAME] === 'true';

                //This SUCKS - because of class properties being accessed with this 'this' operator
                //scope.$watch(this.isLoggedIn, this.animateClass);
                var authModel = this.authModel;
                var $animate = this.$animate;
                scope.$watch(function () {
                    return authModel.isLoggedIn();
                }, function () {
                    var remove = (authModel.isLoggedIn() && !showElm) || (!authModel.isLoggedIn() && showElm);
                    $animate[remove ? 'addClass' : 'removeClass'](element, 'ng-hide', {
                        tempClasses: 'ng-hide-animate'
                    })
                });
            }

            constructor($injector: ng.auto.IInjectorService) {
                this.authModel = $injector.get < AuthModel > (AuthModel.NG_NAME);
                this.$animate = $injector.get < IAnimateService > (NGConst.$ANIMATE);
            }
        }
    }
}