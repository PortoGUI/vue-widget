function init(apiKey) {
  async function handleLoadWidget() {
    const page = `${window.location.origin}${window.location.pathname}`
    const fp = await window.FingerPrintJS.load()
    const fingerPrint = await fp.get()

    const WIDGET_URL = `https://PortoGUI-feedbacker-widget.netlify.app?api_key=${apiKey}&page=${page}&fingeprint=${fingerPrint.visitorID}`
    const config = { method: 'HEAD' }
    const res = await fetch(`https://backend-vue.vercel.app/apikey/exists?apikey=${apiKey}`, config)

    if (res.status === 200) {
      const iFrame = document.createElement('iframe')

      iFrame.src = WIDGET_URL
      iFrame.id = 'feedbacker-iframe'
      iFrame.style.cssText = `
        position: fixed;
        bottom: 0;
        right: 0;
        overflow: hidden;
        border: none;
        z-index: 2147483647;
      `
      document.body.appendChild(iFrame)

      window.addEventListener('message', (event) => {
        if (!event.data.isWidget) return

        if (event.data.isOpen) {
          iFrame.width = '100%'
          iFrame.height = '100%'
        } else {
          iFrame.width = '300px'
          iFrame.height = '150px'
        }
      })
    } else {
      console.info('* [ Feedbackr ] can\'t load. ApiKey does\'t exist')
    }
  }

  const script = document.createElement('script')

  script.src = 'https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@4.6.0/+esm'
  script.async = 'async'
  script.addEventListener('load', handleLoadWidget)

  document.body.appendChild(script)
}

window.init = init
