//ADDS OBSERVED FLOW DATA TO PREDICTED (SEDIMENT) DATA AND ASIGNES X AND Y
//ADDS ORIGIONAL EXAMPLES TO ARAY ASSINGED TO X AND Y
// USES TFVIS TO RENDER A SCATERPLOT WITH PREDICTED AND ORIGIONAL VALUES


export async function testModel(model,  trainingData) {
  

    //adds the index and the training output data to an array to be plotted
    const trainingVsIndexArray = trainingData.map((d, i) => {
        return { x: d.index, y: d.ys }
    }).sort((a, b) => a.x - b.x);


    const date = trainingData.map((d) => {
          return {date: new Date(d.xs[4] + '-' + d.xs[5] + '-' + d.xs[6]),
                  index: d.index
        }
        });

    //render line chart with both predicted and training output data on it
    tfvis.render.linechart(
        { name: 'Training Flow (mm/day)', styles: { width: 1000 } },
        { values: [ trainingVsIndexArray], series: [ "flow" ], styles: { color: ["rgba(255, 0, 0, 0.5)", "rgba(0, 0, 255, 0.5)"] } },
        {
            xLabel: 'index',
            yLabel: 'flow',
            height: 300,
            width: 1000,
        }
    );

}


export default {
    testModel,
}