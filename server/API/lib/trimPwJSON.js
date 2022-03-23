module.exports = (d, startDate, endDate) => {


    const date = getDate(d);
    for (var i = 0; i < d.length; i++) {
      d[i]["date"] = date[i];
    }

    //trims the date to ddates defined in app.js
    const trimDate =  d.filter((el) => {
      let sDate = new Date(parseDate(startDate));
      let eDate = new Date(parseDate(endDate));
      let thisDate = new Date(parseDate(el.date));
      if (thisDate >= sDate && thisDate <= eDate) {
        return true;
      }
     });

     return trimDate.map((d) => {
        return {
         lai: d.lai,
         tmx: d.tmx,
         tmn: d.tmn,
         tmpav: d.tmpav,
         solarad: d.solarad,
         phubas: d.phubas0,
       };
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
  