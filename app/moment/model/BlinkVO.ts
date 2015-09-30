module jm.moment {
    export class BlinkVO {

        format: number = 0;
        image: string;
        texts: string[] = [];
        index: number = 0;

        constructor(data ? : IBlinkVO) {
            if (data) {
                this.parseData(data);
            }
        }

        parseData(data: IBlinkVO) {
            this.format = data.format;
            this.image = data.image;
            this.texts = data.texts;
            this.index = data.index;
        }
    }
}