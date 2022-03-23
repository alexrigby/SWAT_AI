module.exports = function (csv, basinWb) {
  let dataset = csv.trim().split("\r\n");
 
  // Headings if needed:
  // let headings = dataset[0].split(",");
  let data = dataset.slice(1, dataset.length).map((el) => el.split(","));

  
  

  return data.filter((el) => {
    let earliestWbDate = new Date(parseDate(basinWb[0].date));
    let latestWbDate = new Date(parseDate(basinWb[basinWb.length - 1].date));
    let thisFlowDate = new Date(parseDate(el[0]));
    
    if (thisFlowDate >= earliestWbDate && thisFlowDate <= latestWbDate) {
      return true;
    }
  });
};



function parseDate(d) {
  let res = d.split("/");

  return `${res[1]}/${res[0]}/${res[2]}`;
}
