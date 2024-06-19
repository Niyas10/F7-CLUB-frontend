import React, { useEffect, useState } from 'react';
import './UserList.css';
import { userList, userBlock } from '../../api/adminApi';
import Pagination from '../common/Pagination';

function UserList() {
  const [users, setUsers] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);

  const dataPerPage = 4;

  useEffect(() => {
    userList()
      .then((res) => {
        setUsers(res?.data?.users);
        setFilterData(res?.data?.users);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const blockUnblockUser = async (userId, isBlocked) => {
    try {
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, isBlocked: !isBlocked } : user
      );
      setUsers(updatedUsers);
      setFilterData(updatedUsers);
      setActiveModal(null);
      await userBlock(userId, !isBlocked);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const openModal = (userId) => {
    setActiveModal(userId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    setCurrentPage(1); 
    const filteredUsers = users.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filteredUsers);
  };

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const usersSinglePage = filterData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filterData.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  return (
    <>
    <div style={{marginTop:'50px',marginBottom:'30px'}}>
      <h1 style={{textAlign:'center'}}>User List</h1>
    </div>
      <div className='container-fluid'>
        <form style={{textAlign:'end',marginBottom:'30px'}}>
          <input
            name="search"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search"
            type="text"
          />
        </form>
      </div>
      <div className="userlist">
        <table className="table align-middle mb-0 bg-white table-bordered">
          <thead className="bg-light">
            <tr style={{textAlign:'center'}}>
              <th>ID</th>
              <th className="rounded-top-left">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="rounded-top-right">Actions</th>
            </tr>
          </thead>
          <tbody style={{textAlign:'center'}}>
            {usersSinglePage.length > 0 ? (
              usersSinglePage.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.isVerified ? 'Verified' : 'Not Verified'}</td>
                  <td>
                    {data.isBlocked ? (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => openModal(data._id)}
                      >
                       Block
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => openModal(data._id)}
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      <Pagination
        numbers={numbers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

   
      {users.map((data) => (
        <div
          key={`popup-modal-${data._id}`}
          className={`modal fade ${activeModal === data._id ? 'show d-block' : 'd-none'}`}
          tabIndex={-1}
          aria-labelledby={`popup-modal-${data._id}`}
          aria-hidden={activeModal !== data._id}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {data.isBlocked ? `Unblock ${data.name}` : `Block ${data.name}`}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>
                  {data.isBlocked
                    ? `Are you sure you want to unblock ${data.name}?`
                    : `Are you sure you want to block ${data.name}?`}
                </p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => blockUnblockUser(data._id, data.isBlocked)}
                >
                  Yes, I'm sure
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserList; 