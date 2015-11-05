module jm.user {

    import ServerConst = jm.common.ServerConst;

    export interface IAliasBaseVO {
        id: string;
        name: string;
        image: string;
        imageUrl: string;
        thumbUrl: string;
    }

    export class AliasBaseVO implements IAliasBaseVO {
        id: string;
        name: string;
        image: string;
        imageUrl: string;
        thumbUrl: string;

        constructor(data ?: IAliasBaseVO) {
            this.parseJson(data);
        }

        parseJson(data: IAliasBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.imageUrl = this.image ? ServerConst.ALIAS_IMG_PATH + this.image : '';
                this.thumbUrl = this.image ? this.imageUrl + ServerConst.THUMB : '';
            }
        }

        invalidateData() {
            this.id = undefined;
            this.name = undefined;
            this.image = undefined;
            this.imageUrl = undefined;
            this.thumbUrl = undefined;
        }
    }
}