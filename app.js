const path = require('node:path');
const express = require('express');

const indexRouter = require('./routes/indexRouter');
const addNewRouter = require('./routes/addNewRouter');
const editRouter = require('./routes/editRouter');
const deleteRouter = require('./routes/deleteRouter');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3000;

const helmet = require('helmet');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/new', addNewRouter);
app.use('/edit', editRouter);
app.use('/delete', deleteRouter);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

app.listen(PORT, () => {});
