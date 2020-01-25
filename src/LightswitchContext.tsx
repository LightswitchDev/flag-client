import { LightswitchClient, Switch } from './api-client';
import { useState, createContext, useContext } from 'react';
import React from 'react';

type Props = {
    lightswitchClient: LightswitchClient;
};

const useSwitches = (keys: string[], defaultValues: any[]) => {
    const { lightswitchClient } = useContext(LightswitchContext);
    const lightswitches = lightswitchClient?.getSwitches(keys);

    return keys.reduce((values, key, i) => {
        const lightswitch = lightswitches?.find(lightswitch => lightswitch.key === key);
        const defaultValue = defaultValues[i];
        values[key] = _evaluateSwitch(lightswitch, defaultValue);
        return values;
    }, {});
};

const _evaluateSwitch = (lightswitch: Switch | undefined = undefined, defaultValue: any) => {
    if (lightswitch?.type === 'Boolean') {
        return lightswitch.enabled;
    } else {
        return defaultValue;
    }
};
const useSwitch = (key: string, defaultValue: any) => {
    const { lightswitchClient } = useContext(LightswitchContext);
    const lightswitch = lightswitchClient?.getSwitch(key);
    return _evaluateSwitch(lightswitch, defaultValue);
};

const LightswitchContext = createContext<{ lightswitches?: Switch[]; lightswitchClient?: LightswitchClient }>({});

const { Provider } = LightswitchContext;
const LightswitchProvider: React.FC<Props> = ({ lightswitchClient, children }) => {
    const initialSwitches = lightswitchClient?.getSwitches();
    const [lightswitches, setSwitches] = useState(initialSwitches);
    lightswitchClient.subscribe(lightswitches => {
        console.log('subscribe', lightswitches);
        setSwitches(lightswitches);
    });
    return <Provider value={{ lightswitches, lightswitchClient }}>{children}</Provider>;
};

export { useSwitches, useSwitch, LightswitchContext, LightswitchProvider, LightswitchClient };
