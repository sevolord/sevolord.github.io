//https://metanit.com/web/nodejs/
// создаем подключение к бд с помощью sequelize, к бд ms sql с помощью tedious
const Sequelize = require('sequelize');
//задаем параметры подключения к бд
const sequelize = new Sequelize('myDB', 'admin', '123', {
  host: 'localhost',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
// проходим authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  //------------------------------------------------------------------------------
  //создаем модель таблички
  const Conference_visitors = sequelize.define("Conference_visitors", {
    myID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    myName: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    myPhone: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    myEmail: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    mySection: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    myDateOfBirth: {
      type: Sequelize.DATE,
      allowNull: true
    },
    myReportTopic: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });
  //синхронизируемся с табличкой, вернее проверяем соответствие структуры таблицы и модели
  //{force: true} пересоздает таблицу, если что не так
  sequelize.sync(/*{force: true}*/).then(result=>{
    //console.log(result); //дофига информации
  })
  .catch(err=> console.log(err));
//------------------------------------------------------------------------------
  //запускаем сервер с помощью Express.js
  const express = require('express');
  const fs = require('fs');
  
  const app = express();
  
  app.get('/', (req, res) => {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.type('html').send(data);
      }
    });
  });
  
  app.get('/about', (req, res) => {
    res.send('About page');
  });
  
  app.use((req, res) => {
    res.sendStatus(404);
  });
  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  