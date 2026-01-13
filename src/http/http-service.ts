import got, { Got } from "got"

type HttpCallResponse = {
  success: boolean
  status: number,
  statusText: string,
}

export class HttpService {
  private DOMAIN = 'https://free.mockerapi.com'
  private client: Got

  constructor() {
    this.client = got.extend({
      prefixUrl: this.DOMAIN,
      retry: 0,
      headers: {
        Accept: 'application/json'
      },
      // will throw if response code !== 2xx-3xx
      throwHttpErrors: true,
    })
  }

  httpCall = async ({
    responseCode, 
    requestTimeMs
  }: { responseCode: number, requestTimeMs: number }): 
  Promise<HttpCallResponse> => {
    return await this.client(
      `${responseCode}`,
      { headers: {
        'x-delay': `${requestTimeMs}`
      } }
    )
    .json()
    .then((response) => {
      console.log('Sucessfully received response :', JSON.stringify(response))
      return response as HttpCallResponse
    })
  }
}
