// https://observablehq.com/@vega/multi-series-line-chart-with-tooltip@298
import define1 from "./7764a40fe6b83ca1@413.js";
import define2 from "./45e5909f35596963@476.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Multi Series Line Chart with Tooltip

Porting the [Multi Series Line Chart with Tooltip Vega-Lite JSON example](https://vega.github.io/vega-lite/examples/interactive_multi_line_pivot_tooltip.html) to the Vega Lite API.`
)});
  main.variable(observer("chart")).define("chart", ["vl","width"], function(vl,width)
{
  // The selection
  const hover = vl.selectSingle("hover")
    .on("mouseover")
    .encodings("x")
    .nearest(true)
    .clear("moouseout")
    .init({ x: { year: 2005, month: 1, date: 1 } });
  
  // The line and point marks. Notice how we filter the points on hover
  const lineAndPoint = vl.layer(
    vl.markLine(),
    vl.markPoint()
      .transform(vl.filter(hover))
  ).encode(
    vl.y().fieldQ("price"),
    vl.color().fieldN("symbol")    
  );
  
  // The rule helps as a proxy for the hover. We draw rules all over the chart
  // so we can easily find the nearest one. We then hide them using opacity 0
  const rule =vl.markRule({ strokeWidth: 0.5, tooltip: true })
    // We pivot the data so we can show all the stock prices at once
    .transform(vl.pivot("symbol").value("price").groupby(["date"]))
    .encode(
      vl.opacity().value(0).if(hover, vl.value(0.7)),
      vl.tooltip([vl.fieldT("date"), "AAPL", "AMZN", "GOOG", "IBM", "MSFT"])
    )    
    .select(hover);

  return vl
    .layer(lineAndPoint, rule )
    .encode(vl.x().fieldT("date"))
    .data("data/stocks.csv")
    .width(width - 150)
    .height(300)
    .render();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md` ## Rules as a guide for the hover

The key for this chart is on the usage of a rule as landmark for the hover effect. We draw all the rules, so we can use them for finding the nearest selected point, then we hide all the others. 

Check below how the chart looks like when we leave all the rules drawn.`
)});
  main.variable(observer("viewof chartWithRules")).define("viewof chartWithRules", ["vl","width"], function(vl,width)
{
  // The selection
  const hover = vl
    .selectSingle("hover")
    .on("mouseover")
    .encodings("x")
    .nearest(true)
    .clear("moouseout")
    .init({ x: { year: 2005, month: 1, date: 1 } });
  
  // The line and point marks. Notice how we filter the points on hover
  const lineAndPoint = vl.layer(
    vl.markLine(),
    vl.markPoint()
      .transform(vl.filter(hover))
  ).encode(
    vl.y().fieldQ("price"),
    vl.color().fieldN("symbol")    
  );
  
  // The rule helps as a proxy for the hover. We draw rules all over the chart
  // so we can easily find the nearest one. We then hide them using opacity 0
  const rule =vl.markRule({ strokeWidth: 1, tooltip: true })
    .transform(vl.pivot("symbol").value("price").groupby(["date"]))
    .encode(
      vl.color().value("#aaa").if(hover, vl.value("#333")),
      vl.tooltip(["AAPL", "AMZN", "GOOG", "IBM", "MSFT"])
    )    
    .select(hover);

  return vl
    .layer(lineAndPoint, rule )
    .encode(vl.x().fieldT("date"))
    .data("data/stocks.csv")
    .width(width - 150)
    .height(300)
    .render();
}
);
  main.variable(observer("chartWithRules")).define("chartWithRules", ["Generators", "viewof chartWithRules"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md` ## Pivot for the tooltip

The example also uses pivot to show all the stock prices at once on the tooltip. See below on \`data_0\` how the data is transformed moving the symbols into columns. This way each row has access to all the prices. Compare with the original dataset \`source_0\` where each row has only one symbol per date`
)});
  main.variable(observer()).define(["vegaDataViewer","chartWithRules"], function(vegaDataViewer,chartWithRules){return(
vegaDataViewer(chartWithRules, {dataset: "data_0"})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Vega-Lite JSON

Compare to the Vega-Lite JSON version`
)});
  main.variable(observer()).define(["vegaEmbed","data"], function(vegaEmbed,data){return(
vegaEmbed({
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {"values": data},
  "width": 400,
  "height": 300,
  "encoding": {"x": {"field": "date", "type": "temporal"}},
  "layer": [
    {
      "encoding": {
        "color": {"field": "symbol", "type": "nominal"},
        "y": {"field": "price", "type": "quantitative"}
      },
      "layer": [
        {"mark": "line"},
        {"transform": [{"filter": {"selection": "hover"}}], "mark": "point"}
      ]
    },
    {
      "transform": [{"pivot": "symbol", "value": "price", "groupby": ["date"]}],
      "mark": "rule",
      "encoding": {
        "opacity": {
          "condition": {"value": 0.3, "selection": "hover"},
          "value": 0
        },
        "tooltip": [
          {"field": "AAPL", "type": "quantitative"},
          {"field": "AMZN", "type": "quantitative"},
          {"field": "GOOG", "type": "quantitative"},
          {"field": "IBM", "type": "quantitative"},
          {"field": "MSFT", "type": "quantitative"}
        ]
      },
      "selection": {
        "hover": {
          "type": "single",
          "fields": ["date"],
          "nearest": true,
          "on": "mouseover",
          "empty": "none",
          "clear": "mouseout"
        }
      }
    }
  ]
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
## Imports`
)});
  main.variable(observer("vegaEmbed")).define("vegaEmbed", ["require"], function(require){return(
require("vega-embed@5")
)});
  main.variable(observer("vegaDatasets")).define("vegaDatasets", ["require"], function(require){return(
require("vega-datasets")
)});
  main.variable(observer("data")).define("data", ["vegaDatasets"], function(vegaDatasets){return(
vegaDatasets["stocks.csv"]()
)});
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  const child2 = runtime.module(define2);
  main.import("vegaDataViewer", child2);
  return main;
}
