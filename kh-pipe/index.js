// Generated by LiveScript 1.2.0
var main;
main = function($scope){
  var mapOption, mapStyle, map, overlay;
  mapOption = {
    center: new google.maps.LatLng(22.624146, 120.320623),
    zoom: 13,
    minZoom: 8,
    maxZoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  };
  mapStyle = [
    {
      "featureType": "road",
      "stylers": [{
        "saturation": -100
      }]
    }, {
      "featureType": "poi",
      "stylers": [{
        "saturation": -100
      }]
    }, {
      "featureType": "transit",
      "stylers": [{
        "saturation": -100
      }]
    }
  ];
  map = new google.maps.Map(document.getElementById('mainmap'), mapOption);
  map.set('styles', mapStyle);
  overlay = import$(new google.maps.OverlayView(), {
    info: {},
    onAdd: function(){
      var this$ = this;
      this.root = this.getPanes().overlayLayer;
      this.svg = d3.select(this.root).append('svg').attr({
        width: "1000px",
        height: "1200px",
        "viewBox": "0 0 1000 1200"
      });
      this.svg.style({
        position: "absolute"
      });
      this.info.prj = d3.geo.mercator().center([120.3202, 22.7199]).scale(335000);
      this.info.path = d3.geo.path().projection(this.info.prj);
      return d3.json('kh_oil_pipelines.geojson', function(json){
        var x$, y$;
        x$ = this$.svg.selectAll('path').data(json.features);
        y$ = x$.enter().append('path');
        y$.attr({
          d: this$.info.path,
          stroke: 'rgba(255,0,255,0.7)',
          "stroke-width": 4,
          "stroke-linejoin": 'round',
          fill: 'none'
        });
        return this$.info.nodes = this$.svg.selectAll('path');
      });
    },
    ll2p: function(lat, lng, prj){
      var ret;
      return ret = prj.fromLatLngToDivPixel(new google.maps.LatLng(lat, lng));
    },
    bound2p: function(bound){
      var prj, ne, sw, p1, p2;
      prj = this.getProjection();
      ne = bound.getNorthEast();
      sw = bound.getSouthWest();
      console.log(sw.lng(), ne.lat());
      console.log(ne.lng(), sw.lat());
      p1 = this.ll2p(ne.lat(), sw.lng(), prj);
      p2 = this.ll2p(sw.lat(), ne.lng(), prj);
      return [p1, p2];
    },
    draw: function(){
      var prj, ref$, p1, p2, w, h, b1, b2, this$ = this;
      prj = this.getProjection();
      ref$ = this.bound2p(map.getBounds()), p1 = ref$[0], p2 = ref$[1];
      ref$ = [p2.x - p1.x, p2.y - p1.y], w = ref$[0], h = ref$[1];
      b1 = this.ll2p(22.7595, 120.23795080859372, prj);
      b2 = this.ll2p(22.5698, 120.409450, prj);
      this.svg.style({
        left: b1.x + "px",
        top: b1.y + "px"
      });
      this.svg.attr({
        width: (b2.x - b1.x) + "px",
        height: (b2.y - b1.y) + "px"
      });
      this.svg.selectAll('path').attr({
        "stroke": function(){
          var z;
          z = map.getZoom();
          if (z >= 16) {
            return "rgba(255,0,0,0.3)";
          }
          if (z >= 14) {
            return "rgba(255,0,0,0.5)";
          }
          if (z >= 12) {
            return "rgba(255,0,0,0.7)";
          }
          if (z < 11) {
            return "rgba(255,0,0,1)";
          }
        },
        "stroke-width": function(){
          var z;
          z = map.getZoom();
          if (z >= 16) {
            return "1";
          }
          if (z >= 14) {
            return "2";
          }
          if (z >= 12) {
            return "5";
          }
          if (z < 11) {
            return "7";
          }
        }
      });
      console.log(map.getZoom());
      return console.log(w, h);
    }
  });
  return overlay.setMap(map);
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}