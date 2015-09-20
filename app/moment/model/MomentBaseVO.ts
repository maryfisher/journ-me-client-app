module jm.moment {
    export class MomentBaseVO {

        _id: string;
        descript: string;
        isAlias: boolean;
        alias: string;
        journey: string;
        created: string;

        constructor(data ? : IMomentBaseVO) {
            if (data) {
                this.parseData(data);
            }
        }

        parseData(data: IMomentBaseVO) {
            this._id = data._id;
            this.descript = data.descript;
            this.alias = data.alias;
            this.journey = data.journey;
            this.created = data.created;
        }

        invalidateData() {
            this._id = undefined;
            this.descript = undefined;
            this.alias = undefined;
            this.journey = undefined;
            this.created = undefined;
            this.isAlias = false;
        }
    }
}