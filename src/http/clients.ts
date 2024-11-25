import axios, {
  type AxiosError,
  type AxiosRequestHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { env } from '@config'
import { loadState } from '@redux/local.ts'

const authenticatedClient = axios.create({
  baseURL: env.apiUrl
})

const unauthenticatedClient = axios.create({
  baseURL: env.apiUrl
})

authenticatedClient.interceptors.request.use(
  async (req: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const state = loadState()
    req.headers = {
      Authorization: 'Bearer ' + state.user.token
    } as AxiosRequestHeaders

    // uncomment when debugging
    // console.log(`Request: ${req.method?.toUpperCase()} - ${req.url}`, {
    //   body: req.data,
    //   params: req.params,
    //   headers: req.headers
    // })

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
