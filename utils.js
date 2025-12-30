function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
function addPoly(x_values,y_values,color_val) {
  ctx.fillStyle = color_val
  ctx.beginPath();
  ctx.moveTo(x_values[0],y_values[0]);
  let y = -1;
  for (const value of x_values) {
    y++
    const value2 = y_values[y];
    //console.log(String(y)+":  x="+String(value)+", y="+String(value2))
    ctx.lineTo(value, value2);
  }
  ctx.fill();
  x_values.length = 0;
  y_values.length = 0;
}
function addLine(x_values,y_values,color_val,line_width) {
  ctx.strokeStyle = color_val
  ctx.beginPath();
  ctx.moveTo(x_values[0],y_values[0]);
  let y = -1;
  for (const value of x_values) {
    y++
    const value2 = y_values[y];
    //console.log(String(y)+":  x="+String(value)+", y="+String(value2))
    ctx.lineTo(value, value2);
  }
  ctx.lineWidth = line_width;
  ctx.stroke();
  x_values.length = 0;
  y_values.length = 0;
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
  let x_values6 = [];
  let y_values6 = [];
  for (let i = -100; i <= 100; i+=50) {
    step++;
    x_values6.push(Math.sin(degToRad(i*0.4)) * 164 + 345);
    y_values6.push(Math.cos(degToRad(i*0.4)) * 164 + 291);
    x_values6.push(Math.sin(degToRad(i*0.4)) * 174 + 345);
    y_values6.push(Math.cos(degToRad(i*0.4)) * 174 + 291);
    addLine(x_values6,y_values6,"rgb(0, 0, 0)",1);
    addText(Math.sin(degToRad(i*0.4)) * (174 + adjustment_x[step]) + 345 + adjustment_x2[step], 
    Math.cos(degToRad(i*0.4)) * (174 + adjustment_y[step]) + 291, String(i), "black", "10px arial");
  }
  x100pt3 = Math.sin(degToRad(-100*0.4)) * 174 + 345;
  x100pt2 = Math.sin(degToRad(100*0.4)) * 174 + 345;
  let x_values3 = [];
  let y_values3 = [];
  x_values3.push(345+10);
  y_values3.push(291+164+25);
  x_values3.push(x100pt2);
  y_values3.push(291+164+25);
  addLine(x_values3,y_values3,"rgb(0, 0, 0)",1);
  addText(345 + 22, 291 + 164 + 25 - 5, "AGGRADATION", "black", "10px arial");
  x_values3.push(x100pt2);
  y_values3.push(291+164+25);
  x_values3.push(x100pt2-10);
  y_values3.push(291+164+25-5);
  x_values3.push(x100pt2-10);
  y_values3.push(291+164+25+10);
  x_values3.push(x100pt2);
  y_values3.push(291+164+25);
  addPoly(x_values3,y_values3,"rgb(0, 0, 0)");
  x_values3.push(345-10);
  y_values3.push(291+164+25);
  x_values3.push(x100pt3);
  y_values3.push(291+164+25);
  addLine(x_values3,y_values3,"rgb(0, 0, 0)",1);
  addText(345 - 95, 291 + 164 + 25 - 5, "DEGRADATION", "black", "10px arial");
  x_values3.push(x100pt3);
  y_values3.push(291+164+25);
  x_values3.push(x100pt3+10);
  y_values3.push(291+164+25-5);
  x_values3.push(x100pt3+10);
  y_values3.push(291+164+25+10);
  x_values3.push(x100pt3);
  y_values3.push(291+164+25);
  addPoly(x_values3,y_values3,"rgb(0, 0, 0)");
  for (let i = -75; i <= 75; i+=50) {
    x_values6.push(Math.sin(degToRad(i*0.4)) * 164 + 345);
    y_values6.push(Math.cos(degToRad(i*0.4)) * 164 + 291);
    x_values6.push(Math.sin(degToRad(i*0.4)) * 169 + 345);
    y_values6.push(Math.cos(degToRad(i*0.4)) * 169 + 291);
    addLine(x_values6,y_values6,"rgb(0, 0, 0)",1);
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
  x_values.push(midpoint_x + base_width/2);
  y_values.push(midpoint_y + balance_scale_height/2);
  x_values.push(midpoint_x + base_width/2);
  y_values.push(midpoint_y + balance_scale_height/2 - base_thickness);
  x_values.push(midpoint_x + base_thickness/2);
  y_values.push(midpoint_y + balance_scale_height/2 - base_thickness);
  x_values.push(midpoint_x + base_thickness/2);
  y_values.push(midpoint_y + balance_scale_height/2 - base_thickness - base_height);
  x_values.push(midpoint_x - base_thickness/2);
  y_values.push(midpoint_y + balance_scale_height/2 - base_thickness - base_height);
  x_values.push(midpoint_x - base_thickness/2);
  y_values.push(midpoint_y + balance_scale_height/2 - base_thickness);
  x_values.push(midpoint_x - base_width/2);
  y_values.push(midpoint_y + balance_scale_height/2 - base_thickness);
  x_values.push(midpoint_x - base_width/2);
  y_values.push(midpoint_y + balance_scale_height/2);
  x_values.push(midpoint_x + base_width/2);
  y_values.push(midpoint_y + balance_scale_height/2);
  addPoly(x_values,y_values,"rgb(0, 112, 172)");
  //2. Create circular Fulcrum for the Balance Scale Bar Pointer, 48 down from the top of the base.
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.arc(scaleCenterX, scaleCenterY, 6, degToRad(0), degToRad(360), false);
  ctx.fill();
  //3. Make the rectangular base for the scale speedometer for scale speedometer arc from -40 to 40 degrees.
  //The pointer length = 164px, horizontal and vertical buffer = 30
  x_values.push(Math.sin(degToRad(40)) * pointerLength + scaleCenterX + 30);
  y_values.push(Math.cos(degToRad(40)) * pointerLength + scaleCenterY - 30);
  x_values.push(Math.sin(degToRad(40)) * pointerLength + scaleCenterX + 30);
  y_values.push(pointerLength + scaleCenterY + 30);
  x_values.push(-Math.sin(degToRad(40)) * pointerLength + scaleCenterX - 30);
  y_values.push(pointerLength + scaleCenterY + 30);
  x_values.push(-Math.sin(degToRad(40)) * pointerLength + scaleCenterX - 30);
  y_values.push(Math.cos(degToRad(40)) * pointerLength + scaleCenterY - 30);
  x_values.push(Math.sin(degToRad(40)) * pointerLength + scaleCenterX + 30);
  y_values.push(Math.cos(degToRad(40)) * pointerLength + scaleCenterY - 30);
  addPoly(x_values,y_values,"rgb(170, 170, 170)");
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
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth);
  y_values5.push(centerScaleBarRightMiddleY - ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX);
  y_values5.push(centerScaleBarRightMiddleY - ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX);
  y_values5.push(centerScaleBarLeftMiddleY - ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth);
  y_values5.push(centerScaleBarLeftMiddleY - ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //Draw the connection between the center and right scale bar 
  x_values5.push(centerScaleBarRightMiddleX);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX);
  y_values5.push(centerScaleBarRightMiddleY - ScaleBarThickness/2);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //Draw the connection between the center and left scale bar 
  x_values5.push(centerScaleBarLeftMiddleX);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX);
  y_values5.push(centerScaleBarLeftMiddleY - ScaleBarThickness/2);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //puts text in the right balance bar - "INCREASING SLOPE"
  addText(centerScaleBarRightMiddleX+5,centerScaleBarRightMiddleY+ScaleBarThickness/2-5,"INCREASING SLOPE","white","10px arial");
  //draws a horizontal arrow in the right balance bar for increasing slope
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth - 70);
  y_values5.push(centerScaleBarRightMiddleY - 10 + ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth - 10);
  y_values5.push(centerScaleBarRightMiddleY - 10 + ScaleBarThickness/2);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //draws an arrowhead on the horizontal line in the right balance bar
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth - 10);
  y_values5.push(centerScaleBarRightMiddleY - 10 + ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth - 20);
  y_values5.push(centerScaleBarRightMiddleY - 15 + ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth - 20);
  y_values5.push(centerScaleBarRightMiddleY - 5 + ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth - 10);
  y_values5.push(centerScaleBarRightMiddleY - 10 + ScaleBarThickness/2);
  addPoly(x_values5,y_values5,"rgb(255, 255, 255)");
  //draws tic mark "0.01" and label in the right balance bar
  x_values5.push(centerScaleBarRightMiddleX + 40);
  y_values5.push(centerScaleBarRightMiddleY - ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX + 40);
  y_values5.push(centerScaleBarRightMiddleY - ScaleBarThickness/2 + 5);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  addText(centerScaleBarRightMiddleX + 40 - 10,centerScaleBarRightMiddleY-ScaleBarThickness/2 + 15,"0.01","white","10px arial");
  //draws tic mark "1.0" and label in the right balance bar
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth - 40);
  y_values5.push(centerScaleBarRightMiddleY - ScaleBarThickness/2);
  x_values5.push(centerScaleBarRightMiddleX + sideScaleBarWidth - 40);
  y_values5.push(centerScaleBarRightMiddleY - ScaleBarThickness/2 + 5);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  addText(centerScaleBarRightMiddleX + sideScaleBarWidth - 40 - 10,centerScaleBarRightMiddleY-ScaleBarThickness/2 + 15,"1.0","white","10px arial");
  //puts text in the left balance bar - "INCREASING SED SIZE"
  addText(centerScaleBarLeftMiddleX - sideScaleBarWidth + 60,centerScaleBarLeftMiddleY+ScaleBarThickness/2-5,"INCREASING SED SIZE","white","10px arial");
  //draws a horizontal arrow in the left balance bar for increasing sed size
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth + 55);
  y_values5.push(centerScaleBarLeftMiddleY - 10 + ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth + 5);
  y_values5.push(centerScaleBarLeftMiddleY - 10 + ScaleBarThickness/2);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //draws an arrowhead on the horizontal line in the left balance bar
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth + 5);
  y_values5.push(centerScaleBarLeftMiddleY - 10 + ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth + 15);
  y_values5.push(centerScaleBarLeftMiddleY - 5 + ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth + 15);
  y_values5.push(centerScaleBarLeftMiddleY - 15 + ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth + 5);
  y_values5.push(centerScaleBarLeftMiddleY - 10 + ScaleBarThickness/2);
  addPoly(x_values5,y_values5,"rgb(255, 255, 255)");
  //draws tic mark "110" and label in the left balance bar
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth + 40);
  y_values5.push(centerScaleBarLeftMiddleY - ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX - sideScaleBarWidth + 40);
  y_values5.push(centerScaleBarLeftMiddleY - ScaleBarThickness/2 + 5);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  addText(centerScaleBarLeftMiddleX - sideScaleBarWidth + 40 - 10,centerScaleBarLeftMiddleY-ScaleBarThickness/2 + 15,"110","white","10px arial");
  //draws tic mark "2" and label in the left balance bar
  x_values5.push(centerScaleBarLeftMiddleX - 40);
  y_values5.push(centerScaleBarLeftMiddleY - ScaleBarThickness/2);
  x_values5.push(centerScaleBarLeftMiddleX - 40);
  y_values5.push(centerScaleBarLeftMiddleY - ScaleBarThickness/2 + 5);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  addText(centerScaleBarLeftMiddleX - 40 - 3,centerScaleBarLeftMiddleY-ScaleBarThickness/2 + 15,"2","white","10px arial")
  //put in vertical connector to the weight on left side bar
  const connectorX = -((sideScaleBarWidth - 80) / (110 - 2)) * (Number(localStorage.getItem('valueSize')) - 2) + (centerScaleBarLeftMiddleX - 40);
  x_values5.push(connectorX);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2);
  x_values5.push(connectorX);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 40);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //put in vertical connector to the weight on right side bar
  const connectorX2 = ((sideScaleBarWidth - 80) / (1 - 0.01)) * (Number(localStorage.getItem('valueSlope')) - 0.01) + (centerScaleBarRightMiddleX + 40);
  x_values5.push(connectorX2);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2);
  x_values5.push(connectorX2);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 40);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //put in weight on the left side bar
  x_values5.push(connectorX - 40);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 40);
  x_values5.push(connectorX + 40);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 40);
  x_values5.push(connectorX + 40);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 120);
  x_values5.push(connectorX - 40);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 120);
  x_values5.push(connectorX - 40);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 40);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //put in weight on the right side bar
  x_values5.push(connectorX2 - 40);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 40);
  x_values5.push(connectorX2 + 40);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 40);
  x_values5.push(connectorX2 + 40);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 120);
  x_values5.push(connectorX2 - 40);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 120);
  x_values5.push(connectorX2 - 40);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 40);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //puts weight text in the supply weight (left side)
  addText(connectorX - 30,centerScaleBarLeftMiddleY+ScaleBarThickness/2+65,"SUPPLY = ","white","12px arial");
  addText(connectorX - 13,centerScaleBarLeftMiddleY+ScaleBarThickness/2+85,localStorage.getItem('valueSupply'),"white","12px arial");
  //draws a vertical arrow in the supply weight (left side)
  x_values5.push(connectorX);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 95);
  x_values5.push(connectorX);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 115);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //draws an arrowhead on the supply weight arrow
  x_values5.push(connectorX);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 115);
  x_values5.push(connectorX+5);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 105);
  x_values5.push(connectorX-5);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 105);
  x_values5.push(connectorX);
  y_values5.push(centerScaleBarLeftMiddleY + ScaleBarThickness/2 + 115);
  addPoly(x_values5,y_values5,"rgb(255, 255, 255)");
  //puts weight text in the flow weight
  addText(connectorX2 - 25,centerScaleBarRightMiddleY+ScaleBarThickness/2+54,"FLOW = ","white","12px arial");
  addText(connectorX2 - 13,centerScaleBarRightMiddleY+ScaleBarThickness/2+67,localStorage.getItem('valueFlow'),"white","12px arial");
  addText(connectorX2 - 10,centerScaleBarRightMiddleY+ScaleBarThickness/2+82,'n = ',"white","12px arial");
  addText(connectorX2 - 16,centerScaleBarRightMiddleY+ScaleBarThickness/2+96,localStorage.getItem('valueManning'),"white","12px arial");
  //draws a vertical line in the flow weight
  x_values5.push(connectorX2);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 100);
  x_values5.push(connectorX2);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 115);
  addLine(x_values5,y_values5,"rgb(255, 255, 255)",2);
  //draws an arrowhead on the flow weight arrow
  x_values5.push(connectorX2);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 115);
  x_values5.push(connectorX2 + 5);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 105);
  x_values5.push(connectorX2 - 5);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 105);
  x_values5.push(connectorX2);
  y_values5.push(centerScaleBarRightMiddleY + ScaleBarThickness/2 + 115);
  addPoly(x_values5,y_values5,"rgb(255, 255, 255)");
  //draws a line for the scale pointer
  x_values5.push(centerScaleX);
  y_values5.push(centerScaleY);
  x_values5.push(pointerLength * Math.sin(degToRad(scaleBarAngle)) + centerScaleX);
  y_values5.push(pointerLength * Math.cos(degToRad(scaleBarAngle)) + centerScaleY);
  addLine(x_values5,y_values5,"rgb(125, 125, 125)",5);
  //draw an arrowhead for the scale pointer
  x_values5.push(pointerLength * Math.sin(degToRad(scaleBarAngle)) + centerScaleX);
  y_values5.push(pointerLength * Math.cos(degToRad(scaleBarAngle)) + centerScaleY);
  x_values5.push((pointerLength - 16) * Math.sin(degToRad(scaleBarAngle)) + centerScaleX + Math.cos(degToRad(scaleBarAngle))*8);
  y_values5.push((pointerLength - 16) * Math.cos(degToRad(scaleBarAngle)) + centerScaleY - Math.sin(degToRad(scaleBarAngle))*8);
  x_values5.push((pointerLength - 16) * Math.sin(degToRad(scaleBarAngle)) + centerScaleX - Math.cos(degToRad(scaleBarAngle))*8);
  y_values5.push((pointerLength - 16) * Math.cos(degToRad(scaleBarAngle)) + centerScaleY + Math.sin(degToRad(scaleBarAngle))*8);
  x_values5.push(pointerLength * Math.sin(degToRad(scaleBarAngle)) + centerScaleX);
  y_values5.push(pointerLength * Math.cos(degToRad(scaleBarAngle)) + centerScaleY);
  addPoly(x_values5,y_values5,"rgb(0, 0, 0)");
  //Add text below the base
  addText(centerScaleX - 66, baseScaleBottomY + 14,"Supply (Aggradation +)","white","14px arial");
  addText(centerScaleX - 5, baseScaleBottomY + 32,"vs.","white","14px arial");
  addText(centerScaleX - 71, baseScaleBottomY + 50,"Transport (Degradation -)","white","14px arial");
  addText(centerScaleX - 7, baseScaleBottomY + 74,balancePercent + "%","white","18px arial");
  //add text above the scale
  addText(centerScaleX - 145, 20,"Lane's Sediment Continuity Balance Scale","white","14px arial");
  addText(centerScaleX - 290, 50,"Sediment Supply (Qs) * Sediment Size (d50) ~ Flow Rate (Q) * Slope (S) * Manning's Coef. (n)");
}