const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

function readData() {
  const text = fs.readFileSync("data.json", "utf8");
  return JSON.parse(text);
}

function saveData(vehicles) {
  fs.writeFileSync("data.json", JSON.stringify(vehicles, null, 2));
}

app.get("/api/vehicles", function (req, res) {
  const vehicles = readData();
  res.status(200).json(vehicles);
});

app.get("/api/vehicles/:id", function (req, res) {
  const id = Number(req.params.id);
  const vehicles = readData();

  const vehicle = vehicles.find(function (v) {
    return v.id === id;
  });

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.status(200).json(vehicle);
});

app.post("/api/vehicles", function (req, res) {
  const plate = req.body.plate_number;
  const owner = req.body.owner;
  const type = req.body.vehicle_type;
  const color = req.body.color;

  if (!plate || !owner || !type || !color) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const vehicles = readData();

  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].plate_number.toLowerCase() === plate.trim().toLowerCase()) {
      return res.status(409).json({ error: "Plate number already exists" });
    }
  }

  let newId = 1;
  if (vehicles.length > 0) {
    newId = vehicles[vehicles.length - 1].id + 1;
  }

  const newVehicle = {
    id: newId,
    plate_number: plate.trim().toUpperCase(),
    owner: owner.trim(),
    vehicle_type: type.trim(),
    color: color.trim()
  };

  vehicles.push(newVehicle);
  saveData(vehicles);

  res.status(201).json(newVehicle);
});

app.delete("/api/vehicles/:id", function (req, res) {
  const id = Number(req.params.id);
  const vehicles = readData();

  const index = vehicles.findIndex(function (v) {
    return v.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  const deleted = vehicles.splice(index, 1);
  saveData(vehicles);

  res.status(200).json({ message: "Vehicle deleted", vehicle: deleted[0] });
});

app.listen(PORT, function () {
  console.log("Server running at http://localhost:" + PORT);
});
