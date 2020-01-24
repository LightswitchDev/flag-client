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

import { LightswitchClient, LightswitchProvider, getSwitch } from '@lightswitch/client';

const client = new LightswitchClient({
    clientId: 'ck5nk1ei90022qcw1vrqqbp1f',
    apiKey: '181d0f0e-709d-404c-8724-5d82d6f4252a',
    frequencyInSeconds: 3,
});

const Test = () => {
    const test1 = getSwitch('test1');
    const test2 = getSwitch('test2');

    return (
        <div>
            {test1 && test1.enabled ? <div>Dana's First Test is Enabled</div> : <div>Dana's Test is Disabled</div>}
            {test2 && test2.enabled ? <div>Dana's Second Test is Now Running</div> : <div></div>}
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
