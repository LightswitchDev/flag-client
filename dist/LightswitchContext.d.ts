import { LightswitchClient, Switch } from './api-client';
import React from 'react';
declare type Props = {
    lightswitchClient: LightswitchClient;
};
declare const useSwitches: (keys: string[], defaultValues: any[]) => {};
declare const useSwitch: (key: string, defaultValue: any) => any;
declare const LightswitchContext: React.Context<{
    lightswitches?: Switch[] | undefined;
    lightswitchClient?: LightswitchClient | undefined;
}>;
declare const LightswitchProvider: React.FC<Props>;
export { useSwitches, useSwitch, LightswitchContext, LightswitchProvider, LightswitchClient };
