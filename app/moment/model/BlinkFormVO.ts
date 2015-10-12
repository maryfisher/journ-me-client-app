/// <reference path="BlinkVO.ts" />
module jm.moment {
    export class BlinkFormVO {
        imageFiles: File[] = [];
        blink: BlinkVO;

        constructor(data ? : BlinkVO) {
            if(data){
                this.blink = data;
            }
        }
    }
}