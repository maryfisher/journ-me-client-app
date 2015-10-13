module jm.common {
    /**
     * Iteratable base class
     */
    export class VOUtil {
        static parseJson(json: any, iterator: any) {
            if (!json) {
                return;
            }
            for (var prop in json) {
                if (!json.hasOwnProperty(prop)) {
                    continue;
                }
                iterator[prop] = json[prop];
            }
        }
    }
}