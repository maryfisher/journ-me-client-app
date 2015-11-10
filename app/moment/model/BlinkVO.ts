module jm.moment {

    import ServerConst = jm.common.ServerConst;

    export interface IBlinkVO {
        id: string;
        format: number;
        images: string[];
        imageUrls: string[];
        texts: string[];
        index: number;
        moment: string;
        ratio: number;
        states: IStateVO[];
    }

    export class BlinkVO implements IBlinkVO {

        id: string;
        format: number;
        images: string[];
        imageUrls: string[];
        texts: string[];
        index: number;
        moment: string;
        ratio: number;
        states: IStateVO[];

        constructor(data ?: IBlinkVO) {
            this.states = [];
            this.texts = [];
            this.images = [];
            this.format = 0;
            this.index = 0;
            this.parseJson(data);
        }

        parseJson(data: IBlinkVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.imageUrls = [];
                for (var i: number = 0; i < this.images.length; i++) {
                    this.imageUrls[i] = ServerConst.BLINK_IMG_PATH + this.images[i];
                }
            }
        }
    }
}