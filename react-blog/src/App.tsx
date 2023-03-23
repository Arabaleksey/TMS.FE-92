import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundries";
import { Routes } from "./constants/Routes";
import { Footer, Header } from "./layouts";
import { AddPost, AllPosts, Home, Post, Verification } from "./pages";
import { Auth } from "./pages/common";
import { UITheme } from "./store/uiSlice";
import { uiThemeSelector } from "./store/uiSlice/selectors";
import { themeDark, themeLight } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { LOCAL_STORAGE_KEYS } from "./constants/LocalStorageKeys";
import { api, getCurrentUser } from "./services";
import { initUser } from "./store/userSlice";

const StyledBackground = styled.div`
  background-color: ${(props) => props.theme.bodyBackground};
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.2s linear;
`;

const StyledContent = styled.div`
  padding: 8px 0;
  flex: 1;
  display: flex;
`;

interface IRoute {
  path: Routes;
  routeProps?: RouteProps;
  component: React.ReactNode;
}

const routes: IRoute[] = [
  {
    path: Routes.HOME,
    routeProps: {
      exact: true,
    },
    component: <Home />,
  },
  {
    path: Routes.LOGIN,
    routeProps: {
      exact: true,
    },
    component: <Auth formState="signin" />,
  },
  {
    path: Routes.REGISTER,
    routeProps: {
      exact: true,
    },
    component: <Auth formState="signup" />,
  },
  {
    path: Routes.ADD_POST,
    routeProps: {
      exact: true,
    },
    component: <AddPost />,
  },
  {
    path: Routes.CONFIRMATION_EMAIL,
    routeProps: {
      exact: true,
    },
    component: <Auth formState="signupend" />,
  },
  {
    path: Routes.ALL_POSTS,
    component: <AllPosts />,
    routeProps: {
      exact: true,
    },
  },
  {
    path: Routes.POST,
    component: <Post />,
  },
  {
    path: Routes.VERIFICATION_EMAIL,
    component: <Verification />,
  },
];

const themeName: Record<UITheme, DefaultTheme> = {
  dark: themeDark,
  light: themeLight,
};

const App = () => {
  const theme = useSelector(uiThemeSelector);

  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    const { data } = await getCurrentUser();

    dispatch(initUser(data));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    if (accessToken) {
      api.defaults.headers.common = {
        Authorization: "Bearer " + accessToken,
      };

      fetchCurrentUser();
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={themeName[theme]}>
        <StyledBackground>
          <Router>
            <Header />
            <ToastContainer theme={theme} />
            <StyledContent>
              <Switch>
                {routes.map((route, routeIndex) => (
                  <Route
                    path={route.path}
                    {...route.routeProps}
                    key={`${route.path}-${routeIndex}`}
                  >
                    {route.component}
                  </Route>
                ))}
              </Switch>
            </StyledContent>
            <Footer />
          </Router>
        </StyledBackground>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
