// Optional enhancement. Etherscan's API is free but requires a free API key
// (sign up at https://etherscan.io/apis). If no key is configured, this
// returns null and the app simply shows fewer fields — nothing is faked.
// Uses API V2 (chainid=1 is Ethereum Mainnet) — the old V1 base URL was
// fully shut down by Etherscan on August 15, 2025.
const ETHERSCAN_API = 'https://api.etherscan.io/v2/api'
const CHAIN_ID = 1
const API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY

export function hasEtherscanKey() {
  return Boolean(API_KEY)
}

export async function getEtherscanStats(address) {
  if (!API_KEY) return null

  const url = `${ETHERSCAN_API}?chainid=${CHAIN_ID}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`

  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()

  // status "0" with an empty result means "no transactions found" — that's a
  // valid, real answer (a fresh/unused wallet), not an error.
  if (!Array.isArray(data.result) || data.result.length === 0) {
    return null
  }

  const txs = data.result
  const firstTx = txs[0]
  const lastTx = txs[txs.length - 1]

  const firstSeenMs = Number(firstTx.timeStamp) * 1000
  const lastSeenMs = Number(lastTx.timeStamp) * 1000
  const nowMs = Date.now()

  const walletAgeYears = (nowMs - firstSeenMs) / (1000 * 60 * 60 * 24 * 365.25)
  const daysSinceLastTx = (nowMs - lastSeenMs) / (1000 * 60 * 60 * 24)

  return {
    firstSeenMs,
    lastSeenMs,
    walletAgeYears,
    daysSinceLastTx,
    totalTx: txs.length,
    // Etherscan's free txlist call caps at 10,000 records, so for extremely
    // active wallets this count may be a lower bound rather than exact.
    totalTxIsCapped: txs.length >= 10000,
  }
}
