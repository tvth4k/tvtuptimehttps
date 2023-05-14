const Database = require("@replit/database")
const db = new Database()
const axios = require('axios');
(async() => {
  db.get("urls").then(value => {
    if (!value) db.set('urls', []).then(() => {
      console.log("SETUP DONE")
    });
  });

  const fetch = async data => {
    for (url of data) {
      await axios.get(url)
        .then(res => res = null)
        .catch(e => e = null);
    }
    data = null;
  }
  
  setInterval(() => {
    db.get('urls').then(async(data) => { 
      let m = Math.ceil(data.length / 3);
      let n = Math.ceil(2 * data.length / 3);
      let DATA = [];
      DATA[0] = data.slice(0, m);
      DATA[1] = data.slice(m, n);
      DATA[2] = data.slice(n, data.length);

      DATA.forEach(fetch);
      DATA = m = n = null;
    })
  }, 20000);
  
  const express = require('express');
  
  const app = express();
  
  app.get('/', async(req, res) => {
    if ('add' in req.query) {
      let urls = await db.get('urls');
      if (urls.includes(req.query.add)) {
        res.send({
          status: false,
          msg: 'already have'
        });
        return;
      } else {
        urls.push(req.query.add);
        db.set('urls', urls).then(() => {
          console.log(`added ${req.query.add}`);
        });
        res.send({
          status: true,
          msg: 'added'
        });
        return;
      }
    }
    res.send('Hello Express app!')
  });
  
  app.listen(3000, () => {
    console.log('server started');
  });
})()