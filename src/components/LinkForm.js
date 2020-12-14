import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import { useForm } from "../hooks/useForm";

export const LinkForm = ({ addOrEdit, currentId }) => {
  const [formValues, setValuesForm, handleInputChange, reset] = useForm({
    url: "",
    name: "",
    description: "",
  });

  const { url, name, description } = formValues;

  useEffect(() => {
    if (!currentId) {
      setValuesForm({
        url: "",
        name: "",
        description: "",
      });
    } else {
      getLinkById(currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  const validateUrl = (url) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      url
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || url === "") {
      toast("Todos los campos son obligatorios", {
        type: "info",
        autoClose: 2500,
      });
      return;
    }

    if (!validateUrl(url)) {
      toast("Link no Valido", {
        type: "warning",
        autoClose: 2500,
      });
      return;
    }

    addOrEdit(formValues);
    reset();
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValuesForm({ id: doc.id, ...doc.data() });
  };

  return (
    <>
      <h1 className="text-center mb-4">
        {currentId ? "Editar Link" : "Agregar Link"}
      </h1>
      <form onSubmit={handleSubmit} className="card card-body">
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-text bg-light">
              <i className="material-icons">insert_link</i>
            </div>
            <input
              type="text"
              className="form-control"
              name="url"
              value={url}
              onChange={handleInputChange}
              placeholder="Ejemplo: https://someurl.com"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-text bg-light">
              <i className="material-icons">create</i>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Nombre del Sitio Web"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            value={description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Escribe una descripción..."
            autoComplete="off"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          {currentId ? "Editar" : "Guardar "}
        </button>
      </form>
    </>
  );
};
