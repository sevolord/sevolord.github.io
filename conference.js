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
  
  // Serve static files from the "public" directory
  app.use('/public',express.static('public'));
  app.use('/pages',express.static('pages'));
  
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

    //парсим нажатие кнопки 
  // const bodyParser = require('body-parser');
  // app.use(bodyParser.json());
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({extended: false});
  // Handle POST requests to the /submit route
  //app.post('/submit', (req, res) => {
  app.post('/submit', urlencodedParser, function (req, res) {
  // Insert the data into the database
  console.log('gotcha!');
  Conference_visitors.create({
    myName: req.body.name,
    myPhone: req.body.phone,
    myEmail: req.body.email,
    mySection: req.body.conference-sections,
    myDateOfBirth: Date(req.body.date-of-birth),
    myReportTopic: req.body.report-topic
  }).then(() => {
    console.log('Data inserted into the Conference_visitors table');
  }).catch(err => {
    console.error(err);
  });
  });

  //выводим табличку
  // Set the view engine to pug
  app.set('view engine', 'pug');

  // Handle GET requests to the /visitors route
  app.get('/visitors', async (req, res) => {
    // Fetch the rows of the table
    const visitors = await Conference_visitors.findAll();

    // Render the visitors template with the visitors data
    res.render('visitors', { visitors });
  });

  //слушаем сервер  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
