import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import PremiumContent from './PremiumContent';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='header'>
        <NavLink exact activeClass="active" to='/'>Home</NavLink>
        <NavLink exact activeClass="active" to='/register'>Register</NavLink>
        <NavLink exact activeClass="active" to='/login'>Login</NavLink>
        <NavLink exact activeClass="active" to='/premium-content'>Premium Content</NavLink>
      </div>
      <div className='content'>
        <Switch>
          <Route exact path='/' component={Home} />
          <PublicRoutes path='/register' component={Register} />
          <PublicRoutes path='/login' component={Login} />
          <PrivateRoutes path='/premium-content' component={PremiumContent} />
        </Switch>
      </div>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
