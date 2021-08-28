const app = require('./app');

app.listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`running on http://localhost:${app.get('PORT')}`);
});
