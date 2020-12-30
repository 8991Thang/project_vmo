import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar-header/navbar";
import { SidebarLeft } from "./components/sidebar-left/sidebar";
import { LoginPage } from "./pages/login/login";
import { routes } from "./router.config";
import { checkStatusResponse } from "./utils/check-status-call-api";
function App() {
  const [notification, setNotifications] = useState(null);
  const { status } = useSelector(state => state.status);
  useEffect(() => {
    setNotifications(checkStatusResponse(status));
  }, [status]);
  const reactRouter = () => {
    return routes.map((route, i) => {
      return <Route path={route.path} key={i} exact={route.exact} component={route.component} />;
    });
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Redirect from="/" exact to="/login" />
        <Route
          render={({ location }) => {
            return (
              <div className="App min-h-screen overflow-hidden flex sm:flex-col">
                <SidebarLeft />
                <div className="flex flex-col w-10/12 sm:w-full">
                  <div className="sm:hidden ">
                    <Navbar />
                  </div>
                  <Switch location={location}>{reactRouter()}</Switch>
                </div>
                {notification}
              </div>
            );
          }}
        />
      </Switch>
    </Router>
  );
}
export default App;
