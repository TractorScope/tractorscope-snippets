import { useEffect, useState, useMemo } from 'react'

export default function TractorReport({
  url,
  width: incomingWidth,
  height: incomingHeight,
  dashboard,
  isLoading = false,
}) {
  const [messageLoading, setMessageLoading] = useState < boolean > true
  const [iframeLoading, setIframeLoading] = useState < boolean > true
  const [width, setWidth] = useState(incomingWidth || '100%')
  const [height, setHeight] = useState(incomingHeight || '100px')

  useEffect(() => {
    if (url) {
      setMessageLoading(true)
      setIframeLoading(true)
    }
  }, [url])

  useEffect(() => {
    // listen for iframe messages telling us when report has loaded and with what dimensions
    function handleMessage(event) {
      if (event?.data?.dashboardId && event?.data?.dashboardId === dashboard) {
        if (height !== '100%') setHeight(event.data.height + 'px')
        if (width !== '100%') setWidth(event.data.width + 'px')
      }
      setTimeout(() => setMessageLoading(false), 2000)
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  function iframeLoaded() {
    setTimeout(() => setIframeLoading(false), 100)
  }

  const showLoader = useMemo(
    () => messageLoading || isLoading || iframeLoading,
    [messageLoading, isLoading, iframeLoading]
  )

  const opacity = showLoader ? 0 : 1

  return (
    <div>
      {showLoader && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width,
            height,
          }}
        >
          Loading...
        </div>
      )}
      <div style={{ opacity }}>
        <iframe
          title="Report"
          src={url}
          style={{ width, height, border: 'none' }}
          scrolling="no"
          onLoad={iframeLoaded}
        />
      </div>
    </div>
  )
}
