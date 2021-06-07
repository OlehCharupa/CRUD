import { Suspense, useEffect } from 'react';
import './App.module.css';
import SpinerLoader from './spinerLoader/SpinerLoader';
import { Switch, useHistory } from "react-router-dom";
import { routes } from "../routes/routes";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, allUsers } from '../redux/operations/user';
import Header from './header/Header';
import { resetToken } from '../redux/slice/token';
import { resetUser } from '../redux/slice/user';

const App = () => {
  const token = useSelector(state => state.token)
  const admin = useSelector(state => state.currentUser.role === "admin")
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (token) {
      dispatch(currentUser(token))
      if (!!(error.indexOf("404") + 1)) {
        dispatch(resetToken());
        dispatch(resetUser())
        history.push("/login");
      }
    }
    if (admin) {
      dispatch(allUsers())
    }
  }, [token, admin, dispatch, history, error])


  return (
    <>
      {token && <Header />}
      <Suspense fallback={<SpinerLoader />}>
        <Switch>
          {routes.map((route) => {
            return route.private
              ? <PrivateRoute key={route.label} {...route} />
              : <PublicRoute key={route.label} {...route} />
          })}
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
