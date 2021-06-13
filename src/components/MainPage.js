import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  const pages = [];
  for (let i = 1; i <= Math.ceil(users.length / itemPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const renderPageNums = pages.map((number) => {
    return (
      <li
        className={currentPage == number ? "active" : ""}
        onClick={handleClick}
        key={number}
        id={number}
      >
        {number}
      </li>
    );
  });

  useEffect(() => {
    loadUsers();
    console.log("hello");
  }, []);
  const loadUsers = async () => {
    setLoading(true);
    const result = await axios.get("http://localhost:3002/users");
    setUsers(result.data.reverse());
    setLoading(false);
  };

  const DeleteUser = async (id) => {
    await axios.delete(`http://localhost:3002/users/${id}`);
    loadUsers();
  };

  const handleNextbtn = () => {
    if (currentPage == renderPageNums.length) {
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevbtn = () => {
    if (currentPage.length == 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <div className="container">
      <div className="py-4 table-responsive">
        <h1>Home</h1>
        <input
          className="rounded shadow m-3 p-2 btn-outline-primary"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table table-striped border shadow">
          <thead>
            <tr className="table-dark text-center">
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <h4>Loading...</h4>
            ) : (
              currentItems
                .filter((value) => {
                  if (search === "") {
                    return value;
                  } else if (
                    value.fname.toLowerCase().includes(search.toLowerCase()) ||
                    value.lname.toLowerCase().includes(search.toLowerCase()) ||
                    value.email.toLowerCase().includes(search.toLowerCase()) ||
                    value.Status.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((user, index) => {
                  return (
                    <>
                      <tr className="text-center ">
                        <th scope="row">{index + 1}</th>
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        <td>{user.email}</td>
                        <td>{user.Status}</td>
                        <td>
                          <Link
                            to={`/users/EditProfile/${user.id}`}
                            className="btn btn-outline-primary mt-1 me-2 "
                          >
                            Edit
                          </Link>
                          <Link
                            className="btn btn-danger mt-1"
                            onClick={() => DeleteUser(user.id)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Previos
          </button>
        </li>
        {renderPageNums}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
