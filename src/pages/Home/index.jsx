import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
} from "../../controllers/product/renderer.js";

import { FormProduct } from "../../components/FormProduct";
import { TableProduct } from "../../components/TableProduct";
import { Modal } from "../../components/Modal/index.jsx";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";

import { validInputs, valueProductInit } from "./validInputs.js";

export const Home = () => {
  const [dataTable, setDataTable] = useState([]);
  const [valueProduct, setValueProduct] = useState(valueProductInit);
  const [deleteData, setDeleteDate] = useState();
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const handleEdit = (data) => {
    setValueProduct(data);
    setEdit(true);
  };

  const controlModalDelete = (data) => {
    setModal(true);
    setDeleteDate(data);
  };

  const handleDelete = (data) => {
    setModal(false);
    if (data) {
      deleteProduct(deleteData).then((res) => {
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("produto deletado com sucesso!");
          setDataTable((prev) => prev.filter((item) => item.id !== res.id));
        }
      });
    }
  };

  const submitProduct = (product) => {
    const valid = validInputs(product);
    if (!valid) return;

    if (edit) {
      try {
        editProduct(product).then((res) => {
          if (!res) throw new Error("");

          if (res?.error) {
            toast.error(res.error);
          } else {
            toast.success("Produto editado com sucesso!");
            setDataTable((prev) => {
              return prev.map((item) => {
                if (res.id === item.id) return res;
                return item;
              });
            });
          }
        });
      } catch (error) {
        toast.error("Algum erro aconteceu na edição do  produto!");
      }
    } else {
      try {
        createProduct(product).then((res) => {
          if (res?.error) {
            toast.error(res.error);
          } else {
            toast.success("produto criado com sucesso!");
            setDataTable((prev) => [...prev, res]);
          }
        });
      } catch (error) {
        toast.error("Algum erro aconteceu na criação do  produto!");
      }
    }
  };

  const handleValueProps = () => {
    setValueProduct(valueProductInit);
    setEdit(false);
  };

  const actions = (item) => (
    <>
      {<Pencil onClick={() => handleEdit(item)} />}
      {<Trash onClick={() => controlModalDelete(item)} />}
    </>
  );

  useEffect(() => {
    try {
      getAllProduct().then((res) => {
        if (!res) throw new Error("");
        setDataTable(() => res);
      });
    } catch (error) {
      toast.error("Algum erro aconteceu na busca dos dados!");
    }
  }, []);

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

      {dataTable.length > 0 ? (
        <>
          <h1>Todos os produtos</h1>
          <TableProduct dataTable={dataTable} actions={actions} />
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          Cadastre seus produtos para visualizar aqui
        </div>
      )}
    </main>
  );
};
