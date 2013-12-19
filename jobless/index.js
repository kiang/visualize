// Generated by LiveScript 1.2.0
var mainCtrl;
mainCtrl = function($scope){
  var radius;
  radius = 140;
  $scope.stat = {};
  $scope.cookie = {};
  $scope.dbRef = new Firebase('https://jobless.firebaseIO.com/');
  $scope.fav = {};
  $scope.favCount = 0;
  $scope.isFav = function(it){
    if ($scope.fav[it]) {
      return 'active';
    } else {
      return "";
    }
  };
  $scope.setFav = function(it){
    var k;
    if (!$scope.fav[it]) {
      $scope.fav[it] = ++$scope.favCount;
    } else {
      (function(){
        var results$ = [];
        for (k in $scope.fav) {
          results$.push(k);
        }
        return results$;
      }()).map(function(k){
        if ($scope.fav[k] > $scope.fav[it]) {
          return $scope.fav[k]--;
        }
      });
      delete $scope.fav[it];
      $scope.favCount--;
    }
    return $scope.choices = (function(){
      var results$ = [];
      for (k in $scope.fav) {
        results$.push(k);
      }
      return results$;
    }()).sort(function(a, b){
      return $scope.fav[b] - $scope.fav[a];
    });
  };
  $scope.sendFav = function(){
    if ($scope.cookie['jobless'] === 1 || !$scope.choices.length) {
      return;
    }
    document.cookie = "jobless=1";
    $scope.cookie['jobless'] = 1;
    return setTimeout(function(){
      return $scope.dbRef.push($scope.choices);
    }, 0);
  };
  $scope.radiusFilter = function(it){
    return it.value < 12;
  };
  $scope.sizeFilter = function(it){
    return it.dx < 33 || it.dy < 12;
  };
  $scope.rotate = function(it){
    return parseInt((360 * (it / $scope.type.length) + 90) / 180) * 180;
  };
  $scope.randomDate = function(){
    if ($scope.serialTimer) {
      clearInterval($scope.serialTimer);
    }
    $scope.serialTimer = null;
    return $scope.current = $scope.data[parseInt(Math.random() * $scope.data.length)];
  };
  $scope.serial = -1;
  $scope.serialTimer = null;
  $scope.serialDate = function(){
    if ($scope.serialTimer) {
      return;
    }
    return $scope.serialTimer = setInterval(function(){
      return $scope.$apply(function(){
        $scope.serial = ($scope.serial + 1) % $scope.data.length;
        return $scope.current = $scope.data[$scope.serial];
      });
    }, 500);
  };
  $scope.data = [];
  $scope.type = [];
  $scope.current = {};
  $scope.aux = {
    pie: d3.layout.pie().value(function(it){
      return it.value;
    }),
    arc: d3.svg.arc().outerRadius(radius).innerRadius(0),
    color: d3.scale.category20(),
    bubble: d3.layout.pack().sort(null).size([radius * 2.2, radius * 2.2]).padding(1.5),
    treemap: d3.layout.treemap().sort(null).size([400, 250]).padding(5)
  };
  $scope.viz = {
    pie: [],
    bar: [],
    bubble: [],
    treemap: []
  };
  document.cookie.split(';').map(function(it){
    it = it.split('=');
    return $scope.cookie[it[0].trim()] = ~~(it[1] || "").trim();
  });
  $scope.dbRef.on('child_added', function(d){
    var v;
    v = d.val();
    return $scope.$apply(function(it){
      var i$, ref$, len$, i, k;
      for (i$ = 0, len$ = (ref$ = v).length; i$ < len$; ++i$) {
        i = i$;
        it = ref$[i$];
        $scope.stat[it] = ($scope.stat[it] || 0) + v.length - i;
      }
      return $scope.viz.stat = $scope.aux.bubble.nodes({
        children: (function(){
          var results$ = [];
          for (k in $scope.stat) {
            results$.push({
              name: k,
              value: ~~$scope.stat[k]
            });
          }
          return results$;
        }())
      }).filter(function(it){
        return !it.children;
      });
    });
  });
  $scope.$watch('current', function(){
    var k;
    $scope.viz.pie = $scope.aux.pie((function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = $scope.type).length; i$ < len$; ++i$) {
        k = ref$[i$];
        results$.push({
          name: k,
          value: ~~$scope.current[k]
        });
      }
      return results$;
    }()));
    $scope.viz.bar = (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = $scope.type).length; i$ < len$; ++i$) {
        k = ref$[i$];
        results$.push({
          name: k,
          value: ~~$scope.current[k]
        });
      }
      return results$;
    }());
    $scope.viz.bubble = $scope.aux.bubble.nodes({
      children: (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = $scope.type).length; i$ < len$; ++i$) {
          k = ref$[i$];
          results$.push({
            name: k,
            value: ~~$scope.current[k]
          });
        }
        return results$;
      }())
    }).filter(function(it){
      return !it.children;
    });
    return $scope.viz.treemap = $scope.aux.treemap.nodes({
      children: (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = $scope.type).length; i$ < len$; ++i$) {
          k = ref$[i$];
          results$.push({
            name: k,
            value: ~~$scope.current[k]
          });
        }
        return results$;
      }())
    }).filter(function(it){
      return !it.children;
    });
  }, true);
  return d3.json('data.json', function(data){
    var dataList, i$, ref$, len$, d, obj;
    dataList = [];
    for (i$ = 0, len$ = (ref$ = data[1]).length; i$ < len$; ++i$) {
      d = ref$[i$];
      obj = {};
      data[0].map(fn$);
      dataList.push(obj);
    }
    return $scope.$apply(function(){
      return $scope.data = dataList, $scope.type = data[0].filter(function(it){
        return it !== '時間';
      }), $scope.current = dataList[dataList.length - 1], $scope;
    });
    function fn$(it, i){
      return obj[it] = d[i];
    }
  });
};