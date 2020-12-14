import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const Links = ({ links, setLinks, setCurrentId }) => {
  useEffect(() => {
    const getLink = async () => {
      await db.collection("links").onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLinks(data);
      });
    };

    getLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeleteLink = async (id) => {
    if (window.confirm("Estas seguro de eliminar el enlace")) {
      try {
        await db.collection("links").doc(id).delete();

        toast("Enlace eliminado", {
          type: "error",
          autoClose: 2000,
        });
        console.log("task deleted");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Links</h1>

      {links.map((link) => (
        <div key={link.id} className="card mb-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h4>{link.name}</h4>
              <div>
                <i
                  className="material-icons mr-2"
                  onClick={() => setCurrentId(link.id)}
                >
                  create
                </i>
                <i
                  className="material-icons text-danger"
                  onClick={() => onDeleteLink(link.id)}
                >
                  close
                </i>
              </div>
            </div>
            <p>{link.description}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              Ir al Sitio Web
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
