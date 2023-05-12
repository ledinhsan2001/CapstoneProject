import { Routes, Route } from "react-router-dom";
import { path } from "./utils/constant";
import "./App.css";
import {
    Home,
    Login,
    Main,
    Register,
    Rental,
    BuySell,
    ServicePrice,
    Blog,
    HomePage,
} from "./containers/Public/index";

function App() {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    return (
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Routes>
                        <Route
                            path={path.HOME}
                            element={isLoggedIn === true ? <Home /> : <Home />}
                        />
                        <Route path="*" element={<HomePage />}></Route>
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.REGISTER} element={<Register />} />
                        <Route path={path.Main} element={<Main />} />
                        <Route path={path.Rental} element={<Rental />} />
                        <Route path={path.BuySell} element={<BuySell />} />
                        <Route
                            path={path.ServicePrice}
                            element={<ServicePrice />}
                        />
                        <Route path={path.Blog} element={<Blog />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
