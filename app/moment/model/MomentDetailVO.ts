module jm.moment {

    export interface IMomentDetailVO extends IMomentBaseVO {
        statesCount: Object;
        states: StateCountVO[];
        feedback: IFeedbackVO[];
        blinks: string[];
    }

    export class MomentDetailVO extends MomentBaseVO implements IMomentDetailVO {

        statesCount: Object; //StateVO._id => StateCountVO
        states: StateCountVO[] = [];
        feedback: IFeedbackVO[] = [];
        blinks: string[] = [];
        currentBlink: BlinkVO;

        constructor(data ?: IMomentDetailVO) {
            super(data);
        }

        parseJson(data: IMomentDetailVO) {
            super.parseJson(data);
            this.parseDetailData(data);
        }

        private parseDetailData(data: IMomentDetailVO) {
            if (!data) {
                return;
            }
            this.addFeedback(data.feedback);
        }

        addFeedback(data: IFeedbackVO[]) {
            this.feedback = [];
            this.statesCount = {};
            this.states = [];
            for (var i: number = 0; i < data.length; i++) {
                var f: FeedbackVO = new FeedbackVO(data[i]);
                this.feedback.push(f);
                for (var j: number = 0; j < f.states.length; j++) {
                    var s: IStateVO = f.states[j];
                    var c: StateCountVO = this.statesCount[s._id];
                    if (!c) {
                        c = this.statesCount[s._id] = new StateCountVO(s);
                        this.states.push(c);
                    }
                    c.addToState();
                }
            }

        }

        invalidateData() {
            super.invalidateData();
            this.feedback.length = 0;
            this.statesCount = {};
            this.blinks.length = 0;
            this.currentBlink = undefined;
        }
    }
}