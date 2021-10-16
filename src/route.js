// core components for Admin layout
import Work from './pages/Work';
import Home from './pages/Home';
import GithubSearch from './pages/GithubSearch';
import GoogleMap from './pages/GoogleMap';
import Weather from './pages/Weather';
import TradingChart from './pages/TradingChart';
import CoinDesk from './pages/CoinDesk';

const routes = [
    {
        path: "/work",
        name: "Work",
        component: Work,
        layout: ""
    },
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
]

export default routes;