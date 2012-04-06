function diff(s, d){ 
	return Math.abs (s - d); 
}

function dist(s, d){
	var lat = diff(s.lat, d.lat);
	var lgt = diff(s.lgt, d.lgt);
    return Math.sqrt ( Math.pow(lat,2) + Math.pow(lgt,2) );
}

var vertex = function(v){
  var name = '' || v.name;
  var lat = 0.0 || v.lat;
  var lgt = 0.0 || v.lgt;
  var edge = [] || v.edge;
  var minDistance = 99999 || v.minDistance;
  var previous = null || v.previous;
  return {
    "name" : name,
    "lat" : lat,
    "lgt" : lgt,
    "edge" : edge,
    "minDistance" : minDistance,
    "previous" : previous,
    "show" : name + "(" + lat +"," + lgt + ")" 
  };
};

function addV(v,name,lat,lgt){
	v.push(new vertex({"name" : name,"lat": lat, "lgt" : lgt}));
}

function addE(s,list){
	list.forEach(function(d){
		s.edge.push({"id" : d,"distance" : dist(s,d)});
	});
}

function computePath (vertices, source) {
    source.minDistance = 0;
    var vertexQueue = [source];
    while (vertexQueue.length) {
        var u = vertexQueue.shift(0);
        u.edge.forEach(function(v) {
            var distanceThroughU = u.minDistance + v.distance;
            if(distanceThroughU < v.id.minDistance) {
            	v.id.minDistance = distanceThroughU;
            	v.id.previous = u;
            	vertexQueue.push(v.id);
            }
        });
    }
};

function listPath(v){
	var path = [v];
    var current = v.previous;
	while(!!current) {
	    path.push(current);
	    current = current.previous;
	}
	return path.reverse();
}

function getList(v, s, d){
	computePath(v, s);
	return listPath(d);
}
