import { LightswitchClient, Switch } from './api-client';
import React from 'react';
declare type Props = {
    lightswitchClient: LightswitchClient;
};
declare const getSwitches: (keys?: string[] | undefined) => Switch[] | undefined;
declare const getSwitch: (key: string) => Switch | undefined;
declare const LightswitchContext: React.Context<{
    lightswitches?: Switch[] | undefined;
    lightswitchClient?: LightswitchClient | undefined;
}>;
declare const LightswitchProvider: React.FC<Props>;
export { getSwitches, getSwitch, LightswitchContext, LightswitchProvider, LightswitchClient };
