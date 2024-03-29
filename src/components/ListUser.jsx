import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BsSearch } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { getListUser } from '../redux/actions/user';

// eslint-disable-next-line react/prop-types
export default function ListUser({ selectReceiver }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listUser } = useSelector((state) => state);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getListUser(search, navigate));
  }, [dispatch, navigate, search]);

  const submitSearch = (e) => {
    e.preventDefault();

    dispatch(getListUser(search, navigate));
  };

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be Logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        return navigate('/login');
      }

      return 0;
    });
  };

  return (
    <div className="left-menu col-4 col-md-3 p-4">
      <div className="d-block d-lg-flex justify-content-between">
        <h3 className="color-blue fw-bold">Nibiru Chat</h3>
        <div className="dropdown">
          <div
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="hamburger-item" />
            <div className="hamburger-item" style={{ width: '25px' }} />
            <div className="hamburger-item" />
          </div>
          <ul className="dropdown-menu mt-2" aria-labelledby="dropdownMenuLink">
            <li>
              <Link to="?tab=profile" type="button" className="dropdown-item my-3 text-white">
                <div className="d-flex">
                  <h5><AiOutlineUser /></h5>
                  <p className="ms-2 mt-1 p-0 m-0">
                    Profile
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item my-3 text-white"
                onClick={logout}
              >
                <div className="d-flex">
                  <h5><MdLogout /></h5>
                  <p className="ms-2 mt-1 p-0 m-0">
                    Logout
                  </p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <form onSubmit={submitSearch}>
        <div className="d-flex mt-4 align-items-center">
          <h5 className="me-2">
            <BsSearch />
          </h5>
          <input
            type="text"
            className="input-search form-control"
            placeholder="Search for any user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      <div className="mt-4">
        {listUser.isLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            {listUser.isError ? <h5>{listUser.error}</h5> : (
              <div>
                {listUser.data.length ? (
                  <>
                    {listUser.data.map((user) => (
                      <div key={user.id}>
                        {user.id !== localStorage.getItem('id') && (
                        <button onClick={() => selectReceiver(user.id)} type="button" className="btn text-dark w-100 mb-1">
                          <div className="user-item">
                            <div className="row w-100">
                              <div className="col-6 col-md-5 col-lg-3">
                                {user.photo ? (
                                  <img
                                    className="profile-rounded"
                                    src={`https://drive.google.com/uc?export=view&id=${user.photo}`}
                                    alt="Gambar Profile"
                                  />
                                ) : (
                                  <img
                                    className="profile-rounded"
                                    src="https://images227.netlify.app/mernuas/default.jpg"
                                    alt="Gambar Profile"
                                  />
                                )}
                              </div>
                              <div className="col-8 col-md-7 col-lg-9 text-start">
                                <div className="d-flex h-100 align-items-center ms-1">
                                  <p className="fw-bold p-0 m-0">{user.username.split(' ')[0]}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                        )}
                      </div>
                    ))}
                  </>
                ) : <h5>User tidak ditemukan</h5>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
