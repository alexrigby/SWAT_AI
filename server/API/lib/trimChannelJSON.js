module.exports = (d, startDate, endDate, basinArea) => {
 
    //trims the date to ddates defined in app.js
    const trimDate =  d.filter((el) => {
      let sDate = new Date(parseDate(startDate));
      let eDate = new Date(parseDate(endDate));
      let thisDate = new Date(el.date);
      if (thisDate >= sDate && thisDate <= eDate) {
        return true;
      }
     });

      // returns flow for the correct dates converted to mm/day 
     return trimDate.map((d) => {
        return {
         swatFlow: convertFlow(d.SWATFlow, basinArea),
       };
    });
    
  };
  

  function parseDate(d) {
    let res = d.split("/");
    return `${res[1]}/${res[0]}/${res[2]}`;
  }
  

  function convertFlow(d, area) {
      let flowM3 =  (d*1000*24*3600)/area
      return flowM3
  }