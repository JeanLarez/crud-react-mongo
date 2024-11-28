import { useState } from "react";

const URL = import.meta.env.VITE_URL_BACKEND

function App() {
  const [frutas, setFrutas] = useState([]);
  const [nuevaFruta, setNuevaFruta] = useState({
    id: "",
    imagen: "",
    nombre: "",
    importe: "",
    stock: "",
  });
  const [parametro, setParametro] = useState("");
  const [valor, setValor] = useState("");
  const [error, setError] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    id: "",
    propiedad: "",
    valor: "",
    body: {},
  });
  const [id, setID] = useState("");

  const fetchFrutas = async () => {
    const URL_BASE = `${URL}`;
    let URL_API = URL_BASE;

    try {
      if (parametro && valor) {
        URL_API = `${URL_BASE}/${parametro.toLowerCase().trim()}/${valor
          .toLowerCase()
          .trim()}`;
        console.log(URL_API);
      }

      const response = await fetch(URL_API);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setFrutas(data);
      setError(null); // Limpiar errores anteriores
    } catch (err) {
      setError(err.message);
      setFrutas([]); // Limpiar datos en caso de error
    }
  };

  const agregarFruta = async () => {
    try {
      const API_URL = `${URL}`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaFruta),
      });

      if (response.ok) {
        // obtenerFrutas(); // Actualizar lista
        setNuevaFruta(""); // Limpiar campo
      } else {
        console.error("Error al agregar fruta");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async () => {
    const URL_BASE = `${URL}/id`;
    try {
      const API_URL = `${URL_BASE}/${nuevosDatos.id}`;
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevosDatos.body),
      });

      if (response.ok) {
        alert("Fruta actualizada con éxito");
        fetchFrutas(); // Actualizar lista en el frontend
        setNuevosDatos({
          id: "",
          propiedad: "",
          valor: "",
          body: {},
        });
      } else {
        console.error("Error al actualizar la fruta");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const eliminarFruta = async () => {
    try {
      const API_URL = `${URL}/id/${id}`;
      const response = await fetch(API_URL, {
        method: "DELETE",
      });

      if (response.status === 204) {
        alert("Fruta eliminada con éxito");
        fetchFrutas(); // Actualizar lista en el frontend
      } else {
        console.error("Error al eliminar la fruta");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaFruta({
      ...nuevaFruta,
      [name]:
        name === "id" || name === "importe" || name === "stock"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de página
    fetchFrutas();
    setParametro("");
    setValor("");
  };

  return (
    <div>
      <h1>Listar Frutas</h1>

      {/* Formulario para búsqueda */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Introduce parametro de busqueda (e.g., id, nombre)"
          value={parametro}
          onChange={(e) => setParametro(e.target.value)}
        />

        <input
          type="text"
          placeholder="Introduce el valor de la busqueda"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      {/* Mostrar errores */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Mostrar resultados */}
      {frutas.length > 0 ? (
        <ul>
          {frutas.map((fruta) => (
            <li key={fruta.id}>
              {fruta.nombre} - {fruta.importe}$ {fruta.imagen}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No se encontraron frutas.</p>
      )}

      <div>
        <h1>Agregar Frutas</h1>

        <form onSubmit={agregarFruta}>
          <input
            name="id"
            type="text"
            placeholder="Introduce el id de la Fruta"
            value={nuevaFruta.id}
            onChange={handleChange}
          />

          <input
            name="imagen"
            type="text"
            placeholder="Introduce la imagen de la Fruta"
            value={nuevaFruta.imagen}
            onChange={handleChange}
          />

          <input
            name="nombre"
            type="text"
            placeholder="Introduce el nombre de la Fruta"
            value={nuevaFruta.nombre}
            onChange={handleChange}
          />

          <input
            name="importe"
            type="text"
            placeholder="Introduce el Importe"
            value={nuevaFruta.importe}
            onChange={handleChange}
          />

          <input
            name="stock"
            type="text"
            placeholder="Introduce el stock"
            value={nuevaFruta.stock}
            onChange={handleChange}
          />

          <button type="submit">Agregar</button>
        </form>
      </div>

      <div>
        <h1>Editar un campo</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
        >
          <label htmlFor="id">ID del recurso:</label>
          <input
            type="text"
            id="id"
            value={nuevosDatos.id}
            onChange={(e) =>
              setNuevosDatos({
                ...nuevosDatos,
                id: e.target.value,
              })
            }
            placeholder="ID del recurso"
          />

          <select
            id="campo"
            value={nuevosDatos.propiedad}
            onChange={(e) =>
              setNuevosDatos({
                ...nuevosDatos,
                propiedad: e.target.value,
              })
            }
          >
            <option value="">--Selecciona un campo--</option>
            <option value="nombre">Nombre</option>
            <option value="importe">Importe</option>
            <option value="stock">Stock</option>
            <option value="imagen">Imagen</option>
          </select>

          <input
            type="text"
            id="valor"
            value={nuevosDatos.valor}
            onChange={(e) =>
              setNuevosDatos({
                ...nuevosDatos,
                valor: e.target.value,
                body: { [nuevosDatos.propiedad]: e.target.value }, // Actualizar body dinámicamente
              })
            }
            placeholder="Nuevo valor"
          />

          <button type="submit">Actualizar</button>
        </form>
      </div>

      <div>
        <h1>Eliminar Fruta</h1>

        <form>
          <label htmlFor="id">ID del recurso:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setID(e.target.value)}
            placeholder="ID del recurso"
          />
        </form>

        <button onClick={() => eliminarFruta()}>Eliminar</button>
      </div>
    </div>
  );
}

export default App;
