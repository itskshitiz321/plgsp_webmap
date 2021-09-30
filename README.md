# Web Map

This is Training of Gandaki Academy  , Provincial and Local Governance Support Program , Gandaki Province Nepal 

## Installation

We will use [leaflet](https://leafletjs.com/examples/quick-start/) for map rendering.

```bash
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
```
Let's include leaflet script file in our html
```bash
  <!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script>
```
## Setup Map Division

```bash
 <div id="mapid"></div>

```

## Setup Jquery and bootstrap
```
  <script
    src="https://code.jquery.com/jquery-3.6.0.js"
    integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"
  ></script>
```
Put this inside head section of your page
```
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
```

Please make sure to update tests as appropriate.

## Jquery Document ready function
A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you. Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute. Code included inside $( window ).on( "load", function() { ... }) will run once the entire page (images or iframes), not just the DOM, is ready.

```
$( document ).ready(function() {
    console.log( "ready!" );
});
```
# Setup Map with map variable
```
var mymap = L.map("mapid").setView([28.2096, 83.9856], 12);
```
Setup Google Satellite Layer for leaflet 
```
  var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );

```
Setup Openstreetmap Layer for leaflet 
```
  var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  });

```
Setup Google Map Layer for leaflet 
```
  googleStreets = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  ).addTo(mymap);

```

We need to create list of basemap to add it on leaflet control 

```
  var baseMaps = {
    "Google Map": googleStreets,
    "Open Street Map": osm,
    "Satellite": googleSat,
  };

```
# Leaflet Control 
Leaflet has a nice little control that allows your users to control which layers they see on your map. We will assign it in variable called layerswitcher so that we could add inside it later.
Note : {collapsed:false } will set leaflet layer control open
```
layerswitcher = L.control
    .layers(baseMaps, {}, { collapsed: false })
    .addTo(mymap);

```
What if we want to add northarrow ? Not only northarrow we can add other pictures over leafletmap using this methodology
```
var northarrow = L.control({ position: "topright" });
```
You can add image inside control, This function will run after northarrow will be added to map . .onAdd() function will run after layer is added.
```
  northarrow.onAdd = function () {
    var img = L.DomUtil.create("img");
    img.src = "img/northarrow.png";
    img.style.width = "100px";
    img.style.height = "100px";

    return img;
  };
  // now add northarrow to map
  northarrow.addTo(mymap);
```
# Leaflet custom Marker Setup 
```
  var myIcon = L.icon({
    iconUrl:  '***marker directory *****' ,
    iconSize: [20, 20]
  });
```
You can add marker with custom marker with this leaflet code 
 ```
L.marker(latlng, {icon: myIcon});
```
# jQuery getJSON() Method
The getJSON() method is used to get JSON data using an AJAX HTTP GET request.
```
  $.getJSON("geojson/roadmodi.geojson", function (data) {
    console.log(data);

  });
```
#  L.geoJson 
It Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse GeoJSON data and display it on the map. Extends FeatureGroup.
```
L.geoJson(data, {
	style: function (feature) {
		return {color: feature.properties.color};
	},
	onEachFeature: function (feature, layer) {
		layer.bindPopup(feature.properties.description);
	}
}).addTo(map);
```
## Options
### pointToLayer( <GeoJSON> featureData, <LatLng> latlng )
Function that will be used for creating layers for GeoJSON points (if not specified, simple markers will be created).

### style( <GeoJSON> featureData )
Function that will be used to get style options for vector layers created for GeoJSON features.

### onEachFeature( <GeoJSON> featureData, <ILayer> layer )
Function that will be called on each created feature layer. Useful for attaching events and popups to features.

# Happy Learning ! <3
