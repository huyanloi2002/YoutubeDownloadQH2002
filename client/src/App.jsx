import React, { lazy, Suspense, useEffect } from "react";
import "./styles/App.scss";

const Homepage = lazy(() => import("./pages/Homepage"));

const Loader = lazy(() => import("./components/Loader"));

const App = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <Homepage />
      </Suspense>
    </React.Fragment>
  );
};

export default App;
