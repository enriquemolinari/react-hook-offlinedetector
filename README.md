# React Custom Hook to detect Offline

A react custom hook to detect if you are offline.

## Install

`$ npm install @enrique.molinari/react-hook-offline-detector`

## Usage

```javascript
import { useOffLineDetector } from "@enrique.molinari/react-hook-offline-detector";

const params = {
  pollUrl: "./favicon.ico",
  pollingInterval: 3000,
  fetchTimeout: 5000,
  handleChange: handleChange,
};

function handleChange(status) {
  if (status) {
    console.log("Status changed, we are online :)");
  } else {
    console.log("Status changed, we are offline :(");
  }
}

export function ReactComponent() {
  const isOnLine = useOffLineDetector(params);

  //...
  //use isOnline state variable show or hide componets
}
```

By default, the hook will use the following values of the parameters:

| param           |     value     |
| --------------- | :-----------: |
| pollUrl         | ./favicon.ico |
| pollingInterval |     5000      |
| fetchTimeout    |     1000      |
