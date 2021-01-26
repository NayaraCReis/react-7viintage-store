
import React from 'react';
import store from "./store";
import  { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* Menu */}
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <img className="logo" src="/images/vii-logo.jpg" alt="Logo" />
              <Link to="/">Seven Vintage Store</Link>
              <Link to="/admin">Admin</Link>
            </header>
            <main>
              <Route path="/admin" component={AdminScreen} />
              <Route path="/" component={HomeScreen} exact />
            </main>
            <footer>All of the Urban Style right is reserved.</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;