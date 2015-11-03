module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IMomentBaseVO {
        id: string;
        alias: string;
        journey: string;
        created: string;
        isPublic: boolean;

        isAlias: boolean;
    }

    export class MomentBaseVO implements IMomentBaseVO {

        id: string;
        alias: string;
        journey: string;
        created: string;
        isPublic: boolean = true;

        isAlias: boolean;

        constructor(data ?: IMomentBaseVO) {
            this.parseJson(data);
        }

        parseJson(data: IMomentBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
        }

        invalidateData() {
            this.id = undefined;
            this.alias = undefined;
            this.journey = undefined;
            this.created = undefined;
            this.isAlias = false;
            this.isPublic = true;
        }

        updateAlias(alias: AliasBaseVO) {
            this.isAlias = this.alias === alias.id;
        }
    }
}