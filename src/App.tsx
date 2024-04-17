import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cardspage from "./pages/Cardspage";
import Layout from "./components/layout/Layout";
import Portalpage from "./pages/Portalpage";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";

function App() {
  const { isLoggedIn, isTokenExpired } = useAuth();
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Layout page="">
                <Homepage />
              </Layout>
            </>
          }
        />
        <Route
          path="/cards"
          element={
            isLoggedIn() && isTokenExpired() ? (
              <>
                <Layout page="cards">
                  <Cardspage />
                </Layout>
              </>
            ) : (
              <Navigate to={"/signin"} />
            )
          }
        />
        <Route
          path="/portal"
          element={
            isLoggedIn() && isTokenExpired() ? (
              <>
                <Layout page="portal">
                  <Portalpage />
                </Layout>
              </>
            ) : (
              <Navigate to={"/signin"} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn() && isTokenExpired() ? (
              <Navigate to={"/cards"} />
            ) : (
              <>
                <Register />
              </>
            )
          }
        />
        <Route
          path="/signin"
          element={
            isLoggedIn() && isTokenExpired() ? (
              <Navigate to={"/cards"} />
            ) : (
              <>
                <SignIn />
              </>
            )
          }
        />
        <Route
          path="*"
          element={
            <>
              <NotFoundPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
