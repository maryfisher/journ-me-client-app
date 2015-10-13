module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export class MomentBaseVO implements IMomentBaseVO {

        _id: string;
        isAlias: boolean;
        alias: string;
        journey: string;
        created: string;
        isPublic: boolean = true;

        constructor(data ?: IMomentBaseVO) {
            this.parseJson(data);
        }

        parseJson(data: IMomentBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
        }

        invalidateData() {
            this._id = undefined;
            this.alias = undefined;
            this.journey = undefined;
            this.created = undefined;
            this.isAlias = false;
            this.isPublic = true;
        }

        updateAlias(alias: AliasBaseVO) {
            this.isAlias = this.alias === alias._id;
        }
    }
}