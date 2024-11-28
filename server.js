const express = require("express");
const { connectToMongoDB, disconnectFromMongoDB } = require("./src/mongodb");
const app = express();
const cors = require("cors");
process.loadEnvFile();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");

  next();
});

app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de Frutas");
});

app.get("/frutas", async (req, res) => {
  try {
    //conexion a la base de datos
    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    const db = client.db("frutas");
    const frutas = await db.collection("frutas").find().toArray();
    res.json(frutas);
  } catch (error) {
    res.status(500).send("Error al obtener las frutas de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.get("/frutas/id/:id", async (req, res) => {
  try {
    const idFruta = parseInt(req.params.id) || 0;
    //conexion a la base de datos
    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    const db = client.db("frutas");
    const fruta = await db.collection("frutas").findOne({ id: idFruta });

    !fruta
      ? res.status(404).json({ mensaje: "Error en la solicitud" })
      : res.status(200).json([fruta]);
  } catch (error) {
    res.status(500).send("Error al obtener la fruta de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.get("/frutas/nombre/:nombre", async (req, res) => {
  try {
    const nombreFruta = req.params.nombre;

    //conexion a la base de datos
    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    const db = client.db("frutas");
    const fruta = await db
      .collection("frutas")
      .find({ nombre: RegExp(nombreFruta, "i") })
      .toArray();

    fruta.length > 0
      ? res.status(200).json(fruta)
      : res.status(404).json({ mensaje: "Error en la solicitud" });
  } catch (error) {
    res.status(500).send("Error al obtener la fruta de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.get("/frutas/importe/:precio", async (req, res) => {
  try {
    const precioFruta = parseInt(req.params.precio);

    //conexion a la base de datos
    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    const db = client.db("frutas");
    const fruta = await db
      .collection("frutas")
      .find({ importe: { $gte: precioFruta } })
      .toArray();

    fruta.length > 0
      ? res.status(200).json(fruta)
      : res.status(404).json({ mensaje: "Error en la solicitud" });
  } catch (error) {
    res.status(500).send("Error al obtener la fruta de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.post("/frutas", async (req, res) => {
  try {
    const nuevaFruta = req.body;

    if (nuevaFruta === undefined) {
      res.status(400).send("Error en el formato de datos a crear");
    }

    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    const db = client.db("frutas");
    const collection = db.collection("frutas");
    await collection.insertOne(nuevaFruta);
    console.log("Nuevo recurso agregado");
    res.status(201).send(nuevaFruta);
  } catch (error) {
    res.status(500).send("Error al intentar agregar un nuevo recurso");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.put("/frutas/id/:id", async (req, res) => {
  try {
    const idFruta = parseInt(req.params.id);
    const nuevosDatos = req.body;

    if (!nuevosDatos) {
      res.status(400).send("Error en el formato de datos a crear");
    }

    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    const db = client.db("frutas");
    const collection = db.collection("frutas");
    await collection.updateOne({ id: idFruta }, { $set: nuevosDatos });
    // console.log(`La fruta con el ${idFruta} fue modificada`)
    res.status(200).send(nuevosDatos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  } finally {
    await disconnectFromMongoDB();
  }
});

app.delete("/frutas/id/:id", async (req, res) => {
  try {
    const idFruta = parseInt(req.params.id);

    if (!idFruta) {
      res.status(400).send("Error en el formato de datos a eliminar");
    }

    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    const db = client.db("frutas");
    const collection = db.collection("frutas");
    const resultado = await collection.deleteOne({ id: idFruta });

    resultado.deletedCount === 0
      ? res
          .status(404)
          .send("No se encontro ninguna fruta con el id seleccionado")
      : res
          .status(204)
          .json({ mensaje: "El se recurso se eliminó correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  } finally {
    await disconnectFromMongoDB();
  }
});

app.listen(PORT, () =>
  console.log(`Servidor ejecutandose en el puerto ${PORT}`)
);
