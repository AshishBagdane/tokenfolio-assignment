# tokenfolio | crypto tracker

## About

tokenfolio fetches live crypto data from **CoinCap API** and exchange rates from **ExchangeRate API** (USD-based). It also remembers your recent activity, thanks to browser caching — with a TTL (time to live) that you can adjust in the config file.

---

## Tech Stack

-   **Next.js** — React framework for building fast, modern web apps
-   **Axios** — for handling all API requests
-   **Tailwind CSS** — for styling
-   **TanStack** (React Query) — for data fetching and caching
-   **shadcn/ui** + **Tailwind Components** — for reusable, styled components

---

## Features

-   **Crypto Prices**: Live data from CoinCap API
-   **Exchange Rates**: Get current exchange rates (USD base)
-   **Custom Data Fetching**: Query the crypto data you need as per the assignment requirements
-   **Recent Activity**: See what you've recently looked up, with cached history
-   **Configurable Cache TTL**: Control how long the cached data sticks around via `api.config.ts`
-   **API Keys Management**: Keys are kept safely in `.env.local` (make sure to create this file!)

---

## Getting Started

1. **Clone the repository**

2. **Install dependencies**

    ```bash
    yarn install
    ```

3. **Set up environment variables**

    Create a `.env.local` file in the root of your project, and add the following:

    ```
    NEXT_PUBLIC_COINCAP_API_KEY=your_coincap_api_key_here
    NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key_here
    ```

4. **Run the application**
    ```bash
    yarn dev
    ```

That’s it! 🚀 You’re good to go.

---

### Notes

-   Make sure you have valid API keys — the app won’t work without them.
-   You can tweak the cache TTL in the `api.config.ts` file if you want to adjust how long recent activity is saved.
-   [Live Link](https://tokenfolio-assignment.vercel.app/)
