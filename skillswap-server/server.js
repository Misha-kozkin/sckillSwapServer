const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Привязываем базу данных к auth для работы JWT
server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Имитация задержки сети (500мс)
server.use((req, res, next) => {
  setTimeout(next, 500);
});

// Подключаем авторизацию и роутер
server.use(auth);
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log('--------------------------------------------');
  console.log(`🚀 SkillSwap Server is running on http://localhost:${PORT}`);
  console.log(`📂 Database: db.json`);
  console.log('--------------------------------------------');
});