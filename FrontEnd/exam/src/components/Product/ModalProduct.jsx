import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { createProduct, updateProduct } from '../../redux/slices/product';
import Swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';

const ModalProduct = (props) => {
  const dispatch = useDispatch();
  const { action, dataModalProduct } = props;
  const productState = {
    name: "",
    type: "",
    price: "",
    id: null
  }
  const validInputDefault = {
    name: true,
    type: true,
    price: true,
  }
  const [productData, setproductData] = useState(productState);
  const [validInput, setValidInput] = useState(validInputDefault);
  useEffect(() => {
    if (action === "UPDATE") {
      setproductData({ ...dataModalProduct });
    }
  }, [dataModalProduct, action]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setproductData({ ...productData, [name]: value });
    setValidInput(prevValidInput => ({
      ...prevValidInput,
      [name]: value.trim() !== ''
    }));
  }
 

  const confirmAddProduct = async (e) => {
    e.preventDefault();
      const { id } = productData;
      let res;
      if (action === "CREATE") {
        res = await dispatch(createProduct(productData)).then(unwrapResult)
        .then(response => {
          handleCloseModal();
          setproductData(productData)
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
        res = await dispatch(updateProduct({id: id,  data:productData})).then(unwrapResult)
        
        .then(response =>{
          handleCloseModal();
          setproductData({ ...productData })
          Swal.fire({
            title: 'Success!',
            text: response.payload,
            icon: 'success'
          });
        }).catch(error=>{
          Swal.fire({
            title: 'Error!',
            text: "Update Error",
            icon: 'error'
          });
          setValidInput({ ...validInput })
        })
        console.log(res);
      }
  }
  const handleCloseModal = () => {
    props.onHide();
    setproductData(productState);
    setValidInput(validInputDefault);
  }

  return (
    <Modal
      show={props.isShow}
      onHide={() => handleCloseModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>{action === "CREATE" ? "CREATE NEW PRODUCT" : "UPDATE PRODUCT"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form  >
          <div className='content-body row'>
            <div className='col-12 col-sm-6 form-group'>
              <label>Name :</label>
              <input type="text"
                className={validInput.name ? 'form-control' : 'form-control is-invalid'}
                name="name"
                value={productData.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-12 col-sm-6 form-group'>
              <label>Type:</label>
              <select
                className={validInput.type ? 'form-select' : 'form-control is-invalid'}
                name="type"
                value={productData.type || ''}
                onChange={handleInputChange}
              >
                <option>vui lòng chọn type</option>
                <option value="LOGITECH">LOGITECH</option>
                <option value="ASUS">ASUS</option>
                <option value="AKKO">AKKO</option>

              </select>
            </div>
            <div className='col-12 col-sm-6 form-group'>
              <label>Price :</label>
              <input type="text"
                className={validInput.price ? 'form-control' : 'form-control is-invalid'}
                name="price"
                value={productData.price || ''}
                onChange={handleInputChange}
              />
            </div>

          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmAddProduct} >
          {action === "CREATE" ? "SAVE" : "UPDATE"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalProduct;
