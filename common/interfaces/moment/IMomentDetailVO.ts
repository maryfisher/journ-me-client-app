module jm.moment {
    export interface IMomentDetailVO extends IMomentBaseVO {
        empathies: IEmpathyVO[];
        blinks: IBlinkVO[];
    }
}