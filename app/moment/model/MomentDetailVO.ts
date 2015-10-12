module jm.moment {
    export class MomentDetailVO extends MomentBaseVO implements IMomentDetailVO {

        empathies: IEmpathyVO[] = [];
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
            this.addEmpathies(data.empathies);
        }

        addEmpathies(data: IEmpathyVO[]) {
            this.empathies = [];
            for (var i: number = 0; i < data.length; i++) {
                var e: EmpathyVO = new EmpathyVO(data[i]);
                e.parseJson(data[i]);
                this.empathies.push(e);
            }
        }

        invalidateData() {
            super.invalidateData();
            this.empathies.length = 0;
            this.blinks.length = 0;
            this.currentBlink = undefined;
        }
    }
}