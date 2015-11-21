module jm.journey {
    'use strict';

    export interface IJourneySearchFilter {
        text: string,
        textMatcher: any,
        join: any,
        joinMatcher: any,
        categories: string[],
        categoriesMatcher: any,
        topics: string[],
        topicsMatcher: any,
        selectedTopic: string
    }
}