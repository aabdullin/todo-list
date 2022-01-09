import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import items from "./db.js";

function JobCard(props) {
  const { key, value } = props;
  console.log(props);
  return (
    <>
      {key} {value.name} {value.position}
    </>
  );
}

function JobList(items) {
  return (
    <div>
      {items.map((item) => {
        return <JobCard key={item.key} value={item} />;
      })}
    </div>
  );
}

ReactDOM.render(<JobList items={items} />, document.querySelector("#root"));
