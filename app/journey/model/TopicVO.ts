module jm.journey {
    export interface ITopicVO {
        id: string;
        tag: string;
        count: number;
        categoryWeight: Object; //CategoryVO.id => weight
    }
}
