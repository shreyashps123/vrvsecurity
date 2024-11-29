## 1) Get All Assets Details {admin}

- **URL**: `GET /assets`


- **Response**:
  `http/1.1 200 OK`
```
{

    assets:[
        {
            "id": 01,
            "name":"LAPTOP-D0IBV3SK",
            "model":"dell",
            "description":{
            "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
            "ram":"16.0 GB",
            "os":"windows 11"
            },
            "type":"hardware",
            "location":"pune"
        },
        {
            "id":02,
            "name":"LAPTOP-D0IBV4BK",
            "model":"asus",
            "description":{
            "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
            "ram":"16.0 GB",
            "os":"windows 11"
            },
            "type":"hardware",
            "location":"pune"
        },
        ...
      ]
    
    
}
```

## 2) Dispose Asset API (Admin)
- **URL**: `DELETE /assets/{asset-id}`

- **Response**:

`http/1.1 200 OK`
```
          {
              "message":"Asset deleted successfully"
          }
```


## 3) Get All Available Assets Details {admin/Employee}

- **URL**: `GET /assets`
- **Response**:
  `http/1.1 200 OK`
```
{

    
    assets:[
        {
            "id": 01,
            "name":"LAPTOP-D0IBV3SK",
            "model":"dell",
            "description":{
            "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
            "ram":"16.0 GB",
            "os":"windows 11"
            },
            "type":"hardware",
            "location":"pune"
        },
        {
            "name":"LAPTOP-D0IBV4BK",
            "model":"asus",
            "description":{
            "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
            "ram":"16.0 GB",
            "os":"windows 11"
            },
            "type":"hardware",
            "location":"pune"
        },
        ...
      ]
    
    
}
```

## 4) Delete Employee API (Admin)
- **URL**: `DELETE /employees/{employee-id}`

- **Response**:

`http/1.1 200 OK`
```
          {
              "message":"Employee deleted successfully"
          }
```


## 5) Get Employee's Assets Details {Employee}

- **URL**: `GET /assets/{employee-id}`


- **Response**:
  `http/1.1 200 OK`
```
{

    assets:[
        {
            "name":"LAPTOP-D0IBV3SK",
            "model":"dell",
            "description":{
            "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
            "ram":"16.0 GB",
            "os":"windows 11"
            },
            "type":"hardware",
            "location":"pune"
        },
        {
            "name":"LAPTOP-D0IBV4BK",
            "model":"asus",
            "description":{
            "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
            "ram":"16.0 GB",
            "os":"windows 11"
            },
            "type":"hardware",
            "location":"pune"
        },
        ...
      ]
    
    
}
```


## 6) Update password API
- **URL**: `PUT /employees/{employee-id}`

- **Request**:
```
  Content-Type: application/json
  Content-Length: 15
 ```
```
{
    "password":1234
}
```
- **Response**:

`http/1.1 200 OK`
```
{
    "message":"password updated"
}
```

## 7) Add Asset {admin}
- **URL**: `POST /assets/{asset-id}`
- **Request**:
    ```
    {
        "name":"LAPTOP-D0IBV3SK",
        "model":"dell",
        "description":{
        "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
        "ram":"16.0 GB",
        "os":"windows 11"
        },
        "type":"hardware",
        "location":"pune"
        
    }
    ```
- **Response**:

`http/1.1 200 OK`
  ```
  {
      "id: 2,
      "name":"LAPTOP-D0IBV3SK",
      "model":"dell",
      "description":{
      "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
      "ram":"16.0 GB",
      "os":"windows 11"
      },
      "type":"hardware",
      "location":"pune",
      "created_at":2024-08-01,
      "last_update":2024-08-01
        
  }
  ```



      
## 8) Register Employees API (Admin)
- **URL**: `POST /employees`

- **Request**:
  ```
  {
    "email": "sakshi@gmail.com",
    "first_name": "Sakshi",
    "last_name": "Bhingardive",
    "role": "Employee",
    "password": 1234,
    "date_of_joining": 2024-08-01,
    "location": "pune"
  }
  ```
- **Response**:

`http/1.1 201 Created`
```
  {
    "message": "Employee registered successfully"
  }
```

## 9) Update Asset
- **URL**: `PUT /assets/{asset-id}`

- **Request**:
```
  Content-Type: application/json
 ```
```
{
    "employee_id":3,
    "description":{
            "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
            "ram":"16.0 GB",
            "os":"windows 11"
            },
    "location":"Gujrat",
    "status":"assigned",
    "last_update":2024-08-01
}
```
- **Response**:

`http/1.1 200 OK`
```
{
    "message":"asset updated"
}
```
## 10) Get employee by id API

- **URL**: `GET /employees/{employee-id}`

- **Response**:

`http/1.1 200 OK`
```
  {
    "email": "sakshi@gmail.com",
    "first_name": "Sakshi",
    "last_name": "Bhingardive",
    "role": "Admin",
    "date_of_joining": 2024-08-01,
    "location": "Pune"
  }
```


## 11) Update Profile
- **URL**: `PUT /employee/{employee-id}`

- **Request**:
```
  Content-Type: application/json
 ```
```
{
    "email":"email@gmail.com",
    "location":"Gujrat",
}
```
- **Response**:

`http/1.1 200 OK`
```
{
    "message":"Profile updated"
}
```

## 12) Get All pending change asset requests (Admin)

- **URL**: `GET /requests`

- **Response**:
  `http/1.1 200 OK`
```
  {
    "employee_id": 2,
    "employee_name": "sakshi bhingardive",
    "asset_id": 3,
    "asset_name": "LAPTOP-D0IBV3SK",
    "request_type": "replace",
    "created_at": 2024-10-22 
  }
```


## 13) Request Asset {Employee}
- **URL**: `POST /requests`
- **Request**:
    ```
    {
        "employee_id": 2,
        "asset_name": "Laptop",
        "type":"replace",
        "reason": "i have no laptop"
        
    }
    ```
- **Response**:

`http/1.1 200 OK`
  ```
  {
      "id: 2,
      "employee_id": 2,
      "asset_id": 4
      "model":"dell",
      "type":"replace",
      "status":"pending",
      "created_at":2024-08-01
        
  }
  ```


## 14) Get All change asset requests (Employee)

- **URL**: `GET /requests/{employee-id}`

- **Response**:
  `http/1.1 200 OK`
```
  {
    "asset_id": 3,
    "asset_name": "LAPTOP-D0IBV3SK",
    "request_type": "replace",
    "status": "pending"
    "created_at": 2024-10-22 
  }
```


## 15)Approve/Disapprove Request for Asset {admin}
- **URL**: `PUT /requests/{request-id}`
- **Request**:
    ```
    {
        "status": "Approved/Disapproved"
    }
    ```
- **Response**:
`http/1.1 200 OK`
  ```
  {
      "id: 2,
      "employee_id": 2,
      "asset_id": 4
      "model":"dell",
      "type":"replace",
      "status":"Approved/Disapproved",
      "created_at":2024-08-01
  }
  ```

## 16) Get All employees {admin}

- **URL**: `GET /employees`
- **Response**:
  `http/1.1 200 OK`
```
{

    
    employees:[
        {
            "id": 1,
            "email": "sakshi@gmail.com",
            "first_name": "sakshi",
            "last_name": "bhingardive",
            "date_of_joining": 2024-08-01,
            "location": "pune"
        },
        {
            "id": 2,
            "email": "shreyash@gmail.com",
            "first_name": "shreyash",
            "last_name": "shinde",
            "date_of_joining": 2024-08-01,
            "location": "pune"
        },
        ...
      ]
    
    
}
```
      

## 17) Send Email After Registration {Employee}
- **URL**: `POST https://api.mailersend.com/v1/email`
- **Request**:
    ```
    {
      "reciptant":"shreyash@gmail.com",
      "from":"sakshi@gmail.com"
        
    }
    ```
- **Response**:

`http/1.1 200 OK`
  ```
  {
      "id: 2,
      "employee_id": 2,
      "asset_id": 4
      "model":"dell",
      "type":"replace",
      "status":"pending",
      "date_from":2024-08-01,
      "Date_to":2024-08-01,
      "event" : ["delivered"]
        
  }
  ```

## 18) Login API (Admin/Employee)
- **URL**: `POST /login`
- **Request**:
  ```
  {
    "email": "sakshi@gmail.com",
    "password": 1234,
  }
  ```
- **Response**:

`http/1.1 200 Ok`
```
  {
    "message": "Login successful"
  }
```


## 19) Get All requests made by that Employee {admin}

- **URL**: `GET /requests/{employee-id}`
- **Response**:
  `http/1.1 200 OK`
```
{

    
    requests:[
        {
            "id: 2,
            "employee_id": 2,
            "asset_id": 4,
            "asset_name": "LAPTOP-D0IBV3SK",
            "model":"dell",
            "type":"replace",
            "status":"Approved/Disapproved",
            "created_at":2024-08-01
        },
        ...
      ]
    
    
}
```
[//]: # (## 20&#41;  Get Employee Profile Details &#40;Admin&#41;)

[//]: # (- **URL**: `GET /employees/{employee-id}`)

[//]: # ()
[//]: # (- **Response**:)

[//]: # ()
[//]: # (`http/1.1 200 Ok`)

[//]: # (```)

[//]: # (  {)

[//]: # (          "id": 2,)

[//]: # (          "email": "shreyash@gmail.com",)

[//]: # (          "first_name": "shreyash",)

[//]: # (          "last_name": "shinde",)

[//]: # (          "date_of_joining": 2024-08-01,)

[//]: # (          "location": "pune")

[//]: # (  })

[//]: # (```)

## 20) Forgot Password API (Admin/Employee)
- **URL**: `PUT /employees`

- **Request**:
  ```
  {
    "email": "sakshi@gmail.com",
    "new_password": 1234,
    "retype_password": 1234,
  }
  ```
- **Response**:

`http/1.1 200 Ok`
```
  {
    "message": "password updated successfully!"
  }
```


## 21) Get Asset by ID (Admin/Employee)

- **URL**: `GET /assets/{asset-id}`

- **Response**:
  `http/1.1 200 OK`
```
  {
    "asset_id": 3,
    "employee_id": 4,
    "asset_name": "LAPTOP-D0IBV3SK",
    "model": "dell",
    "description":{
            "processor":"AMD Ryzen 7 PRO 4750U with Radeon Graphics   1.70 GHz",
            "ram":"16.0 GB",
            "os":"windows 11"
            },
    "type":"hardware",
    "location":"pune"
  }
```

## 22) Get Asset ID by name (Employee)

- **URL**: `GET /assets/{name}`

- **Response**:
  `http/1.1 200 OK`
```
  {
    IDs=[
    "asset_id": 3,
    "asset_id":4
    ]
    
  }
```


