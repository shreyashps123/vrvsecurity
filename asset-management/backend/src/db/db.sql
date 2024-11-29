CREATE TABLE "employees" (
                             "id" SERIAL PRIMARY KEY,
                             "email" varchar UNIQUE ,
                             "firstname" varchar,
                             "lastname" varchar,
                             "role" varchar,
                             "password" varchar,
                             "date_of_joining" date,
                             "location" varchar,
                            "phone_number" bigint,
                         "status" varchar default 'active'
);

CREATE TABLE "assets" (
                          "id" SERIAL PRIMARY KEY,
                          "employee_id" integer,
                          "name" varchar UNIQUE,
                          "brand" varchar,
                          "description" varchar,
                          "type" varchar,
                          "location" varchar,
                          "status" varchar,
                          "created_at" date,
                          "last_updated" date
);

CREATE TABLE "employee_assets_history" (
                                           "id" SERIAL PRIMARY KEY,
                                           "asset_id" integer,
                                           "employee_id" integer,
                                           "from_date" date,
                                           "to_date" date
);

CREATE TABLE "request_asset" (
                                 "id" SERIAL PRIMARY KEY,
                                 "employee_id" integer NOT NULL,
                                 "asset_id" integer NOT NULL,
                                 "created_at" timestamp,
                                 "status" varchar default 'pending',
                                 UNIQUE ("employee_id", "asset_id")
);

INSERT INTO employees(email, firstname, lastname, role, password, date_of_joining, location,
                      phone_number)
VALUES ('shreyash@gmail.com', 'shreyash','shinde','admin','$2b$10$pyyGFNXMyHW4.ROabg0ZxOa/gO49V2xaPVRja2ZI47h7Ac2f2s/ui','2024-11-21','pune',9881955564);

INSERT INTO employees(email, firstname, lastname, role, password, date_of_joining, location,
                      phone_number)
VALUES ('user@gmail.com', 'user','user','employee','$2b$10$pyyGFNXMyHW4.ROabg0ZxOa/gO49V2xaPVRja2ZI47h7Ac2f2s/ui','2024-11-21','pune',9381958534);

ALTER TABLE "assets" ADD FOREIGN KEY ("employee_id") REFERENCES "employees" ("id");

ALTER TABLE "request_asset" ADD FOREIGN KEY ("employee_id") REFERENCES "employees" ("id");

ALTER TABLE "request_asset" ADD FOREIGN KEY ("asset_id") REFERENCES "assets" ("id");

ALTER TABLE "employee_assets_history" ADD FOREIGN KEY ("asset_id") REFERENCES "assets" ("id");

ALTER TABLE "employee_assets_history" ADD FOREIGN KEY ("employee_id") REFERENCES "employees" ("id");

