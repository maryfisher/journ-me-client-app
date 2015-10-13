module jm.moment {

    export interface IBlinkFormat {
        textsRequired: number;
        imagesRequired: number;
    }

    export class BlinkFormatVO {

        textsRequired: number;
        imagesRequired: number;

        constructor(texts: number = 0, images: number = 0) {
            this.textsRequired = texts;
            this.imagesRequired = images;
        }
    }
}