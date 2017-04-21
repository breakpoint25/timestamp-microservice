const express = require('express');

const app = express();

app.get('/:dateVal', (req, res) => {
  // console.log(req);
  const dateVal = req.params.dateVal;
  let date;
  let unixDate;
  let nuturalDate;

  if (Number(dateVal) / 1 || Number(dateVal) === 0) {
    unixDate = dateVal;
    date = new Date(dateVal * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    options.timeZone = 'UTC';
    nuturalDate = date.toLocaleDateString('en-US', options);

    if (nuturalDate === 'Invalid Date') {
      nuturalDate = 'null';
      unixDate = 'null';
    }
  } else {
    nuturalDate = dateVal;
    unixDate = Math.floor(Date.parse(nuturalDate.concat(' 00:00:00 UTC')) / 1000);

    if (isNaN(unixDate)) {
      nuturalDate = 'null';
      unixDate = 'null';
    } else {
      unixDate = unixDate.toString();
    }
  }

  res.json({ unix: unixDate, natural: nuturalDate });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
