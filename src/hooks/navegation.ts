import useStore from './store'
import { setCurrentComponent, setFeedbackType } from '@/store'

export interface Inavigation {
  next(): void
  back(): void
  setErrorState(): void
  setSuccessState(): void
}

export default function useNavigation(): Inavigation {
  const store = useStore()

  function next(): void {
    if (store.currentComponent === 'step-select-type') {
      setCurrentComponent('step-write')
    }
  }

  function back() {
    if (store.currentComponent === 'step-write') {
      setCurrentComponent('step-select-type')
      setFeedbackType('')
    }
  }

  function setErrorState(): void {
    setCurrentComponent('step-error')
  }

  function setSuccessState(): void {
    setCurrentComponent('step-success')
  }

  return {
    next, back, setErrorState, setSuccessState
  }
}
