// Free, public Ethereum Mainnet JSON-RPC endpoints. No API key required.
// These are all built/commonly used for direct browser calls (CORS-enabled).
// Public services like this can go down or change their rules with no notice,
// so we try each in order and fall back to the next on failure.
const RPC_URLS = [
  'https://eth.llamarpc.com',
  'https://1rpc.io/eth',
  'https://eth.merkle.io',
  'https://cloudflare-eth.com',
]

export function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

async function rpcCall(method, params) {
  let lastError

  for (const url of RPC_URLS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params,
        }),
      })

      if (!res.ok) {
        throw new Error('RPC request failed')
      }

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error.message || 'RPC error')
      }

      return data.result
    } catch (err) {
      lastError = err
    }
  }

  throw lastError
}

// Returns the ETH balance as a number (e.g. 4.82).
export async function getEthBalance(address) {
  const hexBalance = await rpcCall('eth_getBalance', [address, 'latest'])
  const wei = BigInt(hexBalance)
  return Number(wei) / 1e18
}

// Returns the number of transactions SENT from this address (the account nonce).
// Note: this does not include incoming transactions.
export async function getTransactionCount(address) {
  const hexCount = await rpcCall('eth_getTransactionCount', [address, 'latest'])
  return parseInt(hexCount, 16)
}
