module jm.moment {
    export class MomentDetailVO extends MomentBaseVO {

        empathies: IEmpathyVO[] = [];
        blinks: string[] = [];

        constructor(data ? : IMomentDetailVO) {
            super(data);
            if (data) {
                this.parseDetailData(data);
            }
        }

        parseDetailData(data: IMomentDetailVO) {
            this.parseBaseData(data);
            this.addEmpathies(data.empathies);
            this.blinks = data.blinks || this.blinks;
        }

        addEmpathies(data: IEmpathyVO[]) {
            this.empathies.length = 0;
            for (var i: number = 0; i < data.length; i++) {
                this.empathies.push(new EmpathyVO(data[i]));
            }
        }

        invalidateData() {
            super.invalidateData();
            this.empathies.length = 0;
            this.blinks.length = 0;
        }
    }
}