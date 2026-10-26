# Campus Parking Management System

Node.js + Express REST API with a simple fetch() frontend. Data is stored in `data.json`.

## Run

```bash
npm install
npm start
```

Open http://localhost:3000

## API

| Method | Endpoint            | Description                  | Success | Errors        |
|--------|---------------------|------------------------------|---------|---------------|
| GET    | /api/vehicles       | Retrieve all vehicles        | 200     |               |
| GET    | /api/vehicles/:id   | Retrieve one vehicle by ID   | 200     | 400, 404      |
| POST   | /api/vehicles       | Register a new vehicle       | 201     | 400, 409      |
| DELETE | /api/vehicles/:id   | Delete a vehicle by ID       | 200     | 400, 404      |

Plate numbers are unique (case-insensitive). Duplicate plates are rejected with 409.

## POST body

```json
{
  "plate_number": "ABC1234",
  "owner": "Juan Dela Cruz",
  "vehicle_type": "Car",
  "color": "Red"
}
```
