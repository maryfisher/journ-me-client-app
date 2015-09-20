module jm {
    export module journey {
        export interface IJourneyVOResource extends IJourneyDetailVO {
            $promise: angular.IPromise < IJourneyDetailVO > ;
            $resolved: boolean;
        }
    }
}