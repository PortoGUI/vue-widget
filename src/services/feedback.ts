import { AxiosInstance } from 'axios'
import { TFeedback } from '../types/feedback'
import { TRequestError } from '../types/error'

type TCreate = {
  data: TFeedback
  errors: TRequestError | null
}

type CreatePayload = {
  type: string
  text: string
  page: string
  apiKey: string
  device: string
  fingerprint: string
}

export interface IFeedbackService {
  create(payload: CreatePayload): Promise<TCreate>
}

function FeedbackService(httpClient: AxiosInstance): IFeedbackService {
  async function create(payload: CreatePayload): Promise<TCreate> {
    const response = await httpClient.post<TFeedback>('/feedbacks', payload)
    let errors: TRequestError | null = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }

  return {
    create
  }
}

export default FeedbackService
