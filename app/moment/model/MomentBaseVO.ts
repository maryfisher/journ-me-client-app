module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export class MomentBaseVO {

        _id: string;
        isAlias: boolean;
        alias: string;
        journey: string;
        created: string;
        isPublic: boolean = true;

        constructor(data ? : IMomentBaseVO) {
            if (data) {
                this.parseBaseData(data);
            }
        }

        parseBaseData(data: IMomentBaseVO) {
            this._id = data._id;
            this.alias = data.alias;
            this.journey = data.journey;
            this.created = data.created;
            this.isPublic = data.isPublic;
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