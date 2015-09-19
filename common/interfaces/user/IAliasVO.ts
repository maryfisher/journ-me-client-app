module jm {
    export module user {
        export interface IAliasVO {
            _id: string;
            journeys: any[];
            followedJourneys: any[];
            name: string;
            image: string;
        }
    }
}