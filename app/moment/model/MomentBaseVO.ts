module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IMomentBaseVO {
        id: string;
        alias: string;
        journey: string;
        date: string|Date;
        isPublic: boolean;

        isAlias: boolean;
    }

    export class MomentBaseVO implements IMomentBaseVO {

        id: string;
        alias: string;
        journey: string;
        date: string|Date;
        isPublic: boolean;

        isAlias: boolean;

        constructor(data ?: IMomentBaseVO) {
            this.setDefault();
            this.parseJson(data);
        }

        setDefault() {
            this.isPublic = true;
            this.date = new Date();
            this.isAlias = false;
        }

        parseJson(data: IMomentBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.date = new Date(<string>data.date);
            }
        }

        invalidateData() {
            this.id = undefined;
            this.alias = undefined;
            this.journey = undefined;
            this.setDefault();
        }

        updateAlias(alias: AliasBaseVO) {
            this.isAlias = this.alias === alias.id;
        }
    }
}