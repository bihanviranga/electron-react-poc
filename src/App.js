import Home from './Home';
import About from './About';

import { HashRouter, Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <div className="nav">
          <button>
            <Link to="/home">Home</Link>
          </button>
          <button>
            <Link to="/about">About</Link>
          </button>
        </div>
        <div className="content">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
