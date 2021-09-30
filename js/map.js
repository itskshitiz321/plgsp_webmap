$(document).ready(function () {
  // setup a leaflet map in mapid division
  var mymap = L.map("mapid").setView([28.2096, 83.9856], 12);
  console.log("i am after map javascript");

  // Adding tile layer to map
  var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );
  //osm tile layer
  var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  });
//google map tile layer
  googleStreets = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  ).addTo(mymap);

  // assign tile layer to display in leaflet control
  var baseMaps = {
    "Google Map": googleStreets,
    "Open Street Map": osm,
    Satellite: googleSat,
  };
  // add leaflet layers control in map
  layerswitcher = L.control
    .layers(baseMaps, {}, { collapsed: false })
    .addTo(mymap);
// north arrow to leaflet
  var northarrow = L.control({ position: "topright" });

  //add image inside control, This function will run after northarrow will be added to map

  northarrow.onAdd = function () {
    var img = L.DomUtil.create("img");
    img.src = "img/northarrow.png";
    img.style.width = "100px";
    img.style.height = "100px";

    return img;
  };
  // now add northarrow to map
  northarrow.addTo(mymap);
// defining custom marker
  var myIcon = L.icon({
    iconUrl:  'http://168.119.174.18:7070/static/assets/marker.png' ,
    iconSize: [20, 20]
  });

// jquery function to load geojson files
  $.getJSON("geojson/nepal_province.geojson", function (data) {
    Province = L.geoJson(data, {
      style: {
        fillOpacity: 0,
        color: "	#FF0000",
        opacity: 1,
        weight: 1,
      },
      onEachFeature: function (feature, layer) {
        // this loop iterates over each file 
        layer.bindTooltip(String(feature.properties.Province_n), {
          permanent: true,
          direction: "center",
        });
      },
    }).addTo(mymap);
    // adding Nepal shapefile to layerswitcher
    layerswitcher.addOverlay(Province, "Nepal");
  });

  $.getJSON("geojson/modiruralmun.geojson", function (data) {
    console.log(data);
    gapanapa = L.geoJson(data, {
      //defining style for geojson polygon feature 
      style: {
        fillOpacity: 0,
        color: "	#FF0000",
        opacity: 1,
        weight: 1,
      },
      onEachFeature: function (feature, layer) {
      
        
        layer.bindTooltip(String(feature.properties.NEW_WARD_N), {
          permanent: true,
          direction: "center",
        });

      },
    }).addTo(mymap);
    //getting bound to fit in map
    mymap.fitBounds(gapanapa.getBounds());
    layerswitcher.addOverlay(gapanapa, "Modi Rural Municipality");

  });

  $.getJSON("geojson/roadmodi.geojson", function (data) {
    console.log(data);
    gapanapa = L.geoJson(data, {
      //defining style for geojson polygon feature 
      style: {
       
        color: "	#1324ff",
        opacity: 1,
        weight: 0.7,
      },


    }).addTo(mymap);

    layerswitcher.addOverlay(gapanapa, "Roads");

  });

  $.getJSON('geojson/modischools.geojson', function (data) {
    console.log(data);
       pointfile=L.geoJson(data,{
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: myIcon});
      },
           onEachFeature: function (feature, layer) {
            var popupContent = '<table   class="table table-bordered">';
    
            for (var p in feature.properties) {
              popupContent +=
                "<tr><td>" + p +":"+ "</td><td>" + feature.properties[p] + "</td></tr>";
    
              popupContent += "</table>";
    
              layer.bindPopup(popupContent, { maxHeight: 225, width: 200,closeButton: false  });
    
              layer.on('mouseover', function() { layer.openPopup(); });
              layer.on('mouseout', function() { layer.closePopup(); });
            }
          }          
      }).addTo(mymap);
    layerswitcher.addOverlay(pointfile, "Schools");

   
      
  })
 
});
