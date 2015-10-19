///<reference path="..\..\moment\model\BlinkFormatVO.ts"/>
module jm.common {

    import BlinkFormatVO = jm.moment.BlinkFormatVO;

    export class BlinkFormatConst {
        static FORMAT_0: BlinkFormatVO = new BlinkFormatVO(1, 1);
        static FORMAT_1: BlinkFormatVO = new BlinkFormatVO(1, 1);
        static FORMAT_2: BlinkFormatVO = new BlinkFormatVO(2, 0);
        static FORMAT_3: BlinkFormatVO = new BlinkFormatVO(1, 0);
        static FORMAT_4: BlinkFormatVO = new BlinkFormatVO(0, 0);
        static FORMAT_5: BlinkFormatVO = new BlinkFormatVO(0, 1);
        static FORMAT_6: BlinkFormatVO = new BlinkFormatVO(0, 2);

        static getFormat(f: number): BlinkFormatVO {
            return BlinkFormatConst['FORMAT_' + f];
        }
    }
}