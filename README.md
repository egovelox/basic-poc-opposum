# Learn opossum circuit-breaker

Run a realistic scenario with a circuit-breaker  
using [https://free.mockerapi.com/](https://free.mockerapi.com/).


`scenario_1.json` : circuit-breaker will remain closed.

```json
{
  "circuitConfiguration": {
    "timeoutMs": 10000,
    "errorThresholdPercentage": 50,
    "resetTimeoutMs": 2000
  },
  "globalIterations": 3,
  "tasks": [
    {
      "responseCode": 200,
      "requestTimeMs": 1000,
      "iterations": 8
    },
    {
      "responseCode": 500,
      "requestTimeMs": 1000,
      "iterations": 2
    }
  ]
}
```

`scenario_2.json` : circuit-breaker will open

```json
{
  "circuitConfiguration": {
    "timeoutMs": 10000,
    "errorThresholdPercentage": 50,
    "resetTimeoutMs": 2000
  },
  "globalIterations": 15,
  "tasks": [
    {
      "responseCode": 200,
      "requestTimeMs": 1000,
      "iterations": 1
    },
    {
      "responseCode": 500,
      "requestTimeMs": 1000,
      "iterations": 1
    }
  ]
}
```

## Install

```sh
pnpm install
```

## Run 

```sh
pnpm run build

pnpm run start scenario_1.json

pnpm run start scenario_2.json
```
