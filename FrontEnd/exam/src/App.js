import './App.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/slices/auth';
import publicRoutes from './routes/PublicRoute';
import OnlyLayout from './Layouts/OnlyLayout';
import DefaultLayout from './Layouts/DefaultLayout';
import privateRoutes from './routes/PrivateRoute';
import { getUserInfo } from './utils/helpers';

function App() {
  const currentUser = useSelector(selectCurrentUser)
  const users = getUserInfo();
  return (
    <div className="app-container">
      <Routes>
      {publicRoutes.map((route, index) => {
          const Layout = route.layout ?  DefaultLayout : OnlyLayout;
          const Page = route.component;
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes.map((routes, indexs) => {
          const Layout = routes.layout ? DefaultLayout : OnlyLayout ;
          const Page = routes.component;
          return (
            <Route
              path={routes.path}
              key={indexs}
              element={
                currentUser||users ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          );
        })}
        <Route path="*" element={"NotFoundPage"} />
      </Routes>

    </div>
  );
}

export default App;
