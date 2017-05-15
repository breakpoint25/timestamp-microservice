
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');

app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateVal = req.params.date_string;

  let date;
  let unixDate;
  let utcDate;

  if (Number(dateVal)) {
    // number/unix timestamp parameter recieved
    unixDate = Number(dateVal);

    date = new Date(unixDate);
    utcDate = date.toUTCString();

    if (utcDate === 'Invalid Date') {
      utcDate = 'Invalid Date';
      unixDate = null;
    }
  } else {
    // non-number timestamp received
    if (dateVal === undefined) {
      // parameter was not provided so using current time
      unixDate = new Date().getTime();
    } else {
      // convert to unix timestamp
      unixDate = new Date(dateVal).getTime();
    }

    utcDate = new Date(unixDate).toUTCString();

    if (isNaN(unixDate)) {
      utcDate = 'Invalid Date';
      unixDate = null;
    }
  }

  res.json({ unix: unixDate, utc: utcDate });
});

const listener = app.listen(port, () => {
  console.log('Your app is listening on port '.concat(listener.address().port));
});
