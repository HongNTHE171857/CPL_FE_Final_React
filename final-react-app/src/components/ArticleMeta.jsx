import React from "react";

const ArticleMeta = () => {
  function dateFormatter(date) {
    return new Date(date).toLocaleDateString("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return <div></div>;
};

export default ArticleMeta;
