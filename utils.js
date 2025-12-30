function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
function addPoly(coordinates,color_val) {
  ctx.fillStyle = color_val
  ctx.beginPath();
  ctx.moveTo(coordinates[0][0],coordinates[0][1]);
  for (let i = 0; i < coordinates.length; i++) {
    ctx.lineTo(coordinates[i][0], coordinates[i][1]);
  }
  ctx.fill();
  coordinates.length = 0;
}
function addLine(coordinates,color_val,line_width) {
  ctx.strokeStyle = color_val
  ctx.beginPath();
  ctx.moveTo(coordinates[0][0],coordinates[0][1]);
  for (let i = 0; i < coordinates.length; i++) {
    ctx.lineTo(coordinates[i][0], coordinates[i][1]);
  }
  ctx.lineWidth = line_width;
  ctx.stroke();
  coordinates.length = 0;
}
function addText(x,y,text_val,color_val,font_val) {
  ctx.fillStyle = color_val;
  ctx.font = font_val;
  ctx.fillText(text_val, x, y);
}
function addTics() {
  let adjustment_x = [20,20,0,10,5];
  let adjustment_x2 = [0,0,-3,0,0];
  let adjustment_y = [20,10,10,10,10];
  let step = -1;
  let x100pt2 = 0;
  let x100pt3 = 0;
  for (let i = -100; i <= 100; i+=50) {
    step++;
    let coordinates = [[Math.sin(degToRad(i*0.4)) * 164 + 345,Math.cos(degToRad(i*0.4)) * 164 + 291],
    [Math.sin(degToRad(i*0.4)) * 174 + 345,Math.cos(degToRad(i*0.4)) * 174 + 291]];
    addLine(coordinates,"rgb(0, 0, 0)",1);
    addText(Math.sin(degToRad(i*0.4)) * (174 + adjustment_x[step]) + 345 + adjustment_x2[step], 
    Math.cos(degToRad(i*0.4)) * (174 + adjustment_y[step]) + 291, String(i), "black", "10px arial");
  }
  x100pt3 = Math.sin(degToRad(-100*0.4)) * 174 + 345;
  x100pt2 = Math.sin(degToRad(100*0.4)) * 174 + 345;
  let coordinates2 = [[345+10,291+164+25],[x100pt2,291+164+25]];
  addLine(coordinates2,"rgb(0, 0, 0)",1);
  addText(345 + 22, 291 + 164 + 25 - 5, "AGGRADATION", "black", "10px arial");
  coordinates2 = [[x100pt2,291+164+25],[x100pt2-10,291+164+25-5],[x100pt2-10,291+164+25+10],[x100pt2,291+164+25]];
  addPoly(coordinates2,"rgb(0, 0, 0)");
  coordinates2 = [[345-10,291+164+25],[x100pt3,291+164+25]];
  addLine(coordinates2,"rgb(0, 0, 0)",1);
  addText(345 - 95, 291 + 164 + 25 - 5, "DEGRADATION", "black", "10px arial");
  coordinates2 = [[x100pt3,291+164+25],[x100pt3+10,291+164+25-5],[x100pt3+10,291+164+25+10],[x100pt3,291+164+25]];
  addPoly(coordinates2,"rgb(0, 0, 0)");
  for (let i = -75; i <= 75; i+=50) {
    let coordinates6 = [[Math.sin(degToRad(i*0.4)) * 164 + 345,Math.cos(degToRad(i*0.4)) * 164 + 291],
    [Math.sin(degToRad(i*0.4)) * 169 + 345,Math.cos(degToRad(i*0.4)) * 169 + 291]];
    addLine(coordinates6,"rgb(0, 0, 0)",1);
  }
}
function updateLanesBalanceScaleChart() {
  // Update the static portions of the Lane's Balance, Balance Scale Graphic Chart here
  localStorage.setItem('graphBaseBottomY', '609')
  const scaleCenterX = 345;
  const scaleCenterY = 291;
  localStorage.setItem('graphScaleCenterX', scaleCenterX);
  localStorage.setItem('graphScaleCenterY', scaleCenterY);
  const pointerLength = 164;
  //0. Clear canvas
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
  //1. Create inverted T for the base, balance scale and base centered at the midpoint
  const x_values = [];
  const y_values = [];
  const midpoint_x = Math.round(width/2);
  const midpoint_y = Math.round(height/2);
  const balance_scale_height = 528;
  const base_height = 346;
  const base_width = 346;
  const base_thickness = 20;
  let coord0 = [[midpoint_x + base_width/2,midpoint_y + balance_scale_height/2],[midpoint_x + base_width/2,midpoint_y + balance_scale_height/2 - base_thickness],
  [midpoint_x + base_thickness/2,midpoint_y + balance_scale_height/2 - base_thickness],
  [midpoint_x + base_thickness/2,midpoint_y + balance_scale_height/2 - base_thickness - base_height],
  [midpoint_x - base_thickness/2,midpoint_y + balance_scale_height/2 - base_thickness - base_height],
  [midpoint_x - base_thickness/2,midpoint_y + balance_scale_height/2 - base_thickness],[midpoint_x - base_width/2,midpoint_y + balance_scale_height/2 - base_thickness],
  [midpoint_x - base_width/2,midpoint_y + balance_scale_height/2],[midpoint_x + base_width/2,midpoint_y + balance_scale_height/2]];
  addPoly(coord0,"rgb(0, 112, 172)");
  //2. Create circular Fulcrum for the Balance Scale Bar Pointer, 48 down from the top of the base.
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.arc(scaleCenterX, scaleCenterY, 6, degToRad(0), degToRad(360), false);
  ctx.fill();
  //3. Make the rectangular base for the scale speedometer for scale speedometer arc from -40 to 40 degrees.
  //The pointer length = 164px, horizontal and vertical buffer = 30
  coord0 = [[Math.sin(degToRad(40)) * pointerLength + scaleCenterX + 30, Math.cos(degToRad(40)) * pointerLength + scaleCenterY - 30],
  [Math.sin(degToRad(40)) * pointerLength + scaleCenterX + 30,pointerLength + scaleCenterY + 30],
  [-Math.sin(degToRad(40)) * pointerLength + scaleCenterX - 30,pointerLength + scaleCenterY + 30],
  [-Math.sin(degToRad(40)) * pointerLength + scaleCenterX - 30,Math.cos(degToRad(40)) * pointerLength + scaleCenterY - 30],
  [Math.sin(degToRad(40)) * pointerLength + scaleCenterX + 30,Math.cos(degToRad(40)) * pointerLength + scaleCenterY - 30]];
  addPoly(coord0,"rgb(170, 170, 170)");
  //4. Make an Arc for the Scale Speedometer from 40 degrees to -40 degrees (50 to 130 from horizontal x)
  //Center is at the same point as the connecting point center  
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.arc(345, 291, 164, degToRad(50), degToRad(130), false);
  ctx.lineWidth = 1;
  ctx.stroke();
  //5. Add tic marks for the arc for the scale speedometer at 0, 25, 50, 75, 100 % (at 0, 10, 20, 30, & 40 degrees)
  //also add labels for the tic marks and lines indicating increasing aggradation and degradation
  addTics();
  updateScaleBar();
}
function updateScaleBar() {
  let x_values5 = [];
  let y_values5 = [];
  const centerScaleX = Number(localStorage.getItem('graphScaleCenterX'));
  const centerScaleY = Number(localStorage.getItem('graphScaleCenterY'));
  const scaleBarAngle = Number(localStorage.getItem('calcAngle'));
  const baseScaleBottomY = Number(localStorage.getItem('graphBaseBottomY'));
  const balancePercent = localStorage.getItem('calcBalancePercent');
  const pointerLength = 164;
  const centerScaleBarWidth = 326;
  const ScaleBarThickness = 34;
  const sideScaleBarWidth = 180;
  //Calculate x & y for the middle of the right & left part of the balance scale center bar, which rotates
  const centerScaleBarRightMiddleX = centerScaleX + Math.cos(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarRightMiddleY = centerScaleY - Math.sin(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarLeftMiddleX = centerScaleX - Math.cos(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarLeftMiddleY = centerScaleY + Math.sin(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  //Draw the outer part of the scale bar: leftmost bottom --> rightmost bottom --> rightmost top --> leftmost top --> leftmost bottom
  let pt0 = [[centerScaleBarLeftMiddleX - sideScaleBarWidth,centerScaleBarLeftMiddleY + ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX,centerScaleBarLeftMiddleY + ScaleBarThickness/2],[centerScaleBarRightMiddleX,centerScaleBarRightMiddleY + ScaleBarThickness/2],
  [centerScaleBarRightMiddleX + sideScaleBarWidth,centerScaleBarRightMiddleY + ScaleBarThickness/2],
  [centerScaleBarRightMiddleX + sideScaleBarWidth,centerScaleBarRightMiddleY - ScaleBarThickness/2],
  [centerScaleBarRightMiddleX,centerScaleBarRightMiddleY - ScaleBarThickness/2],[centerScaleBarLeftMiddleX,centerScaleBarLeftMiddleY - ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX - sideScaleBarWidth,centerScaleBarLeftMiddleY - ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX - sideScaleBarWidth,centerScaleBarLeftMiddleY + ScaleBarThickness/2]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //Draw the connection between the center and right scale bar 
  pt0 = [[centerScaleBarRightMiddleX,centerScaleBarRightMiddleY + ScaleBarThickness/2],[centerScaleBarRightMiddleX,centerScaleBarRightMiddleY - ScaleBarThickness/2]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //Draw the connection between the center and left scale bar 
  pt0 = [[centerScaleBarLeftMiddleX,centerScaleBarLeftMiddleY + ScaleBarThickness/2],[centerScaleBarLeftMiddleX,centerScaleBarLeftMiddleY - ScaleBarThickness/2]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //puts text in the right balance bar - "INCREASING SLOPE"
  addText(centerScaleBarRightMiddleX+5,centerScaleBarRightMiddleY+ScaleBarThickness/2-5,"INCREASING SLOPE","white","10px arial");
  //draws a horizontal arrow in the right balance bar for increasing slope
  pt0 = [[centerScaleBarRightMiddleX + sideScaleBarWidth - 70,centerScaleBarRightMiddleY - 10 + ScaleBarThickness/2],
  [centerScaleBarRightMiddleX + sideScaleBarWidth - 10,centerScaleBarRightMiddleY - 10 + ScaleBarThickness/2]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //draws an arrowhead on the horizontal line in the right balance bar
  pt0 = [[centerScaleBarRightMiddleX + sideScaleBarWidth - 10,centerScaleBarRightMiddleY - 10 + ScaleBarThickness/2],
  [centerScaleBarRightMiddleX + sideScaleBarWidth - 20,centerScaleBarRightMiddleY - 15 + ScaleBarThickness/2],
  [centerScaleBarRightMiddleX + sideScaleBarWidth - 20,centerScaleBarRightMiddleY - 5 + ScaleBarThickness/2],
  [centerScaleBarRightMiddleX + sideScaleBarWidth - 10,centerScaleBarRightMiddleY - 10 + ScaleBarThickness/2]];
  addPoly(pt0,"rgb(255, 255, 255)");
  //draws tic mark "0.01" and label in the right balance bar
  pt0 = [[centerScaleBarRightMiddleX + 40,centerScaleBarRightMiddleY - ScaleBarThickness/2],
  [centerScaleBarRightMiddleX + 40,centerScaleBarRightMiddleY - ScaleBarThickness/2 + 5]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  addText(centerScaleBarRightMiddleX + 40 - 10,centerScaleBarRightMiddleY-ScaleBarThickness/2 + 15,"0.01","white","10px arial");
  //draws tic mark "1.0" and label in the right balance bar
  pt0 = [[centerScaleBarRightMiddleX + sideScaleBarWidth - 40,centerScaleBarRightMiddleY - ScaleBarThickness/2],
  [centerScaleBarRightMiddleX + sideScaleBarWidth - 40,centerScaleBarRightMiddleY - ScaleBarThickness/2 + 5]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  addText(centerScaleBarRightMiddleX + sideScaleBarWidth - 40 - 10,centerScaleBarRightMiddleY-ScaleBarThickness/2 + 15,"1.0","white","10px arial");
  //puts text in the left balance bar - "INCREASING SED SIZE"
  addText(centerScaleBarLeftMiddleX - sideScaleBarWidth + 60,centerScaleBarLeftMiddleY+ScaleBarThickness/2-5,"INCREASING SED SIZE","white","10px arial");
  //draws a horizontal arrow in the left balance bar for increasing sed size
  pt0 = [[centerScaleBarLeftMiddleX - sideScaleBarWidth + 55,centerScaleBarLeftMiddleY - 10 + ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX - sideScaleBarWidth + 5,centerScaleBarLeftMiddleY - 10 + ScaleBarThickness/2]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //draws an arrowhead on the horizontal line in the left balance bar
  pt0 = [[centerScaleBarLeftMiddleX - sideScaleBarWidth + 5,centerScaleBarLeftMiddleY - 10 + ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX - sideScaleBarWidth + 15,centerScaleBarLeftMiddleY - 5 + ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX - sideScaleBarWidth + 15,centerScaleBarLeftMiddleY - 15 + ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX - sideScaleBarWidth + 5,centerScaleBarLeftMiddleY - 10 + ScaleBarThickness/2]];
  addPoly(pt0,"rgb(255, 255, 255)");
  //draws tic mark "110" and label in the left balance bar
  pt0 = [[centerScaleBarLeftMiddleX - sideScaleBarWidth + 40,centerScaleBarLeftMiddleY - ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX - sideScaleBarWidth + 40,centerScaleBarLeftMiddleY - ScaleBarThickness/2 + 5]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  addText(centerScaleBarLeftMiddleX - sideScaleBarWidth + 40 - 10,centerScaleBarLeftMiddleY-ScaleBarThickness/2 + 15,"110","white","10px arial");
  //draws tic mark "2" and label in the left balance bar
  pt0 = [[centerScaleBarLeftMiddleX - 40,centerScaleBarLeftMiddleY - ScaleBarThickness/2],
  [centerScaleBarLeftMiddleX - 40,centerScaleBarLeftMiddleY - ScaleBarThickness/2 + 5]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  addText(centerScaleBarLeftMiddleX - 40 - 3,centerScaleBarLeftMiddleY-ScaleBarThickness/2 + 15,"2","white","10px arial")
  //put in vertical connector to the weight on left side bar
  const connectorX = -((sideScaleBarWidth - 80) / (110 - 2)) * (Number(localStorage.getItem('valueSize')) - 2) + (centerScaleBarLeftMiddleX - 40);
  pt0 = [[connectorX,centerScaleBarLeftMiddleY + ScaleBarThickness/2],[connectorX,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 40]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //put in vertical connector to the weight on right side bar
  const connectorX2 = ((sideScaleBarWidth - 80) / (1 - 0.01)) * (Number(localStorage.getItem('valueSlope')) - 0.01) + (centerScaleBarRightMiddleX + 40);
  pt0 = [[connectorX2,centerScaleBarRightMiddleY + ScaleBarThickness/2],[connectorX2,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 40]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //put in weight on the left side bar
  pt0 = [[connectorX - 40,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 40],
  [connectorX + 40,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 40],
  [connectorX + 40,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 120],
  [connectorX - 40,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 120],
  [connectorX - 40,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 40]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //put in weight on the right side bar
  pt0 = [[connectorX2 - 40,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 40],
  [connectorX2 + 40,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 40],
  [connectorX2 + 40,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 120],
  [connectorX2 - 40,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 120],
  [connectorX2 - 40,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 40]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //puts weight text in the supply weight (left side)
  addText(connectorX - 30,centerScaleBarLeftMiddleY+ScaleBarThickness/2+65,"SUPPLY = ","white","12px arial");
  addText(connectorX - 13,centerScaleBarLeftMiddleY+ScaleBarThickness/2+85,localStorage.getItem('valueSupply'),"white","12px arial");
  //draws a vertical arrow in the supply weight (left side)
  pt0 = [[connectorX,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 95],
  [connectorX,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 115]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //draws an arrowhead on the supply weight arrow
  pt0 = [[connectorX,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 115],
  [connectorX+5,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 105],
  [connectorX-5,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 105],
  [connectorX,centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 115]];
  addPoly(pt0,"rgb(255, 255, 255)");
  //puts weight text in the flow weight
  addText(connectorX2 - 25,centerScaleBarRightMiddleY+ScaleBarThickness/2+54,"FLOW = ","white","12px arial");
  addText(connectorX2 - 13,centerScaleBarRightMiddleY+ScaleBarThickness/2+67,localStorage.getItem('valueFlow'),"white","12px arial");
  addText(connectorX2 - 10,centerScaleBarRightMiddleY+ScaleBarThickness/2+82,'n = ',"white","12px arial");
  addText(connectorX2 - 16,centerScaleBarRightMiddleY+ScaleBarThickness/2+96,localStorage.getItem('valueManning'),"white","12px arial");
  //draws a vertical line in the flow weight
  pt0 = [[connectorX2,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 100],
  [connectorX2,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 115]];
  addLine(pt0,"rgb(255, 255, 255)",2);
  //draws an arrowhead on the flow weight arrow
  pt0 = [[connectorX2,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 115],
  [connectorX2 + 5,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 105],
  [connectorX2 - 5,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 105],
  [connectorX2,centerScaleBarRightMiddleY + ScaleBarThickness/2 + 115]];
  addPoly(pt0,"rgb(255, 255, 255)");
  //draws a line for the scale pointer
  pt0 = [[centerScaleX,centerScaleY],
  [pointerLength * Math.sin(degToRad(scaleBarAngle)) + centerScaleX,pointerLength * Math.cos(degToRad(scaleBarAngle)) + centerScaleY]];
  addLine(pt0,"rgb(125, 125, 125)",5);
  //draw an arrowhead for the scale pointer
  pt0 = [[pointerLength * Math.sin(degToRad(scaleBarAngle)) + centerScaleX,pointerLength * Math.cos(degToRad(scaleBarAngle)) + centerScaleY],
  [(pointerLength - 16) * Math.sin(degToRad(scaleBarAngle)) + centerScaleX + Math.cos(degToRad(scaleBarAngle))*8,
    (pointerLength - 16) * Math.cos(degToRad(scaleBarAngle)) + centerScaleY - Math.sin(degToRad(scaleBarAngle))*8
  ],[(pointerLength - 16) * Math.sin(degToRad(scaleBarAngle)) + centerScaleX - Math.cos(degToRad(scaleBarAngle))*8,
    (pointerLength - 16) * Math.cos(degToRad(scaleBarAngle)) + centerScaleY + Math.sin(degToRad(scaleBarAngle))*8
  ],[pointerLength * Math.sin(degToRad(scaleBarAngle)) + centerScaleX,pointerLength * Math.cos(degToRad(scaleBarAngle)) + centerScaleY]];
  addPoly(pt0,"rgb(0, 0, 0)");
  //Add text below the base
  addText(centerScaleX - 66, baseScaleBottomY + 14,"Supply (Aggradation +)","white","14px arial");
  addText(centerScaleX - 5, baseScaleBottomY + 32,"vs.","white","14px arial");
  addText(centerScaleX - 71, baseScaleBottomY + 50,"Transport (Degradation -)","white","14px arial");
  addText(centerScaleX - 7, baseScaleBottomY + 74,balancePercent + "%","white","18px arial");
  //add text above the scale
  addText(centerScaleX - 145, 20,"Lane's Sediment Continuity Balance Scale","white","14px arial");
  addText(centerScaleX - 290, 50,"Sediment Supply (Qs) * Sediment Size (d50) ~ Flow Rate (Q) * Slope (S) * Manning's Coef. (n)");
}