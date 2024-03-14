import React, { useEffect, useState } from "react";

import {
  createProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
} from "../../controllers/product/renderer.js";

import { FormProduct } from "../../components/FormProduct";
import { TabaleProduct } from "../../components/TableProduct";
import { Modal } from "../../components/Modal/index.jsx";

import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";

export const Home = () => {
  const [response, setResponse] = useState();
  const [dataTable, setDataTable] = useState();
  const [valueProduct, setValuProduct] = useState();
  const [deleteData, setDeleteDate] = useState();
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const handleEdit = (data) => {
    setValuProduct(data);
    setEdit(true);
  };

  const controlModalDelete = (data) => {
    setModal(true);
    setDeleteDate(data);
  };

  const handleDelete = (data) => {
    if (data) {
      deleteProduct(deleteData).then((res) => {
        if (typeof res === "object") {
          setDataTable((prev) => prev.filter((item) => item.id !== res.id));
        }
      });
    }
    setModal(false);
  };

  const submitProduct = (product) => {
    if (edit) {
      editProduct(product).then((res) => {
        setDataTable((prev) => {
          return prev.map((item) => {
            if (res.id === item.id) return res;
            return item;
          });
        });
      });
    } else {
      createProduct(product).then((res) => {
        setResponse(JSON.stringify(res));
      });
    }
  };

  const handleValueProps = () => {
    setValuProduct(null);
    setEdit(false);
  };

  useEffect(() => {
    getAllProduct().then((res) => setDataTable(() => res));
  }, []);

  const actions = (item) => {
    return (
      <>
        {<Pencil onClick={() => handleEdit(item)} />}
        {<Trash onClick={() => handleDelete(item)} />}
      </>
    );
  };

  return (
    <main>
      {modal && (
        <Modal
          code={deleteData.id}
          handleClick={(data) => handleDelete(data)}
        />
      )}
      <FormProduct
        value={valueProduct}
        handleValue={handleValueProps}
        onSubmit={submitProduct}
        edit={edit}
      />
      {dataTable && <TabaleProduct dataTable={dataTable} actions={actions} />}
      {response && <div>{response}</div>}
    </main>
  );
};