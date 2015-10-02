module jm.moment {
    export interface IBlinkVO {
        _id: string;
        format: number;
        images: string[];
        texts: string[];
        index: number;
        moment: string;
        ratio: number;
    }
}