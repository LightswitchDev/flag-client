import base64 from 'base-64';

const BASE_URL = 'http://localhost:4000';

export type Variant = {
    id: string;
    value: string;
};

export type Switch = {
    id: string;
    key: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    enabled: boolean;
    variants: Variant[];
};

export type LightswitchConfig = {
    clientId: string;
    apiKey: string;
    frequencyInSeconds?: number;
};

export class LightswitchClient {
    private _authString: string;
    private _lightswitches: Switch[] = [];
    private _subscribers: ((lightswitches: Switch[]) => void)[] = [];
    constructor(config: LightswitchConfig) {
        const { clientId, apiKey, frequencyInSeconds = 5 * 60 } = config;
        this._authString = `${clientId}:${apiKey}`;
        setInterval(this._setSwitches, frequencyInSeconds * 1000);
    }

    subscribe = (onUpdate: (lightSwitches: Switch[]) => void) => {
        this._subscribers?.push(onUpdate);
    };

    getSwitch = (key: string) => {
        return this._lightswitches.find(lightswitch => lightswitch.key === key);
    };

    getSwitches = (keys?: string[]) => {
        return keys
            ? this._lightswitches.filter(lightswitch => keys.some(key => key === lightswitch.key))
            : this._lightswitches;
    };

    private _setSwitches = () => {
        this._getSwitches()
            .then(switches => {
                this._lightswitches = switches;
                console.log('set', switches);
                this._subscribers.forEach(onUpdate => onUpdate(switches));
            })
            .catch(console.error);
    };

    private _getSwitches = async () => {
        const res = await fetch(`${BASE_URL}/switches`, {
            headers: new Headers({
                Authorization: `Basic ${base64.encode(this._authString)}`,
            }),
        });
        if (res.status === 403) throw new Error(`Authentication error with Lightswitch Server`);
        if (res.status >= 400) throw new Error('Server Error');
        const data: { lightswitches: Switch[] } = await res.json();
        console.log(data);
        return data.lightswitches;
    };
}
