import './App.css'

import { createBrowserRouter } from "react-router-dom";

import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Login from './views/Login';
import CardapioYupFormik from './views/CardapioYupFormik';

<<<<<<< HEAD
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "cardapio",
        element: <CardapioYupFormik />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ]
  }
]);
export default Router;
=======
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cardapio" element={<CardapioYupFormik />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> 9cbe499a4b293b6cbbbc8a30c2e6853632816b7b
