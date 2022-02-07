import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ReactDOM from "react-dom";
import "./index.css";
import { items } from "./db.js";

function JobCard(props) {
  const { key, value, setTags, tags } = props;
  console.log(props);
  return (
    <div key={key} className="job">
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
      <div className="tags">
        {value.tags.map((tag) => {
          return (
            <a
              href="#"
              key={tag}
              className="tag"
              onClick={() => {
                if (tags.includes(tag)) return;
                setTags([...tags, tag]);
              }}
            >
              {tag}
            </a>
          );
        })}
      </div>
    </div>
  );
}

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  let pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <div>
      <button>&lt;&lt;</button>
      <button>&lt;</button>
      {pageNumbers.map((pageNumber) => (
        <button onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>
      ))}
      <button>&gt;</button>
      <button>&gt;&gt;</button>
    </div>
  );
};

function JobList({ items }) {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      <div className="header"></div>
      <div>
        {tags.map((tag) => {
          return (
            <a
              href="#"
              key={tag}
              className="tag"
              onClick={() => {
                const filteredTags = tags.filter((oneTag) => {
                  return oneTag !== tag;
                });
                setTags(filteredTags);
              }}
            >
              {tag}
            </a>
          );
        })}
      </div>
      <div className="job-list">
        {items
          .filter((item) => {
            if (tags.length === 0) return true;
            return item.tags.some((tag) => tags.includes(tag));
          })
          .map((item) => {
            return (
              <JobCard
                key={item.key}
                value={item}
                setTags={setTags}
                tags={tags}
              />
            );
          })}
        <Pagination
          currentPage={currentPage}
          totalPages={4}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

ReactDOM.render(<JobList items={items} />, document.querySelector("#root"));
