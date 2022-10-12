import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navbar } from "./components/Navbar";
import routes from "./config/routes";
import './assets/App.css';

export type AppProps = {};

const App = (props: AppProps) => {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Routes>
      </Container>
    </>
  );
};

export default App;
