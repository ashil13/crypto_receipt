import { useState } from 'react'
import { isValidAddress } from '../lib/eth'

export default function AddressForm({ onSubmit, loading }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()

    if (!isValidAddress(trimmed)) {
      setError("That's not a valid Ethereum address.")
      return
    }

    setError('')
    onSubmit(trimmed)
  }

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="0x..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Generate My Receipt'}
      </button>
      {error && <p className="form-error">{error}</p>}
      <p className="form-hint">
        Ethereum Mainnet • Free • No wallet connection required
      </p>
    </form>
  )
}
