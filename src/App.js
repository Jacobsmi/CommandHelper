import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
     <Router>
       <Switch>
         <Route exact path='/'>
           <Landing />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
