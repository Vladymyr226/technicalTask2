import { TestData } from "./types/types"
const { JSON } = require("./data.js")
const express = require("express")
const fs = require("fs")
//Модуль для доступа к response-body
const bodyParser = require("body-parser")
const db = require("./db.js")

const server = express()

const Data: Array<TestData> = JSON
//Встроим модуль bodyParser в конвейер обработки HTTP-запросов
//Модули обработчики встраиваются в конвейер через сервер.use(express.use)
server.use(bodyParser.urlencoded({ extended: false }))

const SERVER_PORT = 3006

//Настраиваем сервер на серию get запросов
server.get("/", async (req, res) => {
  const [buy] = await db("Ceil").insert(Data).returning("*")

  res.send(buy)
})

//Настраиваем сервер на серию get запросов с параметрами
server.get("/quantity", async (req, res) => {

  const quantity = await db("Ceil").max("Quantity").first()

  const allTop = await db("Ceil").where({
    Quantity: quantity["max(`Quantity`)"],
  })

  res.send(allTop)
})

const service = server.listen(SERVER_PORT)
