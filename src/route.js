// core components for Admin layout
import Home from './pages/Home';
import GithubSearch from './pages/GithubSearch';
import GoogleMap from './pages/GoogleMap';
import Weather from './pages/Weather';
import TradingChart from './pages/TradingChart';
import CoinDesk from './pages/CoinDesk';
import CoinGecko from './pages/CoinGecko';
import Coinpaprika from './pages/Coinpaprika';
import RandomDogImage from './pages/RandomDogImage';

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home,
        layout: ""
    },
    {
        path: "/github-search",
        name: "GithubSearch",
        component: GithubSearch,
        layout: ""
    },
    {
        path: "/google-map",
        name: "GoogleMap",
        component: GoogleMap,
        layout: ""
    },
    {
        path: "/weather",
        name: "Weather",
        component: Weather,
        layout: ""
    },
    {
        path: "/trading-chart",
        name: "TradingChart",
        component: TradingChart,
        layout: ""
    },
    {
        path: "/coindesk",
        name: "CoinDesk",
        component: CoinDesk,
        layout: ""
    },
    {
        path: "/coingecko",
        name: "CoinGecko",
        component: CoinGecko,
        layout: ""
    },
    {
        path: "/coinpaprika",
        name: "Coinpaprika",
        component: Coinpaprika,
        layout: ""
    },
    {
        path: "/random-dog-image",
        name: "RandomDogImage",
        component: RandomDogImage,
        layout: ""
    }
]

export default routes;