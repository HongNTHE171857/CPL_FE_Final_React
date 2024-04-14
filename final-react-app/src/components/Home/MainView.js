import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ArticleList from "../ArticleList";
import {
  changeTab,
  getAllArticles,
  getArticlesByAuthor,
} from "../reducers/articleList";
import { selectIsAuthenticated, selectUser } from "../features/auth/authSlice";
import store from "../app/store";
import ArticleAuthor from "../ArticleAuthor";

function YourFeedTab({ setConfirm }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentTab = useSelector((state) => state.articleList.tab);
  const isActiveTab = currentTab;
  if (!isAuthenticated) {
    return null;
  }

  const dispatchChangeTab = () => {
    // dispatch(changeTab("feed"));
    setConfirm(true);
  };

  return (
    <li className="nav-item">
      <button
        type="button"
        className={isActiveTab ? "nav-link active" : "nav-link"}
        onClick={dispatchChangeTab}
      >
        Your Feed
      </button>
    </li>
  );
}

function GlobalFeedTab({ setConfirm }) {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.articleList.tab);
  const isActiveTab = currentTab === "all";

  const dispatchChangeTab = () => {
    dispatch(changeTab("all"));
    console.log(setConfirm(false));
  };

  return (
    <li className="nav-item">
      <button
        type="button"
        className={isActiveTab ? "nav-link active" : "nav-link"}
        onClick={dispatchChangeTab}
      >
        Global Feed
      </button>
    </li>
  );
}

function TagFilterTab() {
  const tag = useSelector((state) => state.articleList.tag);

  if (!tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <button type="button" className={isActiveTab ? "nav-link active" : "nav-link"}>
        <i className="ion-pound" /> {tag}
      </button>
    </li>
  );
}

function MainView() {
  const [confirm, setConfirm] = useState(true);
  console.log(confirm);
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab setConfirm={setConfirm} />

          <GlobalFeedTab setConfirm={setConfirm} />

          <TagFilterTab />
        </ul>
      </div>

      {confirm ? <ArticleAuthor /> : <ArticleList />}
    </div>
  );
}

export default memo(MainView);
