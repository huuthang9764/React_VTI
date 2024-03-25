import React, { useEffect, useState } from 'react';
import { deleteUsers, searchUsers } from '../../redux/slices/user'
import { useDispatch, useSelector } from "react-redux";
import './User.scss'
import ModalUser from './ModalUser';
import accImg from '../../assets/img/account.png'
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { getUserInfo } from '../../utils/helpers';

const User = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userAbout.users.content);
    const status = useSelector((state) => state.userAbout.status);
    const error = useSelector((state) => state.userAbout.error);
    const totalPage = useSelector((state) => state.userAbout.users.totalPages);

    //
    const [isShow, setIsShow] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("");
    const [dataModalUser, setDataModalUser] = useState({});

    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        dispatch(searchUsers({ searchTerm, pageNumber, pageSize }));
    }, [dispatch, searchTerm, pageNumber, pageSize]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1)
        dispatch(searchUsers({ searchTerm, pageNumber, pageSize }));
    };
    const handleAddUser = () => {
        setActionModalUser("CREATE");
        setIsShow(true);
    };
    const handleClose = () => {
        setPageNumber(1)
        dispatch(searchUsers({ searchTerm, pageNumber, pageSize }));
        setIsShow(false);
    }
    const handleEditUser = (user) => {
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShow(true);
    }
    const handleDeleteUser = (user) => {
        const storeUser = getUserInfo();
        const userInLocalStorage = storeUser.id === user.id;
        if (userInLocalStorage) {
            Swal.fire({
                title: 'Error!',
                text: 'Không thể xóa user đăng nhập .',
                icon: 'error'
            });
            return;
        }
        Swal.fire({
            title: `Bạn có chắc xóa người dùng ${user.username}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đúng, xóa nó đi!",
            cancelButtonText: "Khoan"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUsers(user.id))
                    .then(response => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: "Đã xóa người dùng thành công",
                            icon: 'success'
                        });
                        setPageNumber(1)
                        dispatch(searchUsers({ searchTerm, pageNumber: 1, pageSize }));
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Không thể xóa .',
                            icon: 'error'
                        });
                    });
            }
        })
    }
    const handlePageClick = async (e) => {
        setPageNumber(+e.selected + 1);
    }
    return (
        <>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-12 col-sm-12 d-sm-flex align-items-center mb-3'>
                        <div className='col-12 col-sm-3 mr-auto'>
                            <h2>List User</h2>
                        </div>
                        <div className='col-12 col-sm-4 me-auto mb-3 mb-sm-0'>
                            <form className="d-flex" onSubmit={handleSearchSubmit}>
                                <input className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        <div className='col-12 col-sm-3'>
                            <button
                                className='btn btn-primary'
                                onClick={handleAddUser}
                            >Add User</button>
                        </div>

                    </div>
                    <div className='col-12 col-sm-12 d-sm-flex align-items-center mb-3'>
                        <div className='col-12 col-sm-12 mr-auto'>
                            <div className='col-12 col-sm-12 d-sm-flex'>
                                <Dropdown className='col-12 col-sm-3'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Số lượng sản phẩm: {pageSize}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setPageSize(+5)}>5</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setPageSize(+10)}>10</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setPageSize(+20)}>20</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                    </div>
                    {status === 'loading' ? (
                        <div>Loading...</div>
                    ) : status === 'failed' ? (
                        <div>Error: {error}</div>
                    ) : (
                        <table className='table table-striped table-bordered table-hover table-sm align-middle text-center' >
                            <thead>
                                <tr>
                                    <th className='table-action'>#</th>
                                    <th>Thumbnail</th>
                                    <th>Username</th>
                                    <th>firstname</th>
                                    <th>lastname</th>
                                    <th>role</th>
                                    <th>createDate</th>
                                    <th className='table-action'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) && users.length > 0 ?
                                    <>
                                        {users.map((item, i) => (
                                            <tr key={item.id}>
                                                <td className='table-action'>{(pageNumber - 1) * pageSize + i + 1}</td>
                                                <td className='thumbnail-accImg'>
                                                    <img src={accImg} alt="accImg" />
                                                </td>
                                                <td>{item.username}</td>
                                                <td>{item.firstname}</td>
                                                <td>{item.lastname}</td>
                                                <td>{item.role}</td>
                                                <td>{item.createDate}</td>
                                                <td className='table-action'>
                                                    <i className='bi bi-pencil-square m-2'
                                                        onClick={() => handleEditUser(item)}
                                                    ></i>
                                                    <i className="bi bi-trash3 m-2"
                                                        onClick={() => handleDeleteUser(item)}
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </> :
                                    <>
                                        <tr>
                                            <th>Not Found Product</th>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    )}
                    {totalPage > 0 &&
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={1}
                            marginPagesDisplayed={1}
                            pageCount={totalPage}
                            forcePage={pageNumber - 1}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    }
                </div>
            </div>
            <ModalUser
                isShow={isShow}
                onHide={handleClose}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
};

export default User;