///<reference path="..\..\user\model\AliasBaseVO.ts"/>
///<reference path="FeedbackVO.ts"/>
///<reference path="BlinkVO.ts"/>
///<reference path="StateCountVO.ts"/>
module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IMomentDetailVO extends IMomentBaseVO {
        feedback: FeedbackVO[];
        blinks: string[];
    }

    export class MomentDetailVO extends MomentBaseVO implements IMomentDetailVO {

        feedback: FeedbackVO[];
        blinks: string[];

        currentBlink: BlinkVO;
        stateCounts: StateCountVO[];

        private stateCountRefs: Object; //StateVO.id => StateCountVO

        constructor(data ?: IMomentDetailVO) {
            this.feedback = [];
            this.blinks = [];
            this.stateCountRefs = {};
            this.stateCounts = [];
            super(data);
        }

        parseJson(data: IMomentDetailVO, refs ?: Object) {
            super.parseJson(data);
            this.parseDetailData(data, refs);
        }

        private parseDetailData(data: IMomentDetailVO, refs ?: Object) {
            if (!data) {
                return;
            }
            this.parseFeedback(data.feedback, refs);
        }

        parseFeedback(data: IFeedbackVO[], refs ?: Object) {
            this.feedback = [];
            if (!data || !refs) {
                return;
            }
            for (var i: number = 0; i < data.length; i++) {
                this.addFeedback(data[i], refs);
            }
        }

        addFeedback(data: IFeedbackVO, refs: Object) {
            var f: FeedbackVO = new FeedbackVO(data);
            this.feedback.push(f);
            for (var j: number = 0; j < f.states.length; j++) {
                var s: IStateVO = refs[f.states[j]];
                f.stateRefs.push(s);
                var c: StateCountVO = this.stateCountRefs[s.id];
                if (!c) {
                    c = this.stateCountRefs[s.id] = new StateCountVO(s);
                    this.stateCounts.push(c);
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
                var f: FeedbackVO = this.feedback[j];
                if (f.body) {
                    continue;
                }
                if (f.alias.id === alias.id) {
                    for (var i: number = 0; i < f.states.length; i++) {
                        var c: StateCountVO = this.stateCountRefs[f.states[i]];
                        c.isAlias = true;
                    }
                }
            }
        }

        invalidateData() {
            super.invalidateData();
            this.feedback.length = 0;
            this.stateCountRefs = {};
            this.stateCounts.length = 0;
            this.blinks.length = 0;
            this.currentBlink = undefined;
        }
    }
}