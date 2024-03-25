import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts, searchProducts, sortProducts, sortProductsById, sortProductsByType } from '../../redux/slices/product';
import ModalProduct from './ModalProduct';
import Swal from 'sweetalert2';
import thumbnail from '../../assets/img/akko.jpg'
import './Product.scss'
import ReactPaginate from 'react-paginate';
import { Dropdown } from 'react-bootstrap';
import { Each } from './Each';

const Product = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products.content);
    const status = useSelector((state) => state.product.status);
    const error = useSelector((state) => state.product.error);
    const totalPage = useSelector((state) => state.product.products.totalPages);
    console.log(products);

    console.log(Array.isArray(products));

    const [isShow, setIsShow] = useState(false);
    const [actionModalProduct, setActionModalProduct] = useState("");
    const [dataModalProduct, setDataModalProduct] = useState({});

    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);


    useEffect(() => {
        dispatch(searchProducts({searchTerm, pageNumber, pageSize }));
    }, [dispatch, searchTerm,pageNumber, pageSize]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1)
        dispatch(searchProducts({ searchTerm, pageNumber:1, pageSize }));

    };


    const handleSortOrder = (order) => {
        setPageNumber(1)
        dispatch(sortProducts({ order, pageNumber: 1, pageSize }));
    };
    const handleAddProduct = () => {
        setActionModalProduct("CREATE");
        setIsShow(true);
    };
    const handleEditProduct = (product) => {
        setActionModalProduct("UPDATE");
        setDataModalProduct(product);
        setIsShow(true);
    }
    const handleDeleteProduct = (product) => {
        Swal.fire({
            title: `Bạn có chắc xóa sản phẩm ${product.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đúng, xóa nó đi!",
            cancelButtonText: "Khoan"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(product.id))
                    .then(response => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: "Đã xóa bàn phím thành công",
                            icon: 'success'
                        });
                        setPageNumber(1)
                        dispatch(searchProducts({searchTerm, pageNumber:1, pageSize }));
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
    const handleClose = async () => {
        setPageNumber(1)
        dispatch(searchProducts({ searchTerm, pageNumber:1, pageSize }));
        setIsShow(false);
    }
    const handlePageClick = async (e) => {
        setPageNumber(+e.selected + 1);
    }

    return (
        <>
            <div className='container mt-3'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-sm-12 d-sm-flex align-items-center mb-3'>
                        <div className='col-12 col-sm-3 mr-auto'>
                            <h2>List Products</h2>
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
                                onClick={handleAddProduct}
                            >Add Product</button>
                        </div>

                    </div>
                    <div className='col-12 col-sm-12 d-sm-flex align-items-center mb-3'>
                        <div className='col-12 col-sm-12 mr-auto'>
                            <div className='col-12 col-sm-3 mr-auto'>
                                <h5>Sắp xếp theo</h5>
                            </div>
                            <div className='col-12 col-sm-12 d-sm-flex'>
                                <button
                                    className='btn btn-outline-primary me-3'
                                    onClick={() => { handleSortOrder("desc") }}
                                >Giá Cao - Thấp</button>
                                <button
                                    className='btn btn-outline-primary me-3'
                                    onClick={() => { handleSortOrder("asc") }}
                                >Giá Thấp - Cao</button>
                                <button
                                    className='btn btn-outline-danger me-3'
                                    onClick={() => { dispatch(sortProductsById({ searchTerm:"desc", pageNumber:1, pageSize })); }}
                                >Mới nhất</button>
                                <Dropdown className='col-12 col-sm-3'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Tìm theo hãng: 
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setSearchTerm('AKKO')}>AKKO</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSearchTerm('ASUS')}>ASUS</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSearchTerm('LOGITECH')}>LOGITECH</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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
                        <>
                            <table className='table table-striped table-bordered table-hover table-sm align-middle text-center' >
                                <thead>
                                    <tr>
                                        <th >#</th>
                                        <th>Thumbnail</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Price($)</th>
                                        <th>CreateDate</th>
                                        <th >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <Each of={products} render={(item, index)=>{
                                        <tr key={item.id}>
                                        <td >{(pageNumber - 1)*pageSize + i + 1} </td>
                                        <td className='thumbnail-product'>
                                            <img src={thumbnail} alt="thumbnail" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.price}</td>
                                        <td>{item.createDate}</td>
                                        <td className="align-middle">
                                            <i className='bi bi-pencil-square m-2'
                                                onClick={() => handleEditProduct(item)}
                                            ></i>
                                            <i className="bi bi-trash3 m-2"
                                                onClick={() => handleDeleteProduct(item)}
                                            ></i>
                                        </td>
                                    </tr>
                                    }}/> */}
                                    {Array.isArray(products) && products.length > 0 ?
                                        <>
                                            {products?.map((item, i) => (
                                                <tr key={item.id}>
                                                    <td >{(pageNumber - 1)*pageSize + i + 1} </td>
                                                    <td className='thumbnail-product'>
                                                        <img src={thumbnail} alt="thumbnail" />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.type}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.createDate}</td>
                                                    <td className="align-middle">
                                                        <i className='bi bi-pencil-square m-2'
                                                            onClick={() => handleEditProduct(item)}
                                                        ></i>
                                                        <i className="bi bi-trash3 m-2"
                                                            onClick={() => handleDeleteProduct(item)}
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
                        </>
                    )}
                    {totalPage > 0 &&
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
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
            <ModalProduct
                isShow={isShow}
                onHide={handleClose}
                action={actionModalProduct}
                dataModalProduct={dataModalProduct}
            />
        </>
    );
};

export default Product;