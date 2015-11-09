///<reference path="..\..\user\model\AliasBaseVO.ts"/>
module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IMomentDetailVO extends IMomentBaseVO {
        states: StateCountVO[];
        feedback: IFeedbackVO[];
        blinks: string[];

        statesCount: Object;
    }

    export class MomentDetailVO extends MomentBaseVO implements IMomentDetailVO {

        states: StateCountVO[] = [];
        feedback: IFeedbackVO[] = [];
        blinks: string[] = [];

        currentBlink: BlinkVO;
        statesCount: Object; //StateVO.id => StateCountVO

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
            this.parseFeedback(data.feedback);
        }

        parseFeedback(data: IFeedbackVO[]) {
            this.feedback = [];
            this.statesCount = {};
            this.states = [];
            if (!data) {
                return;
            }
            for (var i: number = 0; i < data.length; i++) {
                this.addFeedback(data[i]);
            }
        }

        addFeedback(data: IFeedbackVO) {
            var f: FeedbackVO = new FeedbackVO(data);
            this.feedback.push(f);
            for (var j: number = 0; j < f.states.length; j++) {
                var s: IStateVO = f.states[j];
                var c: StateCountVO = this.statesCount[s.id];
                if (!c) {
                    c = this.statesCount[s.id] = new StateCountVO(s);
                    this.states.push(c);
                    if (this.isAlias) {
                        c.isAlias = true;
                    }
                }
                c.addToState();
            }
        }

        updateAlias(alias: AliasBaseVO) {
            super.updateAlias(alias);
            if (this.isAlias) {
                return;
            }
            for (var j: number = 0; j < this.feedback.length; j++) {
                var f: IFeedbackVO = this.feedback[j];
                if (f.body) {
                    continue;
                }
                if (f.alias.id === alias.id) {
                    for (var i: number = 0; i < f.states.length; i++) {
                        var c: StateCountVO = this.statesCount[f.states[i].id];
                        c.isAlias = true;
                    }
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