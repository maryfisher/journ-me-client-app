///<reference path="..\..\common\const\ServerConst.ts"/>
module jm.note {

    import ServerConst = jm.common.ServerConst;

    export interface INoteVO {
        id: string;
        type: string;
        text: string;
        image: string;
    }

    export class NoteVO {

        id: string;
        type: string;
        text: string;
        image: string;
        imageUrl: string;

        constructor(data ?: INoteVO) {
            this.parseJson(data);
        }

        parseJson(data: INoteVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.createUrls();
            }
        }

        createUrls() {
            this.imageUrl = this.image ? ServerConst.NOTE_IMG_PATH + this.image : '';
        }
    }
}