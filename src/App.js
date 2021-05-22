import Home from './Home';
import About from './About';
import Add from './Add';

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
          <button>
            <Link to="/add">Add</Link>
          </button>
        </div>
        <div className="content">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/add" component={Add} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
