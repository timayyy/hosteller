import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ConfirmUserScreen from "./screens/ConfirmUserScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";

import PrivateRoute from './components/common/PrivateRoute'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ProfileScreen} />
            </Switch>
            <Route path="/confirm/:token" component={ConfirmUserScreen} />
            <Route path="/signup" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/" component={Homescreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
