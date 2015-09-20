module jm {
    export module user {
        export interface IAliasVOResource extends IAliasDetailVO {
            $promise: angular.IPromise < IAliasDetailVO > ;
            $resolved: boolean;
        }
    }
}