
// check if point p1 is inside radius r around point p2
function inRange(p1,p2,r){
return  ( p1< p2+r
  && p1 > p2-r );
}

// check if point p1 is in segment from x to x+w
function inSegment(p1,x,w){
  return (
    p1 > x
    && p1 < x+w
  );
}
