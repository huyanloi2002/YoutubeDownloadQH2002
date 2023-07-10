import React, { Suspense, lazy } from "react";

const Header = lazy(() => import("../components/Header"));
const Body = lazy(() => import("../components/Body"));

const Loader = lazy(() => import("../components/Loader"));

const Homepage = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <Header />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Body />
      </Suspense>
    </React.Fragment>
  );
};

export default Homepage;
