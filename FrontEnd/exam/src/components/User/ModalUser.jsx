import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import userService from '../../service/user.service';
import { useDispatch } from 'react-redux';
import { createUsers, updateUsers } from '../../redux/slices/user';
import { unwrapResult } from '@reduxjs/toolkit';

const ModalUser = (props) => {
    const dispatch = useDispatch();
    const { action, dataModalUser } = props;
    const userState = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        role: "",
        id: null
    }
    const validInputDefault = {
        firstname: true,
        lastname: true,
        username: true,
        password: true,
    }
    const [userData, setUserData] = useState(userState);
    const [validInput, setValidInput] = useState(validInputDefault);


    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({ ...dataModalUser });
        }
    }, [dataModalUser, action]);
    const handleInputChange = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setValidInput(prevValidInput => ({
            ...prevValidInput,
            [name]: value.trim() !== ''
        }));
    }

    const confirmAddUser = async (e) => {
        e.preventDefault();
        const { id } = userData;

        let res
        if (action === "CREATE") {
            res = await dispatch(createUsers(userData)).then(unwrapResult)
                .then(response => {
                    handleCloseModal();
                    setUserData(userData)
                    Swal.fire({
                        title: 'Success!',
                        text: "Create Success",
                        icon: 'success'
                    });
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error!',
                        text: "Create Error",
                        icon: 'error'
                    });
                    setValidInput({ ...validInput })
                });
        } else {
            res = await dispatch(updateUsers({ id: id, data: userData })).then(unwrapResult)

                .then(response => {
                    handleCloseModal();
                    setUserData({ ...userData })
                    Swal.fire({
                        title: 'Success!',
                        text: response.payload,
                        icon: 'success'
                    });
                }).catch(error => {
                    Swal.fire({
                        title: 'Error!',
                        text: "Update Error",
                        icon: 'error'
                    });
                    setValidInput({ ...validInput })
                })

        }
        // if(check === true){
        //     let res = action === "CREATE" ?
        //     await userService.createUser(userData)
        //     : await userService.updateUser(userData);
        //     if(res && res.status ===201){
        //         props.onHide();
        //         setUserData({...userState})
        //         Swal.fire({
        //             title: 'Success!',
        //             text: res.data.EM,
        //             icon: 'success'
        //          });
        //     }
        //     if(res && res.status !==201){
        //         Swal.fire({
        //             title: 'Error!',
        //             text: res.data.EM,
        //             icon: 'error'
        //          });
        //          setValidInput({...validInput})
        //     }
        // }
    }
    const handleCloseModal = () => {
        props.onHide();
        setUserData(userState);
        setValidInput(validInputDefault);
    }
    return (
        <>
            <Modal
                show={props.isShow}
                fullscreen='sm'
                className='modal-user'
                onHide={() => handleCloseModal()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.action === "CREATE" ? "CREATE NEW USER" : "UPDATE A NEW"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form  >
                        <div className='content-body row'>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>firstname :</label>
                                <input type="text"
                                    className={validInput.firstname ? 'form-control' : 'form-control is-invalid'}
                                    name="firstname"
                                    value={userData.firstname || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>lastname :</label>
                                <input type="text"
                                    className={validInput.lastname ? 'form-control' : 'form-control is-invalid'}
                                    name="lastname"
                                    value={userData.lastname || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>username(<span className='red'>*</span>):</label>
                                <input disabled={action === "CREATE" ? false : true}
                                    type="text"
                                    className={validInput.username ? 'form-control' : 'form-control is-invalid'}
                                    name="username"
                                    value={userData.username || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>role:</label>
                                <select
                                    className='form-select'
                                    name="role"
                                    value={userData.role || ''}
                                    onChange={handleInputChange}
                                >
                                    <option defaultValue="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>

                                </select>
                            </div>
                            {
                                action === "CREATE"
                                &&
                                <div className='col-12 col-sm-6 form-group'>
                                    <label>Password(<span className='red'>*</span>):</label>
                                    <input type="password"
                                        className={validInput.password ? 'form-control' : 'form-control is-invalid'}
                                        name="password"
                                        value={userData.password || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmAddUser}>
                        {action === "CREATE" ? "SAVE" : "UPDATE"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;