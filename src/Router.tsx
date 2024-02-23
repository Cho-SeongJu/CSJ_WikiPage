import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/common/Loading";

const MainPage = lazy(() => import("./pages/MainPage"));
const DetailWikiPage = lazy(() => import("./pages/DetailWikiPage"));
const CreateWikiPage = lazy(() => import("./pages/CreateWikiPage"));
const EditWikiPage = lazy(() => import("./pages/EditWikiPage"))

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/detailWiki/:wikiId"
          element={<DetailWikiPage />}
        />
        <Route 
          path="/create" 
          element={<CreateWikiPage />}
        />
        <Route
          path="/edit/:wikiId"
          element={<EditWikiPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
