async function createVisualizations() {
  // ---- DATA LOADING ----- //

  //const airportsEmissionFr = await aq.load("data/emissionsfr@1.csv", { using: aq.fromCSV }); 
  //var airportsEmissionFr = await aq.load("data/emissionsfr@1.csv".text(), { using: aq.fromCSV }); 

  var airports = await aq.loadCSV('globe/data/my_almamater.csv');
//  var airportsEmissionFr = await aq.loadCSV('data/emissionsfr@1.csv');

 console.log(airports);

  // EXERCISES
  createVisualizationsQ5(airports);
}

function createVisualizationsQ5(airports) {


  var selection5 =  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 300,
    "height": 300,
    "projection": {
      "type": "orthographic",
      "rotate": {"expr": "[rotate_latitude, rotate_longitude, 0]"}
    },
    "params": [
      {
        "name": "rotate_longitude",
        "value": -30,
        "bind": {"input": "range", "min": -90, "max": 90, "step": 1}
      },
      {
        "name": "rotate_latitude",
        "value": -30,
        "bind": {"input": "range", "min": -90, "max": 90, "step": 1}
      },
      {
        "name": "Point",
        "value": 3,
      }
      /*
      {
        "name": "Point",
        "value": 3,
        "bind": {"input": "range", "min": 0, "max": 6, "step": 0.1}
      }
      */
    ],
    "layer": [
      {
        "data": {"sphere": true},
        "mark": {"type": "geoshape", "fill": "black"}
      },
      {
        "data": {
          "name": "world",
          "url": "globe/data/world-110m.json",
          "format": {"type": "topojson", "feature": "countries"}
        },
        "mark": {"type": "geoshape", "fill": "grey", "stroke": "black"}
      },
      {
         "data": {

          values: airports.objects(),
/*
          "name": "airports",
          "url": "data/airports.csv",
          "format": {"type": "csv", "property": "features"}
                              */

        
        },
        "transform": [
          //{"calculate": "datum.geometry.coordinates[0]", "as": "longitude"},
          //{"calculate": "datum.geometry.coordinates[1]", "as": "latitude"},
          //{
          //  "filter": "(rotate0 * -1) - 90 < datum.longitude && datum.longitude < (rotate0 * -1) + 90 && (rotate1 * -1) - 90 < datum.latitude && datum.latitude < (rotate1 * -1) + 90"
          //},
          //{"calculate": "datum.properties.mag", "as": "magnitude"}
        ],
        "mark": {"type": "circle", "color": "white", "opacity": 0.75},
        "encoding": {
          "longitude": {"field": "longitude_deg", "type": "quantitative"},
          "latitude": {"field": "latitude_deg", "type": "quantitative"},
          
          "size": {
            "legend": null,
            "field": "elevation_ft",
            "type": "quantitative",
            "scale": {
              "type": "sqrt",
              "domain": [0, 100],
              "range": [0, {"expr": "pow(Point, 3)"}]
            }
          },
          /**/
          "tooltip": [{"field": "name"},
          {"field": "abbreviation"},
          {"field": "type"},
          {"field": "iso_country"},
          {"field": "city"},
          {"field": "local_code"},
          {"field": "degree"}  
  
  
        
        ]
        }
      }
    ]
  };
  
  vegaEmbed("#selection_5", selection5);

}

createVisualizations();


