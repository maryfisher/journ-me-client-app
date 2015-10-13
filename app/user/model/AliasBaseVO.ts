module jm.user {

    export class AliasBaseVO implements IAliasBaseVO {
        _id: string;
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
            this._id = undefined;
            this.name = undefined;
            this.image = undefined;
        }
    }
}