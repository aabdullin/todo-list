import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useAxios from "axios-hooks";
import "./index.css";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#yourAppElement");

function App() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  let pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }
  // const pageNumbers = new Array(totalPages)
  //   .fill()
  //   .map((item, index) => index + 1);
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

const ProfileCard = () => {};

const UserCard = (props) => {
  console.log(props);
  const { key, value } = props;
  return (
    <span className="border">
      {key} {value.first_name} {value.last_name}
      {value.email}
    </span>
  );
};

const UserList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [{ data, loading, error }] = useAxios(
    `https://reqres.in/api/users?page=${currentPage}&per_page=4`
  );

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  console.log(data);

  return (
    <div className="d-flex flex-row">
      <input
        type="text"
        name="name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {data.data.map((item) => {
        return <UserCard key={item.id} value={item} />;
      })}
      <Pagination
        currentPage={currentPage}
        totalPages={data.total_pages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

ReactDOM.render(<UserList />, document.querySelector("#root"));
