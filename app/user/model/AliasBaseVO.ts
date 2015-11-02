module jm.user {

    import ServerConst = jm.common.ServerConst;

    export interface IAliasBaseVO {
        id: string;
        name: string;
        image: string;
        thumb: string;
    }

    export class AliasBaseVO implements IAliasBaseVO {
        id: string;
        name: string;
        image: string;
        thumb: string;

        constructor(data ?: IAliasBaseVO) {
            this.parseJson(data);
        }

        parseJson(data: IAliasBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.image = ServerConst.ALIAS_IMG_PATH + this.image;
                this.thumb = this.image + ServerConst.THUMB;
            }
        }

        invalidateData() {
            this.id = undefined;
            this.name = undefined;
            this.image = undefined;
            this.thumb = undefined;
        }
    }
}