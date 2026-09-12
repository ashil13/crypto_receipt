import { useRef, useState } from 'react'
import AddressForm from './components/AddressForm'
import ReceiptCard from './components/ReceiptCard'
import DownloadButton from './components/DownloadButton'
import ShareButton from './components/ShareButton'
import { getEthBalance, getTransactionCount } from './lib/eth'
import { getEtherscanStats } from './lib/etherscan'
import { getFunMessage, getStatus } from './lib/funMessage'
import './App.css'

export default function App() {
  const [address, setAddress] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const cardRef = useRef(null)

  async function handleSubmit(addr) {
    setLoading(true)
    setError('')
    setStats(null)

    try {
      const [ethBalance, txCount] = await Promise.all([
        getEthBalance(addr),
        getTransactionCount(addr),
      ])

      // Etherscan data is optional/best-effort — never blocks the core flow.
      let etherscan = null
      try {
        etherscan = await getEtherscanStats(addr)
      } catch {
        etherscan = null
      }

      const baseStats = { ethBalance, txCount, etherscan }
      const funMessage = getFunMessage(baseStats)
      const status = getStatus(baseStats)

      setAddress(addr)
      setStats({ ...baseStats, funMessage, status })
    } catch (err) {
      console.error(err)
      setError("Couldn't load this wallet right now. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>CRYPTO RECEIPT</h1>
        <p className="tagline">Your wallet has a receipt.</p>
        <p className="subtitle">
          Enter your Ethereum wallet address and see your crypto journey.
        </p>
      </header>

      <AddressForm onSubmit={handleSubmit} loading={loading} />

      {error && <p className="global-error">{error}</p>}

      {stats && address && (
        <section className="result">
          <ReceiptCard ref={cardRef} address={address} stats={stats} />
          <div className="actions">
            <DownloadButton targetRef={cardRef} />
            <ShareButton />
          </div>
        </section>
      )}
    </div>
  )
}
