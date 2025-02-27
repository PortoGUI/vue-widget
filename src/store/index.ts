import { reactive, readonly } from 'vue'

export type TstoreState = {
  apikey: string,
  message: string,
  fingerprint: string,
  currentPage: string,
  feedbackType: string,
  currentComponent: string,
}

const initialState = {
  apikey: '',
  message: '',
  currentPage: '',
  fingerprint: '',
  feedbackType: '',
  currentComponent: 'step-select-type'
}

const state = reactive<TstoreState>({ ...initialState })

export function setApikey(apikey: string): void {
  state.apikey = apikey
}

export function setMessage(message: string): void {
  state.message = message
}

export function setCurrentPage(currentPage: string): void {
  state.currentPage = currentPage
}

export function setFingerprint(fingerprint: string): void {
  state.fingerprint = fingerprint
}

export function setFeedbackType(feedbackType: string): void {
  state.feedbackType = feedbackType
}

export function setCurrentComponent(currentComponent: string): void {
  state.currentComponent = currentComponent
}

export function resetStore(): void {
  setApikey(initialState.apikey)
  setMessage(initialState.message)
  setCurrentPage(initialState.currentPage)
  setFingerprint(initialState.fingerprint)
  setFeedbackType(initialState.feedbackType)
  setCurrentComponent(initialState.currentComponent)
}

export default readonly(state)
