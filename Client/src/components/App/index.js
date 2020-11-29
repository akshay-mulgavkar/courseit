import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import PrivateRoute from '../../constants/privateRoute';
import Courses from '../Courses';
import Topics from '../Topics';

import * as ROUTES from '../../constants/routes';

const App = () => (
  	<Router>
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <PrivateRoute exact path={ROUTES.COURSES}  roles={2} component={Courses} />
      <PrivateRoute exact path={ROUTES.TOPICS}  roles={2} component={Topics} />
    </Router>
);
export default App;