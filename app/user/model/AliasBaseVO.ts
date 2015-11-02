module jm.user {

    export interface IAliasBaseVO {
        id: string;
        name: string;
        image: string;
    }

    export class AliasBaseVO implements IAliasBaseVO {
        id: string;
        name: string;
        image: string;

        constructor(data ?: IAliasBaseVO) {
            this.parseJson(data);
        }

        parseJson(data: IAliasBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
        }

        invalidateData() {
            this.id = undefined;
            this.name = undefined;
            this.image = undefined;
        }
    }
}