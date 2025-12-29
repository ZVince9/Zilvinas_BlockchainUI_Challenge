# Zilvinas Blockchain UI Challenge 🚀

E2E automation suite for **Jumper Exchange** built with **Playwright** and **Synpress v4**. This project demonstrates advanced Web3 testing patterns, including wallet session caching, multi-tab handling, and a robust Page Object Model (POM).

## 🛠 Wallet Configuration

Note: This project currently uses seed and password defined in .env variables, so once running it please make sure you define those.

1. Create .env file in root.
2. ADD `SEED_PHRASE` and `PASSWORD` as variables or define then in CI/CD tool you are using.
3. Run `npm run e2e:wallet:generate` to update the local session cache. This step is crucial to start other tests. Without it you wont be able to run other navigate or connect e2e tests.

⚠️ **Warning**: Never use a seed phrase associated with real funds for this automation.

## 🛠 Tech Stack

- **Framework**: [Playwright](https://playwright.dev/)
- **Web3 Wrapper**: [Synpress v4](https://github.com/Synthetixio/synpress) (ESM-only version)
- **Language**: TypeScript
- **Wallet**: MetaMask (Automated via Synpress)

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **MetaMask Seed Phrase**: Required for wallet interactions.

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone [https://github.com/ZVince9/Zilvinas_BlockchainUI_Challenge.git](https://github.com/ZVince9/Zilvinas_BlockchainUI_Challenge.git)
cd Zilvinas_BlockchainUI_Challenge
npm install
```

### 2. Main test Structure

- src/e2e -> tests to run
- src/pages -> POM pages defined
- src/fixtures -> basic before flows including synpress and wallet setup
- src/wallet.setup.ts -> wallet setup flow
- there is no lint or eslint set so possible future code readness to adjust and confirm within company standarts

### 3. How to run tests and basic of flows

1. After cloning the repo make sure you generate wallet and you see .cache-synpress folder appear in root
2. If you set in package.json file HEADLESS=false it will open up and you will see UI interaction.
3. All TC are within src/e2e.

### 4. CI/CD

- its created so every PR generate wallet cashe and runs navigate e2e test only

```bash
npm run e2e:wallet:connect -> this will trigger wallet connection flow
npm run e2e:wallet:navigate -> this will trigger navigate flow
```

### 5. Potential risks

1. When running swaps or bridge trx there is delay which is sometime unclear which could trigger flakiness so adding retries sometimes is not a bad solution or adding static timeouts.
2. If MM wallet is broken test will not work as well due to third party dependency.
3. Rate limit while running could hit so using api-key is crucial as well.
4. RPC Provider downtime increases flakiness on bridges/swaps as well.
