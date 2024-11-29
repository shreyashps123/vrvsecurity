## Getting Started
These instructions will help you set up and run both the frontend and backend of the project on your local machine.

### Prerequisites
Docker, Node.js and npm (Node Package Manager) should be installed on your system.

### Create .env
Create a .env file inside backend folder and type "JWT_SECRET=secret" into it, Or just paste the below text into it

### Note, .env file is needed for login, otherwise the project won't run
```
JWT_SECRET=secret
```

### Run compose file
Navigate to root directory in terminal and run following command.Ensure your docker is running

```shell
docker compose up --build
```

**Connect to postgres database**
```sh
username = user
password = pass
database = asset-management
host = localhost
```


**Run queries inside db.sql file inside src folder within backend folder.
You can also copy all the queries inside db.sql and run them in your query console**

```

asset-management/
├── .idea/                 # IDE configuration files
├── frontend/              # Frontend code for the application
├── backend/               # Backend code for the application
│   └── src/
│       └── db/
│           └── db.sql     # Database schema and scripts
├── README.md              # Project documentation
└── compose.yml            # Docker Compose file for containerization

```

### Access the Project

Once the project is set up and running, you can access it in your browser at:

[http://localhost:5173/](http://localhost:5173/)

Click the link above or copy it into your browser to view the application.


### Login Credentials
An initial dummy admin and employee have been inserted into database by running db.sql, below is the login credentials

```
Admin
username = shreyash@gmail.com
password = shreyash

Employee
username = user@gamil.com
password = shreyash
```

### Or you could just create a new user of your choice by clicking on signUp


