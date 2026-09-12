import { useState } from 'react'
import { toPng } from 'html-to-image'

export default function DownloadButton({ targetRef }) {
  const [busy, setBusy] = useState(false)

  async function handleDownload() {
    if (!targetRef.current || busy) return
    setBusy(true)

    try {
      const dataUrl = await toPng(targetRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      })

      const link = document.createElement('a')
      link.download = 'crypto-receipt.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to generate image', err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button className="secondary-button" onClick={handleDownload} disabled={busy}>
      {busy ? 'Preparing...' : 'Download Receipt'}
    </button>
  )
}
