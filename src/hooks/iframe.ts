import { setApikey, setCurrentPage, setFingerprint } from '../store'

interface IiFrameControl {
  notifyOpen(): void
  notifyClose(): void
  upadateCoreValuesOnStore(): void
}

export default function useIFrameControl(): IiFrameControl {
  function upadateCoreValuesOnStore(): void {
    if (process.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search)
      const apikey = query.get('api_key') ?? ''
      const page = query.get('page') ?? ''
      const fingerprint = query.get('fingerprint') ?? ''

      setCurrentPage(page)
      setApikey(apikey)
      setFingerprint(fingerprint)

      return
    }

    setCurrentPage('https://playground-url.com')
    setApikey('fcd5015c-10d3-4e9c-b395-ec7ed8850165')
    setFingerprint('321321321321321')
  }

  function notifyOpen(): void {
    window.parent.postMessage({ isWidget: true, isOpen: true }, '*')
  }

  function notifyClose(): void {
    window.parent.postMessage({ isWidget: true, isOpen: false }, '*')
  }

  return {
    upadateCoreValuesOnStore,
    notifyOpen,
    notifyClose
  }
}
