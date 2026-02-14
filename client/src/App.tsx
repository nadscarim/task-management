// App.tsx
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./core/store/hooks";
import { fetchUser } from "./core/store/authSlice";
import Navbar from "./core/layout/Navbar";
import NotFound from "./components/shared/NotFound";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
