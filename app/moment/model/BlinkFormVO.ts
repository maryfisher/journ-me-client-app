/// <reference path="BlinkVO.ts" />
module jm.moment {
    export class BlinkFormVO extends BlinkVO {
        imageFiles: File[] = [];

        constructor(data ? : IBlinkVO) {
            super(data);
        }
    }
}