



module.exports = function (csv, mainChannel) {

    let dataset = csv.trim().replace(/ +/gm, "").split("\r\n")
    
    let data = dataset.slice(3, dataset.length).map((el) => el.split(","));

    var mainChan = []
    for (var i = 0; i < data.length; i++) {
        if (data[i][6] == mainChannel) {

            let channelData = {
                SWATFlow: data[i][47],
                date: data[i][1] + '/' + data[i][2] + '/' + data[i][3], 
            }
        mainChan.push(channelData)
        }
    }
    
    return mainChan;
 
}