import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { path } from "./utils/constant";
import "./App.css";
import {
    Home,
    Login,
    Register,
    Rental,
    BuySell,
    ServicePrice,
    Blog,
    Main,
    DetailRealHome,
    DataSearch,
    HomePage,
} from "./containers/Public/index";
import {
    Private,
    CreatePost,
    ManagePost,
    EditInfor,
} from "./containers/Private";

function App() {
    return (
        <div className="App overflow-hidden w-screen">
            <div className="auth-wrapper">
                <div className="auth-inner flex">
                    <Routes>
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.REGISTER} element={<Register />} />
                        <Route path={path.HOME} element={<Home />}>
                            <Route path="*" element={<HomePage />} />
                            <Route path={path.RENTAL} element={<Rental />} />
                            <Route
                                exact
                                path={path.BUYSELL}
                                element={<BuySell />}
                            />
                            <Route
                                path={path.SERVICE_PRICE}
                                element={<ServicePrice />}
                            />
                            <Route path={path.BLOG} element={<Blog />} />
                            <Route
                                path={path.DETAIL_REALHOMES__TITLE_ID}
                                element={<DetailRealHome />}
                            />
                            {/*Page Search data  */}
                            <Route
                                path={path.SEARCH}
                                element={<DataSearch />}
                            />

                            {/* Buysell */}
                            <Route
                                path={path.SELL_APARTMENTS}
                                element={
                                    <Main content={path.SELL_APARTMENTS} />
                                }
                            />
                            <Route
                                path={path.SELL_BOARDING_HOMES}
                                element={
                                    <Main content={path.SELL_BOARDING_HOMES} />
                                }
                            />
                            <Route
                                path={path.SELL_FRONT_HOMES}
                                element={
                                    <Main content={path.SELL_FRONT_HOMES} />
                                }
                            />
                            <Route
                                path={path.SELL_HOTELS}
                                element={<Main content={path.SELL_HOTELS} />}
                            />
                            <Route
                                path={path.SELL_LAND}
                                element={<Main content={path.SELL_LAND} />}
                            />
                            <Route
                                path={path.SELL_OWN_HOME}
                                element={<Main content={path.SELL_OWN_HOME} />}
                            />
                            <Route
                                path={path.SELL_PROJECT_LAND}
                                element={
                                    <Main content={path.SELL_PROJECT_LAND} />
                                }
                            />
                            <Route
                                path={path.SELL_SHOP}
                                element={<Main content={path.SELL_SHOP} />}
                            />
                            <Route
                                path={path.SELL_VILLA}
                                element={<Main content={path.SELL_VILLA} />}
                            />
                            <Route
                                path={path.SELL_WAREHOUSE}
                                element={<Main content={path.SELL_WAREHOUSE} />}
                            />

                            {/* Rental */}
                            <Route
                                path={path.RENTAL_APARTMENTS}
                                element={
                                    <Main content={path.RENTAL_APARTMENTS} />
                                }
                            />
                            <Route
                                path={path.RENTAL_FRONT_HOMES}
                                element={
                                    <Main content={path.RENTAL_FRONT_HOMES} />
                                }
                            />
                            <Route
                                path={path.RENTAL_GROUND}
                                element={<Main content={path.RENTAL_GROUND} />}
                            />
                            <Route
                                path={path.RENTAL_HOTELS}
                                element={<Main content={path.RENTAL_HOTELS} />}
                            />
                            <Route
                                path={path.RENTAL_IN_COMPOUND}
                                element={
                                    <Main content={path.RENTAL_IN_COMPOUND} />
                                }
                            />
                            <Route
                                path={path.RENTAL_LAND}
                                element={<Main content={path.RENTAL_LAND} />}
                            />
                            <Route
                                path={path.RENTAL_MOTEL_ROOM}
                                element={
                                    <Main content={path.RENTAL_MOTEL_ROOM} />
                                }
                            />
                            <Route
                                path={path.RENTAL_OFFICE}
                                element={<Main content={path.RENTAL_OFFICE} />}
                            />
                            <Route
                                path={path.RENTAL_WAREHOUSE}
                                element={
                                    <Main content={path.RENTAL_WAREHOUSE} />
                                }
                            />
                            <Route
                                path={path.RENTAL_WHOLE_HOUSE}
                                element={
                                    <Main content={path.RENTAL_WHOLE_HOUSE} />
                                }
                            />
                        </Route>
                        {/* Private */}
                        <Route path={path.PRIVATE} element={<Private />}>
                            <Route
                                path={path.MANAGEMENT_PAGE}
                                element={<ManagePost />}
                            />
                            <Route
                                path={path.CREATE_POST}
                                element={<CreatePost />}
                            />
                            <Route
                                path={path.POST_MANAGEMENT}
                                element={<ManagePost />}
                            />
                            <Route
                                path={path.EDIT_INFOR}
                                element={<EditInfor />}
                            />
                            <Route
                                path={path.HISTORY_PAYMENT}
                                element={<CreatePost />}
                            />
                            <Route
                                path={path.SAVED_POST}
                                element={<CreatePost />}
                            />
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
