module jm.moment {
    export interface IEmpathyVOResource extends IEmpathyVO {
        $promise: ng.IPromise < IEmpathyVO > ;
        $resolved: boolean;
    }
}