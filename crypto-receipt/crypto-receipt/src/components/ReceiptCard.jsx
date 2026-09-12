import { forwardRef } from 'react'
import {
  shortenAddress,
  formatEth,
  formatWalletAge,
  formatDate,
  formatTxCount,
} from '../lib/format'

const ReceiptCard = forwardRef(function ReceiptCard({ address, stats }, ref) {
  const { ethBalance, txCount, etherscan, funMessage, status } = stats

  return (
    <div className="receipt-card" ref={ref}>
      <div className="receipt-header">CRYPTO RECEIPT</div>

      <div className="receipt-row">
        <span className="label">Wallet</span>
        <span className="value mono">{shortenAddress(address)}</span>
      </div>

      <div className="divider" />

      {etherscan && (
        <div className="receipt-row">
          <span className="label">Wallet Age</span>
          <span className="value">{formatWalletAge(etherscan.walletAgeYears)}</span>
        </div>
      )}

      <div className="receipt-row">
        <span className="label">
          {etherscan ? 'Transactions' : 'Transactions Sent'}
        </span>
        <span className="value">
          {formatTxCount(etherscan ? etherscan.totalTx : txCount)}
          {etherscan?.totalTxIsCapped ? '+' : ''}
        </span>
      </div>

      <div className="receipt-row">
        <span className="label">ETH Balance</span>
        <span className="value">{formatEth(ethBalance)}</span>
      </div>

      {etherscan && (
        <div className="receipt-row">
          <span className="label">First Seen</span>
          <span className="value">{formatDate(etherscan.firstSeenMs)}</span>
        </div>
      )}

      <div className="divider" />

      <div className="receipt-status">STATUS</div>
      <div className="receipt-status-value">{status}</div>

      <div className="divider" />

      <p className="receipt-fun">{funMessage}</p>

      <div className="receipt-footer">Crypto Receipt</div>
    </div>
  )
})

export default ReceiptCard
