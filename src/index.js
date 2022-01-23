import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { items } from "./db.js";

function JobCard(props) {
  const { key, value } = props;
  console.log(props);
  return (
    <div className="job">
      <div className="one">
        <div className="company">
          <span>{value.name}</span>
          {value.new && <span className="new-job">New</span>}
          {value.featured && <span className="featured-job">Featured</span>}
        </div>
        <div className="position">{value.position}</div>
        <div className="meta-info"></div>
        {value.date} {value.type} {value.location}
      </div>
      <div className="tags">{value.tags}</div>
    </div>
  );
}

function JobList({ items }) {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="header"></div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <div className="job-list">
        {items
          .filter((item) => {
            return item.name.startsWith(search);
          })
          .map((item) => {
            return <JobCard key={item.key} value={item} />;
          })}
      </div>
    </div>
  );
}

ReactDOM.render(<JobList items={items} />, document.querySelector("#root"));
