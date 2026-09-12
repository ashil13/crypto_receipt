// Simple, deterministic rules. No AI involved.

export function getFunMessage({ txCount, etherscan }) {
  if (etherscan && etherscan.walletAgeYears >= 3) {
    return "You've seen some things. 👴"
  }

  if (txCount >= 1000) {
    return 'Someone needs to take your gas card away. 💀'
  }

  if (etherscan && etherscan.daysSinceLastTx <= 3 && etherscan.totalTx >= 200) {
    return "You clearly don't believe in weekends."
  }

  if (txCount < 10) {
    return 'Still warming up. 🌱'
  }

  return 'Just another wallet doing wallet things.'
}

export function getStatus({ etherscan }) {
  if (!etherscan) {
    return 'ON-CHAIN 🔗'
  }

  if (etherscan.daysSinceLastTx <= 30) {
    return 'STILL HERE 🫡'
  }

  if (etherscan.daysSinceLastTx <= 180) {
    return 'TAKING A BREAK 😴'
  }

  return 'GHOST MODE 👻'
}
