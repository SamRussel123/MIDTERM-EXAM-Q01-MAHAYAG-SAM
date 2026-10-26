Campus Parking Management System

Node.js + Express REST API with a simple fetch() frontend. Data is stored in `data.json`.

To Make It Run

```bash
npm install
npm start
```
Chromse or Any Browser
Open http://localhost:3000

The  API

| Method or process  | Endpoint or Target | Description       | Success | Errors        
|                    |                     |                              |         |
| GET                | /api/vehicles       | Retrieve all vehicles        | 200     |               
| GET                | /api/vehicles/:id   | Retrieve one vehicle by ID   | 200     | 400, 404      
| POST               | /api/vehicles       | Register a new vehicle       | 201     | 400, 409      
| DELETE             | /api/vehicles/:id   | Delete a vehicle by ID       | 200     | 400, 404      

Plate numbers are unique (case-insensitive). Duplicate plates are rejected with 409.

 POST body

```json
{
  "plate_number": "SAM1234",
  "owner": "Sam Russel Mahayag",
  "vehicle_type": "Car",
  "color": "Red"
}
```
