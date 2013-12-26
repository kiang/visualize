// Generated by LiveScript 1.2.0
var mainCtrl;
mainCtrl = function($scope){
  var mapOption, clusterOption, map, mc;
  mapOption = {
    center: new google.maps.LatLng(25.048281, 121.5371),
    scrollwheel: false,
    zoom: 16,
    minZoom: 8,
    maxZoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  clusterOption = {
    gridSize: 75,
    maxZoom: 15,
    minimumClusterSize: 1,
    zoomOnClick: true
  };
  map = new google.maps.Map(document.getElementById('map-node'), mapOption);
  google.maps.event.addListenerOnce(map, 'idle', function(){
    return google.maps.event.trigger(map, 'resize');
  });
  setTimeout(function(){
    return $('#map-node').css('width', '100%');
  }, 1000);
  mc = new MarkerClusterer(map, [], clusterOption);
  $scope.poi = [];
  $scope.poiIcon = {
    url: 'poi.png',
    size: new google.maps.Size(13, 16),
    origin: new google.maps.Point(0, 0)
  };
  return d3.csv('monitor.csv', function(data){
    var count, i$, len$, item, m;
    count = 0;
    for (i$ = 0, len$ = data.length; i$ < len$; ++i$) {
      item = data[i$];
      if (count > 10000) {
        break;
      }
      count++;
      m = new google.maps.Marker({
        zIndex: 9900000,
        position: new google.maps.LatLng(item.lat, item.lng),
        map: null,
        icon: $scope.poiIcon
      });
      $scope.poi.push(m);
    }
    mc.addMarkers($scope.poi);
    $scope.clusterIsOn = true;
    return $scope.$watch('clusterIsOn', function(v){
      if (v) {
        return mc.addMarkers($scope.poi);
      } else {
        mc.clearMarkers();
        return $scope.poi.map(function(it){
          return it.setMap(map);
        });
      }
    });
  });
};