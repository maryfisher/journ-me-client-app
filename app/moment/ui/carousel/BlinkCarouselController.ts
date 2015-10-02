module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;

    export class BlinkCarouselController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE, MomentModel.NG_NAME];

        constructor(private $scope: IBlinkCarouselScope, private momentModel: MomentModel) {
            super($scope);
            this.addScopeMethod('nextBlink');
            this.addScopeMethod('hasNextBlink');
            this.addScopeMethod('prevBlink');
            this.addScopeMethod('hasPrevBlink');
            this.getBlink();
        }

        nextBlink() {
            if(this.hasNextBlink()){
                this.$scope.selectedIndex++;
                this.getBlink();
            }
        }

        prevBlink(){
            if(this.hasPrevBlink()){
                this.$scope.selectedIndex--;
                this.getBlink();
            }
        }

        hasNextBlink(): boolean{
            return this.$scope.selectedIndex < this.$scope.moment.blinks.length - 1;
        }

        hasPrevBlink(): boolean{
            return this.$scope.selectedIndex > 0;
        }

        getBlink(){
            this.$scope.moment.currentBlink = new BlinkVO();
            this.momentModel.getBlinkByIndex(this.$scope.selectedIndex, this.$scope.moment.currentBlink);
        }
    }
}