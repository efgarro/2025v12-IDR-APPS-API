import { secrets } from "../Utils/aws-secrets.js";

// console.log("secret");
// console.log(secrets);
// console.log("User/Password");
// console.log(secrets.user);
// console.log(secrets.password);

import pg from "pg";
const { Pool } = pg;

const scrPool = new Pool({
  host: "54.205.165.107",
  port: 5432,
  database: "2024v10-scr-db",
  user: secrets.user,
  password: secrets.password,
});

export const scrQuery = (text, params) => scrPool.query(text, params);

const blnPool = new Pool({
  host: "54.205.165.107",
  port: 5432,
  database: "2025v12-bln-db",
  user: secrets.user,
  password: secrets.password,
});

export const blnQuery = (text, params) => blnPool.query(text, params);
