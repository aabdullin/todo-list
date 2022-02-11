import React, { useState, useEffect } from "react";
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

function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

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
      </div>
    </div>
  );
}

ReactDOM.render(<JobList items={items} />, document.querySelector("#root"));
