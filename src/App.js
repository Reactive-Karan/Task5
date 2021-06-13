import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import MainPage from "./components/MainPage";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateProfile from "./components/CreateProfile";
import ErrorPage from "./components/ErrorPage";
import EditProfile from "./EditProfile";
function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/users/CreateProfile" component={CreateProfile} />
          <Route exact path="/users/EditProfile/:id" component={EditProfile} />
          <Route component={ErrorPage} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
