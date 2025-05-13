const express = require("express");
const http = require("http");
const { SerialPort } = require("serialport");
const XLSX = require("xlsx");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const portSerial = new SerialPort({ path: "COM3", baudRate: 9600 }); // ⚠️ Cambia COM3 si es necesario

let data = [];

portSerial.on("data", (chunk) => {
  const line = chunk.toString().trim();
  const [valor, tiempo] = line.split(",");
  if (!valor || !tiempo) return;

  const punto = { valor: parseInt(valor), tiempo: parseInt(tiempo) };
  data.push(punto);

  // Guardar a Excel
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Datos");
  XLSX.writeFile(wb, "datos.xlsx");

  // Emitir en tiempo real a clientes conectados
  io.emit("nuevo-dato", punto);
});

app.use(express.static("public"));

app.get("/datos", (req, res) => {
  res.download("datos.xlsx");
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
