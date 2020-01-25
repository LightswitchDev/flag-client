import React from 'react';

import { LightswitchClient, LightswitchProvider, useSwitch, useSwitches } from '@lightswitch/client';

const client = new LightswitchClient({
    clientId: 'ck5ri3mxo00320rs6cd2p8t3s',
    apiKey: '2a2525d6-82e3-48c2-a98e-69911098e94d',
    frequencyInSeconds: 10, //value just for testing
});

const Test = () => {
    const test1 = useSwitch('test1', false);
    const test2 = useSwitch('test2', true);
    // Fetch multiple at once
    // const {test1, test2} = useSwitches(['test1', 'test2'], [false, true]);
    return (
        <div>
            {test1 ? <div>Dana's First Test is Enabled</div> : <div>Dana's Test is Disabled</div>}
            {test2 ? <div>Dana's Second Test is Now Running</div> : <div></div>}
        </div>
    );
};

const App = () => (
    <LightswitchProvider lightswitchClient={client}>
        <Test></Test>
    </LightswitchProvider>
);
export default App;
