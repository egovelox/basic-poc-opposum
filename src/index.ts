import CircuitBreaker from "opossum"

import { getScenario } from "./cli/scenario";
import { HttpService } from "./http"

(async() => {
  const maybeScenario = await getScenario()
  if (!maybeScenario) {
    return
  }
  const {
    circuitConfiguration,
    globalIterations,
    tasks,
  } = maybeScenario

  const httpService = new HttpService()
  const opossumBreaker = new CircuitBreaker(
    httpService.httpCall,
    {
      timeout: circuitConfiguration.timeoutMs,
      errorThresholdPercentage: circuitConfiguration.errorThresholdPercentage,
      resetTimeout: circuitConfiguration.resetTimeoutMs,
    }
  )

  /*
   * @example : a Scenario composed of 30 requests
   scenario {
     globalIterations: 3,
     tasks: [
       {
         responseCode: 200,
         requestTimeMs: 1000,
         iterations: 8
       },
       {
         responseCode: 500,
         requestTimeMs: 1000,
         iterations: 2
       }
     ]
   }
   */
  for (let i = 0; i < globalIterations; i++) {
    for (let task = 0; task < tasks.length; task++) {
      const { 
        requestTimeMs,
        responseCode,
        iterations,
      } = tasks[task]

      for (let t = 0; t < iterations; t++) {
        try {
          // http-call wrapped inside circuit-breaker
          await opossumBreaker.fire({
            responseCode,
            requestTimeMs
          })
        } catch(e) { 
          console.log('Received error.', e) 
        }
      }
    }
  }
})()
