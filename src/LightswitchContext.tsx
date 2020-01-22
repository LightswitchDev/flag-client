import { LightswitchClient, Switch } from './api-client';
import { useState, createContext, useContext } from 'react';
import React from 'react';

type Props = {
    lightswitchClient: LightswitchClient;
};

const getSwitches = (keys?: string[]) => {
    const { lightswitchClient } = useContext(LightswitchContext);
    return lightswitchClient?.getSwitches(keys);
};

const getSwitch = (key: string) => {
    const { lightswitchClient } = useContext(LightswitchContext);
    return lightswitchClient?.getSwitch(key);
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

export { getSwitches, getSwitch, LightswitchContext, LightswitchProvider, LightswitchClient };
