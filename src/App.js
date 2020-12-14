import { useState } from "react";
import { LinkForm } from "./components/LinkForm";
import { Links } from "./components/Links";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const addOrEditLink = async (linkObject) => {
    try {
      if (!currentId) {
        await db.collection("links").add(linkObject);

        toast("Enlace Agregado", {
          type: "success",
          autoClose: 2500,
        });
        console.log("tarea agregada");
      } else {
        await db.collection("links").doc(currentId).update(linkObject);

        toast("Enlace Actualizado", {
          type: "success",
          autoClose: 2500,
        });
        setCurrentId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        {/* <h1 className="text-center mt-5 mb-5">CRUD - LINKS - FIRESTORE</h1> */}
        <div className="row">
          <div className="col-md-7 pr-md-5">
            <LinkForm addOrEdit={addOrEditLink} currentId={currentId} />
          </div>
          <div className="col-md-5 pl-md-5">
            <Links
              links={links}
              setLinks={setLinks}
              setCurrentId={setCurrentId}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
