import axios, {
  type AxiosError,
  type AxiosRequestHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import env from '../config/env.ts'

const authenticatedClient = axios.create({
  baseURL: env.apiUrl
})

const unauthenticatedClient = axios.create({
  baseURL: env.apiUrl
})

unauthenticatedClient.interceptors.request.use(
  async (req: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    req.headers = {
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaWxlbnBlcmVpcmF2aWxjaGVzQGdtYWlsLmNvbSIsImlhdCI6MTczMDY4MTk0MSwiZXhwIjoxNzMwNjg1NTQxfQ.Ew_v2HgHCcSnYAQ8xX2MXmbpAQ9hDuupmtAczuLOnis'
    } as AxiosRequestHeaders

    return req
  },
  async (e: AxiosError): Promise<AxiosError> => {
    console.error(`Request error: ${JSON.stringify(e)}`)
    throw e
  }
)

authenticatedClient.interceptors.response.use(
  async (res: AxiosResponse): Promise<AxiosResponse> => {
    return res
  },
  async (e: AxiosError): Promise<AxiosError> => {
    console.error(`Response error: ${JSON.stringify(e)}`)
    throw e
  }
)

unauthenticatedClient.interceptors.request.use(
  async (req: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    return req
  },
  async (e: AxiosError): Promise<AxiosError> => {
    console.error(`Request error: ${JSON.stringify(e)}`)
    throw e
  }
)

unauthenticatedClient.interceptors.response.use(
  async (res: AxiosResponse): Promise<AxiosResponse> => {
    return res
  },
  async (e: AxiosError): Promise<AxiosError> => {
    console.error(`Response error: ${JSON.stringify(e)}`)
    throw e
  }
)

export { unauthenticatedClient, authenticatedClient }
