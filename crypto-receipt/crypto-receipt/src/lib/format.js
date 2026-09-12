export function formatEth(value) {
  if (value === null || value === undefined) return '—'
  if (value === 0) return '0 ETH'
  if (value < 0.0001) return '<0.0001 ETH'
  return `${value.toFixed(4).replace(/\.?0+$/, '')} ETH`
}

export function formatWalletAge(years) {
  if (years === null || years === undefined) return '—'
  if (years < 1) {
    const months = Math.max(1, Math.round(years * 12))
    return `${months} MONTH${months > 1 ? 'S' : ''}`
  }
  return `${years.toFixed(1)} YEARS`
}

export function formatDate(ms) {
  if (!ms) return '—'
  const date = new Date(ms)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatTxCount(count) {
  return count.toLocaleString('en-US')
}
