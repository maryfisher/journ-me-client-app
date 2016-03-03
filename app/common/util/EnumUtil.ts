module jm.common {

    export interface EnumVO {
        name: string;
        value: number;
    }

    export class EnumUtil {
        static filterByNumber(MyEnum: any): number[] {
            return Object.keys(MyEnum)
                .map(v => parseInt(v, 10))
                .filter(v => !isNaN(v));
        }

        static filterByName(MyEnum: any): string[] {
            return Object.keys(MyEnum)
                .filter(v => isNaN(parseInt(v, 10)));
        }

        static getNamesAndValues(e: any): EnumVO[] {
            return EnumUtil.filterByNumber(e).map(v => {
                return {name: e[v] as string, value: v};
            });
        }
    }
}
