var CRp = {};

var impl;

function polygon( context, points ){
  for( var i = 0; i < points.length; i++ ){
    var pt = points[ i ];

    context.lineTo( pt.x, pt.y );
  }
}

function triangleBackcurve( context, points, controlPoint ){
  var firstPt;

  for( var i = 0; i < points.length; i++ ){
    var pt = points[ i ];

    if( i === 0 ){
      firstPt = pt;
    }

    context.lineTo( pt.x, pt.y );
  }

  context.quadraticCurveTo( controlPoint.x, controlPoint.y, firstPt.x, firstPt.y );
}

function triangleTee( context, trianglePoints, teePoints ){
  if( context.beginPath ){ context.beginPath(); }

  var triPts = trianglePoints;
  for( var i = 0; i < triPts.length; i++ ){
    var pt = triPts[ i ];

    context.lineTo( pt.x, pt.y );
  }

  var teePts = teePoints;
  var firstTeePt = teePoints[0];
  context.moveTo( firstTeePt.x, firstTeePt.y );

  for( var i = 1; i < teePts.length; i++ ){
    var pt = teePts[ i ];

    context.lineTo( pt.x, pt.y );
  }

  if( context.closePath ){ context.closePath(); }
}

function triangleCircle(context, trianglePoints, rx, ry, r) {
  if (context.beginPath) { context.beginPath(); }
  context.arc(rx, ry, r, 0, Math.PI * 2, false);    
  var triPts = trianglePoints;
  var firstTrPt = triPts[0];
  context.moveTo(firstTrPt.x, firstTrPt.y);
  for (var i = 0; i < triPts.length; i++) {
    var pt = triPts[i];
    context.lineTo(pt.x, pt.y);
  }
  if (context.closePath) {
    context.closePath();
  }
}

function squareCircle(context, SquarePoints, rx, ry, r) {
  if (context.beginPath) { context.beginPath(); }
  context.arc(rx, ry, r, 0, Math.PI * 2, false);    
  var sqaPts = SquarePoints;
  var firstSqPt = sqaPts[0];
  context.moveTo(firstSqPt.x, firstSqPt.y);
  for (var i = 0; i < sqaPts.length; i++) {
    var pt = sqaPts[i];
    context.lineTo(pt.x, pt.y);
  }
  if (context.closePath) {
    context.closePath();
  }
}



function triangleSquare(context, trianglePoints, squarePoints) {
  if (context.beginPath) { context.beginPath(); }
  var triPts = trianglePoints;
  var sqaPts = squarePoints;
  var firstTrPt = sqaPts[0];
  context.moveTo(firstTrPt.x, firstTrPt.y);
  for (var i = 0; i < triPts.length; i++) {
    var pt = triPts[i];
    context.lineTo(pt.x, pt.y);
  }
  var firstSqPt = sqaPts[0];
  context.moveTo(firstSqPt.x, firstSqPt.y);
  for (var i = 0; i < sqaPts.length; i++) {
    var pt = sqaPts[i];
    context.lineTo(pt.x, pt.y);
  }
  if (context.closePath) {
    context.closePath();
  }
}



function circle( context, rx, ry, r ){
  context.arc( rx, ry, r, 0, Math.PI * 2, false );
}

CRp.arrowShapeImpl = function( name ){
  return ( impl || (impl = {
    'polygon': polygon,

    'triangle-backcurve': triangleBackcurve,

    'triangle-tee': triangleTee,

    'circle-triangle' : triangleCircle,

    'triangle-circle' : triangleCircle,

    'triangle-square' : triangleSquare,

    'square-triangle' : triangleSquare,

    'circle-square' : squareCircle,

    'square-circle' : squareCircle,

    'triangle-cross': triangleTee,

    'circle': circle
  }) )[ name ];
};

export default CRp;
