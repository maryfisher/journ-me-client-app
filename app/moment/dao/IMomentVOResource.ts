module jm.moment {
    export interface IMomentVOResource extends IMomentDetailVO {
        $promise: ng.IPromise < IMomentDetailVO > ;
        $resolved: boolean;
    }
}