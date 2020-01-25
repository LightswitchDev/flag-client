# @lightswitch/client

>

[![NPM](https://img.shields.io/npm/v/lightswitch-client.svg)](https://www.npmjs.com/package/@lightswitch/client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @lightswitch/client
```

## Usage

```tsx
import React from 'react';

import { LightswitchClient, LightswitchProvider, useSwitch, useSwitches } from '@lightswitch/client';

const client = new LightswitchClient({
    clientId: 'ckzri3m2o00320rsacd2p8t3s',
    apiKey: '2a25a5d6-8ae3-48c2-a98e-699112g8e94d',
    frequencyInSeconds: 30,
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
```

## License

MIT © [daaasbu](https://github.com/daaasbu)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
