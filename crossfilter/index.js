// Generated by LiveScript 1.2.0
var ref$, unique, pairsToObj, color, partyColor, constuiencyMap, topo;
ref$ = require('prelude-ls'), unique = ref$.unique, pairsToObj = ref$.pairsToObj;
color = d3.scale.category20();
partyColor = d3.scale.ordinal().domain(['KMT', 'DPP', 'PFP', 'TSU', 'NSU', 'NON']).range(['#0D2393', '#009900', '#FF6211', '#994500', '#CD1659', '#999999']);
constuiencyMap = {
  CHA: '彰化縣',
  CYI: '嘉義市',
  CYQ: '嘉義縣',
  HSQ: '新竹縣',
  HSZ: '新竹市',
  HUA: '花蓮縣',
  ILA: '宜蘭縣',
  KEE: '基隆市',
  KHH: '高雄市',
  KHQ: '高雄縣',
  MIA: '苗栗縣',
  NAN: '南投縣',
  PEN: '澎湖縣',
  PIF: '屏東縣',
  TAO: '桃園縣',
  TNN: '台南市',
  TNQ: '台南縣',
  TPE: '台北市',
  TPQ: '新北市',
  TTT: '台東縣',
  TXG: '台中市',
  TXQ: '台中縣',
  YUN: '雲林縣'
};
topo = [];
$(document).ready(function(){
  var lg;
  lg = {};
  return d3.json('mly-8-with-sex.json', function(data){
    var i$, len$, it;
    for (i$ = 0, len$ = data.length; i$ < len$; ++i$) {
      it = data[i$];
      lg[it.name] = it;
    }
    return d3.json('ttsinterpellation.json', function(data){
      var allData, filter, askedByFilter, categoryFilter, topicFilter, keywordsFilter, partyFilter, lastnameFilter, sexFilter, constuiencyFilter, update;
      console.log(data.entries);
      allData = data.entries;
      allData = allData.map(function(it){
        if (!it.asked_by) {
          it.asked_by = [];
        }
        return it;
      }).filter(function(it){
        var x;
        return (function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = it.asked_by).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(lg[x]);
          }
          return results$;
        }()).filter(function(it){
          return it;
        }).length > 0;
      });
      filter = crossfilter(allData);
      console.log(filter.groupAll().value());
      askedByFilter = filter.dimension(function(it){
        return it.asked_by;
      });
      categoryFilter = filter.dimension(function(it){
        return it.category;
      });
      topicFilter = filter.dimension(function(it){
        return it.topic;
      });
      keywordsFilter = filter.dimension(function(it){
        return it.keywords;
      });
      partyFilter = filter.dimension(function(it){
        return it.asked_by.map(function(it){
          return lg[it].party;
        });
      });
      lastnameFilter = filter.dimension(function(it){
        return it.asked_by.map(function(it){
          return it.substring(0, 1);
        });
      });
      sexFilter = filter.dimension(function(it){
        return it.asked_by.map(function(it){
          return lg[it].sex;
        });
      });
      constuiencyFilter = filter.dimension(function(it){
        return it.asked_by.map(function(it){
          return lg[it].constuiency[0];
        });
      });
      update = function(data){
        var category, x, keywords, topic, askedBy, party, sex, lastname, constuiency, curSet, curNum, sexGroup, sexRatio, partyGroup, partyHash, partyRatio, radius, pie, arc, partyRoot, x$, y$, constuiencyGroup, constuiencyHash, constuiencyMax, it;
        category = unique((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.category);
          }
          return results$;
        }()).reduce(function(a, b){
          return a.concat(b);
        }, []));
        keywords = unique((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.keywords);
          }
          return results$;
        }()).reduce(function(a, b){
          return a.concat(b);
        }, []));
        topic = unique((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.topic);
          }
          return results$;
        }()).reduce(function(a, b){
          return a.concat(b);
        }, []));
        askedBy = unique((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.asked_by);
          }
          return results$;
        }()).reduce(function(a, b){
          return a.concat(b);
        }, []));
        party = unique((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.asked_by.map(fn$));
          }
          return results$;
          function fn$(it){
            return lg[it].party;
          }
        }()).reduce(function(a, b){
          return a.concat(b);
        }, []));
        sex = unique((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.asked_by.map(fn$));
          }
          return results$;
          function fn$(it){
            return lg[it].sex;
          }
        }()).reduce(function(a, b){
          return a.concat(b);
        }, []));
        lastname = unique((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.asked_by.map(fn$));
          }
          return results$;
          function fn$(it){
            return it.substring(0, 1);
          }
        }()).reduce(function(a, b){
          return a.concat(b);
        }, []));
        constuiency = unique((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = data).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.asked_by.map(fn$));
          }
          return results$;
          function fn$(it){
            return lg[it].constuiency[0];
          }
        }()).reduce(function(a, b){
          return a.concat(b);
        }, []));
        curSet = categoryFilter.top(Infinity);
        curNum = curSet.length;
        sexGroup = sexFilter.group().top(Infinity);
        sexRatio = (sexGroup[0].key[0] === '男'
          ? [0, 1]
          : [1, 0]).map(function(it){
          return sexGroup[it].value / curNum;
        });
        sexRatio = sexRatio.map(function(it){
          var ref$;
          return [it, (ref$ = it > 0.2 ? it : 0.2) < 0.8 ? ref$ : 0.8];
        });
        d3.select('#male.block').datum(sexRatio[0]);
        d3.select('#female.block').datum(sexRatio[1]);
        d3.selectAll('#gender .block').each(function(it){
          var x$;
          x$ = d3.select(this);
          x$.select('img').style('width', it[1] * 200 + "px");
          x$.select('.count').text(~~(it[0] * 100) + "%");
          return x$;
        });
        partyGroup = partyFilter.group().top(Infinity);
        partyHash = pairsToObj(partyGroup.map(function(it){
          return [it.key[0], it.value / curNum];
        }));
        partyRatio = ['KMT', 'DPP', 'PFP', 'TSU', 'NSU', 'NON'].map(function(it){
          return {
            name: it,
            value: partyHash[it] || 0
          };
        });
        radius = 100;
        pie = d3.layout.pie().sort(null).value(function(it){
          return it.value;
        });
        arc = d3.svg.arc().outerRadius(radius / 2.3).innerRadius(radius / 4.5);
        partyRoot = d3.select('#party svg').append('g').attr('transform', "translate(50 50)");
        x$ = partyRoot.selectAll('path.arc').data(pie(partyRatio));
        x$.exit().remove();
        x$.enter().append('path').attr('class', 'arc').attr('d', arc).attr('fill', function(it){
          return partyColor(it.data.name);
        });
        y$ = d3.select('#party .flags').selectAll('div.flag').data(partyRatio.sort(function(a, b){
          return b.value - a.value;
        }));
        y$.exit().remove();
        y$.enter().append('div').attr('class', 'flag').each(function(){
          var x$;
          x$ = d3.select(this);
          x$.append('i');
          x$.append('div').attr('class', 'title');
          return x$;
        });
        d3.select('#party .flags').selectAll('div.flag').each(function(){
          var x$;
          x$ = d3.select(this);
          x$.select('i').attr('class', function(it){
            return "g0v-icon large " + it.name;
          });
          x$.select('.title').text(function(it){
            return ~~(100 * it.value) + "%";
          });
          return x$;
        });
        constuiencyGroup = constuiencyFilter.group().top(Infinity);
        constuiencyHash = pairsToObj(constuiencyGroup.map(function(it){
          return [constuiencyMap[it.key[0]], it.value];
        }));
        topo.features.map(function(it){
          return it.value = (constuiencyHash[it.properties.COUNTYNAME] || 0) / curNum;
        });
        constuiencyMax = d3.max((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = topo.features).length; i$ < len$; ++i$) {
            it = ref$[i$];
            results$.push(it.value);
          }
          return results$;
        }()));
        return d3.select('#county svg').selectAll('path.county').style('fill', function(it){
          var v;
          v = ~~(it.value * 255 / constuiencyMax);
          return "rgba(" + v + "," + ~~(v / 2) + "," + ~~v / 3 + ", " + (0.1 + 0.9 * v / 255) + ")";
        });
      };
      d3.json('twCounty2010.topo.json', function(data){
        var prj, path, svg;
        topo = topojson.feature(data, data.objects["twCounty2010.geo"]);
        prj = d3.geo.mercator().center([120.979531, 23.978567]).scale(90000);
        path = d3.geo.path().projection(prj);
        svg = d3.select('#county svg');
        svg.selectAll('path.county').data(topo.features).enter().append('path').attr('class', 'county').attr('d', path).style('fill', function(it){
          return color(it.properties.COUNTYNAME);
        }).style('stroke', '#fff').style('stroke-width', '2px');
        return update(categoryFilter.top(Infinity));
      });
      return window.reset = function(){
        constuiencyFilter.filterAll();
        sexFilter.filterAll();
        lastnameFilter.filterAll();
        partyFilter.filterAll();
        categoryFilter.filterAll();
        keywordsFilter.filterAll();
        topicFilter.filterAll();
        askedByFilter.filterAll();
        return update(categoryFilter.top(Infinity));
      };
    });
  });
});