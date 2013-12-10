// Generated by LiveScript 1.2.0
var budgetCtrl;
budgetCtrl = function($scope){
  import$($scope, {
    inst: "",
    name: ""
  });
  return d3.json('budget.json', function(data){
    var radius, bubble, svg, root, instHash, color, key, dept, x$, y$;
    radius = 900;
    bubble = d3.layout.pack().sort(null).size([radius, radius]).padding(1.5);
    svg = d3.select('#svg');
    root = {
      children: []
    };
    instHash = {};
    color = d3.scale.category20c();
    root = {
      children: (function(){
        var results$ = [];
        for (key in data) {
          results$.push({
            name: key,
            inst: key,
            value: data[key][0],
            c: (fn$())
          });
        }
        return results$;
        function fn$(){
          var ref$, results$ = [];
          for (dept in data[key][1]) {
            results$.push({
              name: dept,
              inst: key,
              value: (ref$ = data[key][1][dept]) > 1 ? ref$ : 1
            });
          }
          return results$;
        }
      }())
    };
    x$ = svg.selectAll('g.inst').data(bubble.nodes(root));
    y$ = x$.enter().append('g').attr('class', 'inst');
    y$.attr('transform', function(it){
      return "translate(" + it.x + " " + it.y + ")";
    });
    y$.append('circle').attr('r', function(it){
      return it.r;
    }).attr('fill', function(it){
      if (it.inst) {
        return color(it.inst);
      } else {
        return 'none';
      }
    });
    y$.append('text').attr('class', 'name').text(function(it){
      if (it.r > 10) {
        return it.name;
      } else {
        return "";
      }
    });
    y$.each(function(d){
      var this$ = this;
      d3.select(this).on('mouseover', function(e){
        var bubble, x$, y$;
        $scope.$apply(function(e){
          return $scope.inst = d.inst;
        });
        if (d.r < 20) {
          $scope.$apply(function(e){
            return $scope.name = "";
          });
          return;
        }
        bubble = d3.layout.pack().sort(null).size([2 * d.r, 2 * d.r]).padding(1.5);
        x$ = d3.select(this$).selectAll('g.dept').data(bubble.nodes({
          children: d.c
        }));
        y$ = x$.enter().append('g').attr('class', 'dept');
        y$.attr('transform', function(it){
          return "translate(" + (it.x - d.r) + " " + (it.y - d.r) + ")";
        });
        y$.append('circle').attr('r', function(it){
          return it.r;
        }).attr('fill', function(it){
          if (it.name) {
            return color(it.name);
          } else {
            return 'none';
          }
        }).on('mouseover', function(it){
          return $scope.$apply(function(e){
            return $scope.name = it.name;
          });
        });
        return d3.select(this$).selectAll('g.dept').style('opacity', 1);
      });
      if (d.r < 20) {
        return;
      }
      return d3.select(this).on('mouseout', function(e){
        return d3.select(this$).selectAll('g.dept').style('opacity', 0);
      });
    });
    return x$;
  });
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}