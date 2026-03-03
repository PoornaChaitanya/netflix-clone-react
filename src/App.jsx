import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Player = lazy(() => import("./pages/Player/Player"));
const Search = lazy(() => import("./pages/Search/Search"));
const MyList = lazy(() => import("./pages/MyList/MyList"));
const Category = lazy(() => import("./pages/Category/Category"));
const Language = lazy(() => import("./pages/Language/Language"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="pagelayer-loading">
          <div className="spinner"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/player/:type/:id"
          element={
            <ProtectedRoute>
              <Player />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category/:type"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />

        {/* THIS ONE WAS MISSING */}
        <Route
          path="/language/:lang"
          element={
            <ProtectedRoute>
              <Language />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
