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
                this.showElm = attrs[LoggedInDirect.NG_NAME] === 'true';
                this.element = element;
                //This is not working for some reason
                //scope.$watch(this.isLoggedIn, this.animateClass);
                //so for now it stays ugly
                var authModel = this.authModel;
                var $animate = this.$animate;
                var showElm = this.showElm;
                scope.$watch(function () {
                    return authModel.isLoggedIn();
                }, function () {
                    var remove = (authModel.isLoggedIn() && !showElm) || (!authModel.isLoggedIn() && showElm);
                    $animate[remove ? 'addClass' : 'removeClass'](element, 'ng-hide', {
                        tempClasses: 'ng-hide-animate'
                    })
                });
            }

            isLoggedIn() {
                return this.authModel.isLoggedIn();
            }

            animateClass() {
                console.log(this.element);
                var remove = (this.authModel.isLoggedIn() && !this.showElm) || (!this.authModel.isLoggedIn() && this.showElm);
                this.$animate[remove ? 'addClass' : 'removeClass'](this.element, 'ng-hide', {
                    tempClasses: 'ng-hide-animate'
                })
            }

            constructor($injector: ng.auto.IInjectorService) {
                this.authModel = $injector.get < AuthModel > (AuthModel.NG_NAME);
                this.$animate = $injector.get < IAnimateService > (NGConst.$ANIMATE);

                _.bindAll(this, 'isLoggedIn');
                _.bindAll(this, 'animateClass');
            }
        }
    }
}