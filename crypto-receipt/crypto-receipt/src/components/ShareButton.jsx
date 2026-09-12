export default function ShareButton() {
  function handleShare() {
    // X's web intent does not support attaching an image automatically —
    // this only pre-fills the text. The user adds the downloaded image themselves.
    const text = encodeURIComponent('Just checked my Crypto Receipt 😂')
    const url = `https://twitter.com/intent/tweet?text=${text}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button className="secondary-button outline" onClick={handleShare}>
      Share on X
    </button>
  )
}
