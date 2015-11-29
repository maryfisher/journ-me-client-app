///<reference path="..\..\common\const\ServerConst.ts"/>
///<reference path="StateRefVO.ts"/>
module jm.moment {

    import ServerConst = jm.common.ServerConst

    export const enum BlinkFormat {
        RIGHT_IMAGE,
        LEFT_IMAGE,
        DOUBLE_TEXT,
        SINGLE_TEXT,
        VIDEO,
        SINGLE_IMAGE,
        DOUBLE_IMAGE
    }

    export interface IBlinkVO extends IStateRefVO {
        id: string;
        format: BlinkFormat;
        images: string[];
        imageUrls: string[];
        texts: string[];
        index: number;
        moment: string;
        ratio: number;
    }

    export class BlinkVO extends StateRefVO implements IBlinkVO {

        id: string;
        format: BlinkFormat;
        images: string[];
        imageUrls: string[];
        texts: string[];
        index: number;
        moment: string;
        ratio: number;

        constructor(data ?: IBlinkVO, refs ?: Object) {
            super();
            this.texts = [];
            this.images = [];
            this.format = BlinkFormat.RIGHT_IMAGE;
            this.index = 0;
            this.parseData(data, refs);
        }

        parseData(data: IBlinkVO, refs: Object) {
            if (data) {
                super.parseData(data, refs);
                this.id = data.id;
                this.format = data.format;
                this.images = data.images;
                this.texts = data.texts;
                this.index = data.index;
                this.moment = data.moment;
                this.ratio = data.ratio;
                this.imageUrls = [];
                for (var i: number = 0; i < this.images.length; i++) {
                    this.imageUrls[i] = ServerConst.BLINK_IMG_PATH + this.images[i];
                }
            }
        }
    }
}