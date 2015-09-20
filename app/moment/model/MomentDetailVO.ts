module jm.moment {
    export class MomentDetailVO extends MomentBaseVO {
        constructor(data ? : IMomentDetailVO) {
            super(data);
        }

        parseData(data: IMomentDetailVO) {
            super.parseData(data);
        }

        invalidateData() {
            super.invalidateData();
        }
    }
}