// Free, public Ethereum Mainnet JSON-RPC endpoint. No API key required.
const RPC_URL = 'https://ethereum.publicnode.com'

export function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

async function rpcCall(method, params) {
  const res = await fetch(RPC_URL, {
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
