// Generated by LiveScript 1.2.0
$(document).ready(function(){
  var sum;
  sum = function(it){
    return it.reduce(function(a, b){
      return a + b;
    }, 0);
  };
  return d3.json('hiking.json', function(data){
    var margin, dim, yfish, dlist, k, maxDist, maxTime, count, hite, svg, lastHover, extend, wrap, shrink, x$, y$, yy, redraw;
    margin = [10, 0, 10, 40];
    dim = [300, 200, 300 - margin[1] - margin[3], 200 - margin[0] - margin[2]];
    yfish = d3.fisheye.scale(d3.scale.identity).domain([0, dim[1]]).focus(0);
    dlist = (function(){
      var results$ = [];
      for (k in data) {
        results$.push(k);
      }
      return results$;
    }()).map(function(it){
      return data[it];
    });
    maxDist = d3.max(dlist.map(function(it){
      return it.totalDist;
    }));
    maxTime = d3.max(dlist.map(function(it){
      return it.totalTime;
    }));
    count = dlist.length;
    hite = dim[3] / (count * 2 - 1);
    svg = d3.select('#content').append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', "0 0 " + dim[0] + " " + dim[1]).attr('preserveAspectRatio', "xMidYMid").on('mousemove', function(){
      var m;
      m = d3.mouse(this);
      yfish.focus(m[1]);
      return redraw();
    });
    lastHover = null;
    extend = function(root){
      var x$;
      if (lastHover) {
        shrink(lastHover);
      }
      lastHover = root;
      if (!root) {
        return;
      }
      x$ = d3.select(root);
      x$.selectAll('rect.bar').transition().duration(500).attr('width', function(){
        return dim[2] + "px";
      });
      x$.selectAll('text.time').transition().duration(500).attr('x', function(){
        return (hite + dim[2]) + "px";
      });
      x$.selectAll('text.length').transition().duration(500).attr('x', function(){
        return (hite + dim[2]) + "px";
      });
      x$.selectAll('rect.poi').transition().duration(500).attr('x', function(it){
        return (dim[2] * (it[1] / it[3]) - 2) + "px";
      });
      x$.selectAll('text.dis').transition().duration(500).attr('x', function(it){
        return dim[2] * (it[0] + it[1] / 2) / it[5] + "px";
      });
      x$.selectAll('g.poi-name').transition().duration(500).attr('transform', function(it){
        return "translate(" + (dim[2] * (it[1] / it[3]) - 2) + " 0)";
      });
      return x$;
    };
    wrap = function(obj, init){
      init == null && (init = false);
      if (init) {
        return obj;
      } else {
        return obj.transition().duration(500);
      }
    };
    shrink = function(root, init){
      init == null && (init = false);
      root = d3.select(root);
      wrap(root.selectAll('rect.bar'), init).attr('width', function(it){
        return dim[2] * (it.totalDist / maxDist) + "px";
      });
      wrap(root.selectAll('text.time'), init).attr('x', function(it){
        return (hite + dim[2] * (it.totalDist / maxDist)) + "px";
      });
      wrap(root.selectAll('text.length'), init).attr('x', function(it){
        return (hite + dim[2] * (it.totalDist / maxDist)) + "px";
      });
      wrap(root.selectAll('rect.poi'), init).attr('x', function(it){
        return (dim[2] * (it[1] / maxDist) - 2) + "px";
      });
      wrap(root.selectAll('text.dis'), init).attr('x', function(it){
        return dim[2] * (it[0] + it[1] / 2) / maxDist + "px";
      });
      return wrap(root.selectAll('g.poi-name'), init).attr('transform', function(it){
        return "translate(" + (dim[2] * (it[1] / maxDist) - 2) + " 0)";
      });
    };
    x$ = svg.selectAll('g.path').data(dlist);
    x$.exit().remove();
    y$ = x$.enter().append('g').attr('class', 'path');
    y$.on('mouseover', function(){
      return extend(this);
    });
    y$.attr('transform', function(d, i){
      return "translate(" + margin[3] + ",0)";
    });
    y$.append('rect').attr('class', 'bar');
    y$.append('text').attr('class', 'name').attr('x', function(){
      return -hite;
    }).text(function(it){
      return it.name;
    });
    y$.append('text').attr('class', 'length').style('fill', '#600').attr('text-anchor', 'start').text(function(it){
      return it.totalDist + "公里";
    });
    y$.append('text').attr('class', 'time').style('fill', '#600').attr('text-anchor', 'start').text(function(it){
      return it.totalTime + "分鐘";
    });
    y$.each(function(it, idx){
      var j, dst, acc, i, dstsum, accDis, maxLen, accPoi, x$;
      j = 0;
      dst = {
        sum: it.totalDist
      };
      dst.pct = it.dist.map(function(it){
        return it / dst.sum;
      }).map(function(it){
        return it >= 0.2
          ? it
          : it = 0.2;
      });
      dst.rsm = sum(dst.pct.filter(function(it){
        return it > 0.2;
      }));
      dst.ret = dst.pct.map(function(x){
        return parseInt((x > 0.2
          ? x * dst.rsm * dst.sum
          : x * dst.sum) * 10) / 10.0;
      });
      dst.ret = it.dist;
      acc = [0].concat((function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = dst.ret).length; i$ < len$; ++i$) {
          i = ref$[i$];
          results$.push(j = parseInt(100 * (j + i)) / 100.0);
        }
        return results$;
      }()));
      dstsum = dst.sum;
      accDis = dst.ret.map(function(d, i){
        return [acc[i], d, it.time[i], idx, 0, dstsum];
      });
      console.log(accDis);
      maxLen = it.totalDist;
      accPoi = it.poi.map(function(d, i){
        return [d, acc[i], idx, dst.sum];
      });
      d3.select(this).selectAll('g.poi').data(accPoi).enter().append('rect').attr('class', 'poi').attr('width', '2px').attr('fill', '#caa').attr('stroke', '#b00');
      d3.select(this).selectAll('g.dis').data(accDis).enter().append('text').attr('class', 'dis').text(function(it){
        return it[1] + "k";
      }).attr('fill', '#fff');
      x$ = d3.select(this).selectAll('g.poi-name').data(accPoi).enter().append('g').attr('class', 'poi-name').append('g').attr('class', 'poi-name-inner');
      x$.append('rect').attr('class', 'poi-name').attr('x', function(it){
        return (-it[0].length * 2.5 - 4) + "px";
      }).attr('y', '-7px').attr('rx', '1px').attr('ry', '1px').attr('width', function(it){
        return (it[0].length * 5 + 8) + "px";
      }).attr('height', '10.5px');
      x$.append('text').attr('class', 'poi-name').text(function(it){
        return it[0] + "";
      }).attr('fill', '#700').attr('font-size', '5px');
      return shrink(this, true);
    });
    svg.on('mouseout', function(){
      return extend(null);
    });
    yy = function(i, d){
      return yfish(hite + margin[0] + i * 2 * hite + d);
    };
    redraw = function(){
      svg.selectAll('rect.bar').attr('y', function(d, i){
        return yy(i, 0) + "px";
      }).attr('height', function(d, i){
        return (yy(i, hite) - yy(i, 0)) + "px";
      }).attr('rx', function(d, i){
        return (yy(i, hite) - yy(i, 0)) * 0.1 + "px";
      }).attr('ry', function(d, i){
        return (yy(i, hite) - yy(i, 0)) * 0.1 + "px";
      }).attr('fill', function(d, i){
        var v;
        v = parseInt((yy(i, hite) - yy(i, 0)) * 50);
        v <= 255 || (v = 255);
        return "rgba(" + v + ",0," + i * 10 + ",1)";
      });
      svg.selectAll('text.name').attr('y', function(d, i){
        var fs;
        fs = yy(i, hite * 0.8) - yy(i, hite * 0.2);
        fs <= 10 || (fs = 10);
        fs = fs / 2;
        return (yy(i, hite * 0.5) + fs) + "";
      }).attr('font-size', function(d, i){
        var fs;
        fs = yy(i, hite * 0.8) - yy(i, hite * 0.2);
        fs <= 10 || (fs = 10);
        return fs + "px";
      }).attr('fill', function(d, i){
        var v;
        v = parseInt((yy(i, hite) - yy(i, 0)) * 50);
        v <= 255 || (v = 255);
        return "rgba(" + v + ",0," + i * 10 + ",1)";
      });
      svg.selectAll('text.time').attr('y', function(d, i){
        return yy(i, hite * 0.5 - 1) + "";
      }).attr('font-size', function(d, i){
        var fs;
        fs = yy(i, hite * 0.8) - yy(i, hite * 0.2);
        fs <= 2 || (fs = 2);
        return fs + "px";
      });
      svg.selectAll('text.length').attr('y', function(d, i){
        var fs;
        fs = yy(i, hite * 0.8) - yy(i, hite * 0.2);
        fs <= 10 || (fs = 10);
        fs = fs / 2;
        return (yy(i, hite * 0.5) + 1 + fs) + "";
      }).attr('font-size', function(d, i){
        var fs;
        fs = yy(i, hite * 0.8) - yy(i, hite * 0.2);
        fs <= 10 || (fs = 10);
        return fs + "px";
      });
      svg.selectAll('rect.poi').attr('y', function(d, i){
        return yy(d[2], 0) + "px";
      }).attr('height', function(d, i){
        return (yy(d[2], hite) - yy(d[2], 0)) + "px";
      }).attr('stroke-width', function(d, i){
        var v;
        v = (yy(d[2], hite) - yy(d[2], 0)) * 0.05;
        v >= 0.8 || (v = 0.8);
        return v + "px";
      });
      svg.selectAll('g.poi-name-inner').attr('transform', function(d, i){
        var v;
        v = [-hite / 3 + 1.5, hite + 1, -1, 2 + 4 * hite / 3][i % 4];
        return "translate(0 " + yy(d[2], v) + ")";
      }).style('opacity', function(d, i){
        var v;
        v = yy(d[2], hite) - yy(d[2], 0);
        v = v * 0.065;
        v <= 1 || (v = 1);
        if (v < 0.8) {
          v = 0;
        }
        return v;
      });
      return svg.selectAll('text.dis').each(function(d, i){
        return d[4] = yy(d[3], hite) - yy(d[3], 0);
      }).style('opacity', function(d, i){
        var v;
        v = d[4] * 0.08;
        v <= 1 || (v = 1);
        if (v < 0.4) {
          v = 0;
        }
        return v;
      }).attr('font-size', function(d, i){
        var v;
        v = d[4] * 0.2;
        v <= 30 || (v = 30);
        return v + "px";
      }).attr('y', function(d, i){
        var v, r;
        v = d[4] * 0.2;
        v <= 3 || (v = 3);
        r = i % 2
          ? [1, 2]
          : [2, 1];
        return (v / 2 + (r[0] * yy(d[3], hite) + r[1] * yy(d[3], 0)) / 3) + "px";
      });
    };
    return redraw();
  });
});