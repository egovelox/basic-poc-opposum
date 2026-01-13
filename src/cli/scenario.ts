import fs from "fs"

type CircuitBreakerConfig = {
  timeoutMs: number, // If our function takes longer than x seconds, trigger a failure
  errorThresholdPercentage: number, // When x% of requests fail, trip the circuit
  resetTimeoutMs: number // After x seconds, try again.
};

type HttpTask = {
  responseCode: number
  requestTimeMs: number
  iterations: number
}

type Scenario = {
  circuitConfiguration: CircuitBreakerConfig
  globalIterations: number
  tasks: HttpTask[]
}

export async function getScenario(): Promise<Scenario | undefined> {
  try {
    const scenarioFilePath = process.argv[2]
    const jsonBuffer = await fs.promises.readFile(
      `../${scenarioFilePath}`, 
      { encoding: 'utf8' }
    )
    const scenario = JSON.parse(jsonBuffer.toString()) as Scenario
    return scenario
  } catch(e) {
    console.log(`Error handling scenario file`, e)
    console.log(`Usage: node index.js scenario_1.json`)
    return undefined
  }
}
