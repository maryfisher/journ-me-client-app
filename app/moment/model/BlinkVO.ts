module jm.moment {
    export class BlinkVO {

        _id: string;
        format: number = 0;
        images: string[] = [];
        texts: string[] = [];
        index: number = 0;
        moment: string;
        ratio: number;

        constructor(data ? : IBlinkVO) {
            if (data) {
                this.parseData(data);
            }
        }

        parseData(data: IBlinkVO) {
            this.format = data.format;
            this.images = data.images;
            this.texts = data.texts;
            this.index = data.index;
            this.moment = data.moment;
            this.ratio = data.ratio;
            this._id = data._id;
        }
    }
}