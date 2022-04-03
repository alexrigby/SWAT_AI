// VEGA-LITE PLOT OF PREDICTIONS AND SWAT FLOW

export function plotPredictions(data, inputCatchment ){
   var original = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    title: inputCatchment + " Flow (mm/day)",
    data: { values: data },
    repeat: {
      layer: ["predictedFlow", "SWATFlow"],
    },
    spec: {
      width: "container",
      height: "300",
      mark: "line",
      encoding: {
        x: {
          timeUnit: "yearmonthdate",
          field: "date",
          title: "date",
          type: "temporal",
          axis: { title: "" },
        },
        y: {
          field: { repeat: "layer" },
          type: "quantitative",
          axis: { title: "" },
        },
        color: {
          datum: { repeat: "layer" },
          type: "nominal",
          legend: {
            orient: "top-right",
          },
        },
        strokeDash: {
          datum: { repeat: "layer" },
          type: "nominal",
        },
      },
    },
  };
  vegaEmbed("#vis", original);
}
