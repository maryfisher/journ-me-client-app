module jm.moment {
    export interface IMomentBaseVO {
        _id: string;
        isAlias: boolean;
        alias: string;
        journey: string;
        created: string;
        isPublic: boolean;
    }
}