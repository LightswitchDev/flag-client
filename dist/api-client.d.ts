export declare type Variant = {
    id: string;
    value: string;
};
export declare type Switch = {
    id: string;
    key: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    enabled: boolean;
    variants: Variant[];
};
export declare type LightswitchConfig = {
    clientId: string;
    apiKey: string;
    frequencyInSeconds?: number;
};
export declare class LightswitchClient {
    private _authString;
    private _lightswitches;
    private _subscribers;
    constructor(config: LightswitchConfig);
    subscribe: (onUpdate: (lightSwitches: Switch[]) => void) => void;
    getSwitch: (key: string) => Switch | undefined;
    getSwitches: (keys?: string[] | undefined) => Switch[];
    private _setSwitches;
    private _getSwitches;
}
