module.exports = (d, startDate, endDate) => {
  const trim = d.map((d) => {
    return {
      jday: d.jday,
      mon: d.mon,
      day: d.day,
      yr: d.yr,
      precip: d.precip,
      snofall: d.snofall,
      snomlt: d.snomlt,
      et: d.et,
      pet: d.pet,
      wateryld: d.wateryld,
      perc: d.perc,
    };
  });

  const date = getDate(trim);
  for (var i = 0; i < trim.length; i++) {
    trim[i]["date"] = date[i];
  }


  //trims the date to ddates defined in app.js
  return trim.filter((el) => {
    let sDate = new Date(parseDate(startDate));
    let eDate = new Date(parseDate(endDate));
    let thisDate = new Date(parseDate(el.date));
    if (thisDate >= sDate && thisDate <= eDate) {
      return true;
    }
  });
  
};

function parseDate(d) {
  let res = d.split("/");

  return `${res[1]}/${res[0]}/${res[2]}`;
}

//Combines the day, month and year to make a new feild for vega-lite to plott from; "date"
function getDate(data) {
  return data.map((record) => record.day + "/" + record.mon + "/" + record.yr);
}
