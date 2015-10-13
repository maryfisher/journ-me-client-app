module jm.moment {

    export interface IMomentDetailVO extends IMomentBaseVO {
        feedback: IFeedbackVO[];
        blinks: string[];
    }

    export class MomentDetailVO extends MomentBaseVO implements IMomentDetailVO {

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
            for (var i: number = 0; i < data.length; i++) {
                var f: FeedbackVO = new FeedbackVO(data[i]);
                this.feedback.push(f);
            }
        }

        invalidateData() {
            super.invalidateData();
            this.feedback.length = 0;
            this.blinks.length = 0;
            this.currentBlink = undefined;
        }
    }
}