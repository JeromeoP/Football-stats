import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div>
    <Router>
  
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route path ="/" component={LoginPage} />
          </Switch>
  
     
      </Router>

    </div>
  );
}

export default App;
