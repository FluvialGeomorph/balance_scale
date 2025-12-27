function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function calcBalance(stableOption) {
  //Calculate the sediment transport capacity ratio (qs2/qs1) with the Gary Brown (2025) equation (for conditions 1 & 2)
  //S2/S1 ~ (qs2/qs1)^(20/7m) * (q1/q2)^((20+6m)/7m) * (D2/D1)^(40/21) * (n1/n2)^(78/21)
  //qs = sediment transport capacity; S = slope; q = flow; m = transport coefficient; d = size; n = manning's n value; t = sediment supply
  //Solve for qs2/qs1:
  //qs2/qs1 = ((S2/S1) / ((q1/q2)^((20+6m)/7m) * (D2/D1)^(40/21) * (n1/n2)^(78/21)))^(7m/20)
  //qs2/qs1 = ( s_part / ( q_part              *  d_part          * n_part        ))^(e_part)
  //q_exp = (20.0 + 6.0*m)/(7.0*m)
  //q_part = (q1/q2)**q_exp
  //d_part = (d2/d1)**(40.0/21.0)
  //n_part = (n1/n2)**(78.0/21.0)
  //s_part = s2/s1
  //qs_exp = 20.0/(7.0*m)
  //e_part = 1/qs_exp
  //qs2/qs1 = (s_part / (q_part * d_part * n_part)) ** e_part
  //qs2_qs1 = qs2/qs1
  //t2_t1 = t2/t1
  //Sediment Continuity Balance = Ratio of the Sediment Supply to the Sediment Transport Capacity.  Positive = Aggradation; Negative = Degradation.
  //Assume the sediment continuity balance is 0% at condition 1 (completely in balance).
  //Sediment Continuity Balance at Condition 2 = Ratio of the Sediment Supply (t2/t1) - Ratio of transport capacity (qs2/qs1).  
  //Sediment Continuity Balance % = (t2/t1 - qs2/qs1) * 100
  const s2 = Number(localStorage.getItem('valueSlope')) / 100.0;
  const s1 = Number(localStorage.getItem('defaultSlope')) / 100.0;
  const q2 = Number(localStorage.getItem('valueFlow'));
  const q1 = Number(localStorage.getItem('defaultFlow'));
  const m = Number(localStorage.getItem('defaultTransport'));
  const d2 = Number(localStorage.getItem('valueSize')) / 304.8;
  const d1 = Number(localStorage.getItem('defaultSize')) / 304.8;
  const n2 = Number(localStorage.getItem('valueManning'));
  const n1 = Number(localStorage.getItem('defaultManning'));
  const t2 = Number(localStorage.getItem('valueSupply')) / 3600.0;
  const t1 = Number(localStorage.getItem('defaultSupply')) / 3600.0;
  const q_exp = (20.0 + 6.0*m)/(7.0*m)
  const q_part = (q1/q2)**q_exp
  const d_part = (d2/d1)**(40.0/21.0)
  const n_part = (n1/n2)**(78.0/21.0)
  const s_part = s2/s1
  const qs_exp = 20.0/(7.0*m)
  const e_part = 1/qs_exp
  const qs2_qs1 = (s_part / (q_part * d_part * n_part)) ** e_part
  const t2_t1 = t2/t1
  const balanceContinuityPercent = (t2_t1 - qs2_qs1)*100.0
  const balanceContinuityPercentRounded = Math.round(balanceContinuityPercent)
  localStorage.setItem('calcBalancePercent', String(balanceContinuityPercentRounded));
  let angleCalc = balanceContinuityPercent * 0.4;
  localStorage.setItem('calcAngle',angleCalc);
  updateLanesBalanceScaleChart();
}

function updateLanesBalanceScaleChart() {
  // Update the static portions of the Lane's Balance, Balance Scale Graphic Chart here
  
  //1. Clear canvas
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
  
  //2. Create path for the base
  //The horizontal part of the base is 3.6" in width and 0.2" in thickness
  //The vertical part of the base is 3.6" in width and 0.2" in thickness
  //The color is RGB (0, 112, 172)
  //The required height for the whole balance scale is 3.6" + 0.2" + 1.7" = 5.5"
  //The canvas = 690px X 690px; balance height = 528 pixels
  //Base height = 3.8" = 365 px; thickness = 0.2" = 20px; width = 3.6" = 346 pixels
  //Midpoint canvas = 345px, 345px; Base Bottom y = 345 + 528/2 = 609 px
  //Base Right x = 345 + 346/2 = 518 px; base bottom right = 518, 609; hor. base right top = 518, 609-20 = 589
  //right point for bottom of vertical base x = 518 - 346/2 + 20 = x = 355; y = 589
  //right point for top of vertical base = 589 - 346 = y = 243, x = 355;
  //left point for top of vertical base = x = 355 - 20 = 335
  //left point for bottom of vertical base = x = 335, y = 589
  //left point for top of horizontal base = x = 518 - 346 = 172; y = 589
  localStorage.setItem('graphBaseBottomY', '609')
  ctx.fillStyle = "rgb(0, 112, 172)";
  ctx.beginPath();
  //horizontal base right bottom point
  ctx.moveTo(518, 609);
  //horizontal base right top point
  ctx.lineTo(518, 589);
  //vertical base bottom right point
  ctx.lineTo(355, 589);
  //vertical base top right point
  ctx.lineTo(355, 243);
  //vertical base top left point
  ctx.lineTo(335, 243);
  //vertical base bottom left point
  ctx.lineTo(335, 589);
  //horizontal base left top point
  ctx.lineTo(172, 589);
  //horizontal base left bottom point
  ctx.lineTo(172, 609);
  //horizontal base right bottom point
  ctx.lineTo(518, 609);
  ctx.fill();
  
  //2. Create circular path for connecting point of base to scale pointer and balance scale bar
  //diameter = 20, radius = 10 center x = 345, y = 243  + 48 = 291; 
  //Make a black line for the circular connecting point
  //ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.strokeStyle = "rgb(100, 100, 100)";
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  //ctx.arc(345, 291, 8, degToRad(0), degToRad(360), false);
  ctx.arc(345, 291, 6, degToRad(0), degToRad(360), false);
  //ctx.lineWidth = 3;
  //ctx.stroke();
  ctx.fill();
  const scaleCenterX = 345;
  const scaleCenterY = 291;
  localStorage.setItem('graphScaleCenterX', scaleCenterX);
  localStorage.setItem('graphScaleCenterY', scaleCenterY);
  
  //3. Make the base for the scale speedometer 
  //Needs to cover the extent of the scale speedometer arc from -35 to 35 degrees.
  //Add 20 pixels on the sides and 30 pixels above and below.  
  //Center x = 345; pointer length = 164;
  //arcHoriz = the arc horizontal distance from the center.
  //arcVert = the vertical distance from the connecting point to the highest point on the arc
  //baseScaleTop = the y point for the top of the base for the scale speedometer
  //baseScaleBottom = the y point for the bottom of the base 
  //baseScaleRight = the x point for the right side of the base for the scale speedometer
  //baseScaleRight = the x point for the right side of the base for the scale speedometer
  const arcHoriz = Math.sin(degToRad(40)) * 164;
  const arcVert = Math.cos(degToRad(40)) * 164;
  const baseScaleTop = 291 + arcVert - 30;
  const baseScaleBottom = 291 + 164 + 30;
  const baseScaleRight = 345 + arcHoriz + 30;
  const baseScaleLeft = 345 - arcHoriz - 30;
  ctx.fillStyle = "rgb(170, 170, 170)";
  ctx.beginPath();
  ctx.moveTo(baseScaleRight, baseScaleTop);
  ctx.lineTo(baseScaleRight, baseScaleBottom);
  ctx.lineTo(baseScaleLeft, baseScaleBottom);
  ctx.lineTo(baseScaleLeft, baseScaleTop);
  ctx.lineTo(baseScaleRight, baseScaleTop);
  ctx.fill();
  
  //4. Make an Arc for the Scale Speedometer 
  //Center is at the same point as the connecting point center  
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.arc(345, 291, 164, degToRad(50), degToRad(130), false);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //5. Add tic marks for the arc for the scale speedometer 
  //Add tics at 0, 25, 50, 75, 100 % (at 0, 10, 20, 30, & 40 degrees)
  //for 100%, 40 degrees
  let x100pt1 = Math.sin(degToRad(40)) * 164 + 345;
  let x100pt2 = Math.sin(degToRad(40)) * 174 + 345;
  let y100pt1 = Math.cos(degToRad(40)) * 164 + 291;
  let y100pt2 = Math.cos(degToRad(40)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = Math.sin(degToRad(40)) * 179 + 345;
  y100pt2 = Math.cos(degToRad(40)) * 184 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("100", x100pt2, y100pt2);
  ctx.fillText("100", x100pt2, y100pt2);
  
  //line to show aggradation side
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(345 + 10, 291 + 164 + 25);
  ctx.lineTo(x100pt2, 291 + 164 + 25);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for aggradation label
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("AGGRADATION", 345 + 22, 291 + 164 + 25 - 5);
  ctx.fillText("AGGRADATION", 345 + 22, 291 + 164 + 25 - 5);
  
  //for arrowhead
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt2, 291 + 164 + 25);
  ctx.lineTo(x100pt2 - 10, 291 + 164 + 25 - 5);
  ctx.lineTo(x100pt2 - 10, 291 + 164 + 25 + 10);
  ctx.lineTo(x100pt2, 291 + 164 + 25);
  ctx.fill();
  
  //for 75%, 30 degrees
  x100pt1 = Math.sin(degToRad(30)) * 164 + 345;
  x100pt2 = Math.sin(degToRad(30)) * 169 + 345;
  y100pt1 = Math.cos(degToRad(30)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(30)) * 169 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for 50%, 20 degrees
  x100pt1 = Math.sin(degToRad(20)) * 164 + 345;
  x100pt2 = Math.sin(degToRad(20)) * 174 + 345;
  y100pt1 = Math.cos(degToRad(20)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(20)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = Math.sin(degToRad(20)) * 184 + 345;
  y100pt2 = Math.cos(degToRad(20)) * 184 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("50", x100pt2, y100pt2);
  ctx.fillText("50", x100pt2, y100pt2);
  
  //for 25%, 10 degrees
  x100pt1 = Math.sin(degToRad(10)) * 164 + 345;
  x100pt2 = Math.sin(degToRad(10)) * 169 + 345;
  y100pt1 = Math.cos(degToRad(10)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(10)) * 169 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for 0%, 0 degrees
  x100pt1 = Math.sin(degToRad(0)) * 164 + 345;
  x100pt2 = Math.sin(degToRad(0)) * 174 + 345;
  y100pt1 = Math.cos(degToRad(0)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(0)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = Math.sin(degToRad(0)) * 184 + 342;
  y100pt2 = Math.cos(degToRad(0)) * 184 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("0", x100pt2, y100pt2);
  ctx.fillText("0", x100pt2, y100pt2);
  
  //for -100%, -40 degrees
  x100pt1 = -Math.sin(degToRad(40)) * 164 + 345;
  x100pt2 = -Math.sin(degToRad(40)) * 174 + 345;
  y100pt1 = Math.cos(degToRad(40)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(40)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = -Math.sin(degToRad(40)) * 194 + 345;
  y100pt2 = Math.cos(degToRad(40)) * 194 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("-100", x100pt2, y100pt2);
  ctx.fillText("-100", x100pt2, y100pt2);
  
  //line to show degradation side
  x100pt2 = -Math.sin(degToRad(40)) * 179 + 345;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(345 - 10, 291 + 164 + 25);
  ctx.lineTo(x100pt2, 291 + 164 + 25);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for degradation label
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("DEGRADATION", 345 - 95, 291 + 164 + 25 - 5);
  ctx.fillText("DEGRADATION", 345 - 95, 291 + 164 + 25 - 5);
  
  //for arrowhead
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt2, 291 + 164 + 25);
  ctx.lineTo(x100pt2 + 10, 291 + 164 + 25 - 5);
  ctx.lineTo(x100pt2 + 10, 291 + 164 + 25 + 10);
  ctx.lineTo(x100pt2, 291 + 164 + 25);
  ctx.fill();
  
  //for 75%, 30 degrees
  x100pt1 = -Math.sin(degToRad(30)) * 164 + 345;
  x100pt2 = -Math.sin(degToRad(30)) * 169 + 345;
  y100pt1 = Math.cos(degToRad(30)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(30)) * 169 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for 50%, 20 degrees
  x100pt1 = -Math.sin(degToRad(20)) * 164 + 345;
  x100pt2 = -Math.sin(degToRad(20)) * 174 + 345;
  y100pt1 = Math.cos(degToRad(20)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(20)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = -Math.sin(degToRad(20)) * 194 + 345;
  y100pt2 = Math.cos(degToRad(20)) * 184 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("-50", x100pt2, y100pt2);
  ctx.fillText("-50", x100pt2, y100pt2);
  
  //for 25%, 10 degrees
  x100pt1 = -Math.sin(degToRad(10)) * 164 + 345;
  x100pt2 = -Math.sin(degToRad(10)) * 169 + 345;
  y100pt1 = Math.cos(degToRad(10)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(10)) * 169 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  updateScaleBar();
  
}

function updateScaleBar() {
  
  const centerScaleX = Number(localStorage.getItem('graphScaleCenterX'));
  const centerScaleY = Number(localStorage.getItem('graphScaleCenterY'));
  const scaleBarAngle = Number(localStorage.getItem('calcAngle'));
  const scaleBarCenterX = Number(localStorage.getItem('graphScaleCenterX'));
  const scaleBarCenterY = Number(localStorage.getItem('graphScaleCenterY'));
  const centerScaleBarWidth = 326;
  const ScaleBarThickness = 34;
  //const sideScaleBarWidth = 248;
  const sideScaleBarWidth = 180;
  
  //middle part of balance scale bar (rotates)
  const centerScaleBarRightMiddleX = centerScaleX + Math.cos(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarRightMiddleY = centerScaleY - Math.sin(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarRightBottomX = centerScaleBarRightMiddleX + Math.sin(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarRightBottomY = centerScaleBarRightMiddleY + Math.cos(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarRightTopX = centerScaleBarRightMiddleX - Math.sin(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarRightTopY = centerScaleBarRightMiddleY - Math.cos(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarLeftMiddleX = centerScaleX - Math.cos(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarLeftMiddleY = centerScaleY + Math.sin(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarLeftBottomX = centerScaleBarLeftMiddleX + Math.sin(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarLeftBottomY = centerScaleBarLeftMiddleY + Math.cos(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarLeftTopX = centerScaleBarLeftMiddleX - Math.sin(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarLeftTopY = centerScaleBarLeftMiddleY - Math.cos(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  
  //right part of balance scale bar (does not rotate)
  const rightSideBarLeftTopX = centerScaleBarRightMiddleX;
  const rightSideBarLeftTopY = centerScaleBarRightMiddleY - ScaleBarThickness/2;
  const rightSideBarLeftBottomX = centerScaleBarRightMiddleX;
  const rightSideBarLeftBottomY = centerScaleBarRightMiddleY + ScaleBarThickness/2;
  const rightSideBarRightTopX = centerScaleBarRightMiddleX + sideScaleBarWidth;
  const rightSideBarRightTopY = centerScaleBarRightMiddleY - ScaleBarThickness/2;
  const rightSideBarRightBottomX = centerScaleBarRightMiddleX + sideScaleBarWidth;
  const rightSideBarRightBottomY = centerScaleBarRightMiddleY + ScaleBarThickness/2;
  
  //left part of balance scale bar (does not rotate)
  const leftSideBarLeftTopX = centerScaleBarLeftMiddleX - sideScaleBarWidth;
  const leftSideBarLeftTopY = centerScaleBarLeftMiddleY - ScaleBarThickness/2;
  const leftSideBarLeftBottomX = centerScaleBarLeftMiddleX - sideScaleBarWidth;
  const leftSideBarLeftBottomY = centerScaleBarLeftMiddleY + ScaleBarThickness/2;
  const leftSideBarRightTopX = centerScaleBarLeftMiddleX;
  const leftSideBarRightTopY = centerScaleBarLeftMiddleY - ScaleBarThickness/2;
  const leftSideBarRightBottomX = centerScaleBarLeftMiddleX;
  const leftSideBarRightBottomY = centerScaleBarLeftMiddleY + ScaleBarThickness/2;
  
  //connects the inner edge of the left balance bar to the inner edge of the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarLeftBottomX, leftSideBarLeftBottomY);
  ctx.lineTo(leftSideBarRightBottomX, leftSideBarRightBottomY);
  ctx.lineTo(rightSideBarLeftBottomX, rightSideBarLeftBottomY);
  ctx.lineTo(rightSideBarRightBottomX, rightSideBarRightBottomY);
  ctx.lineTo(rightSideBarRightTopX, rightSideBarRightTopY);
  ctx.lineTo(rightSideBarLeftTopX, rightSideBarLeftTopY);
  ctx.lineTo(leftSideBarRightTopX, leftSideBarRightTopY);
  ctx.lineTo(leftSideBarLeftTopX, leftSideBarLeftTopY);
  ctx.lineTo(leftSideBarLeftBottomX, leftSideBarLeftBottomY);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //draws a vertical line on the inner edge of the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarLeftTopX, rightSideBarLeftTopY);
  ctx.lineTo(rightSideBarLeftBottomX, rightSideBarLeftBottomY);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //draws a vertical line on the inner edge of the left balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarRightTopX, leftSideBarRightTopY);
  ctx.lineTo(leftSideBarRightBottomX, leftSideBarRightBottomY);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //puts text in the right balance bar - "INCREASING SLOPE"
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("INCREASING SLOPE", rightSideBarLeftBottomX + 5, rightSideBarLeftBottomY - 5);
  ctx.fillText("INCREASING SLOPE", rightSideBarLeftBottomX + 5, rightSideBarLeftBottomY - 5);
  //draws a horizontal arrow in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarRightBottomX - 70, rightSideBarLeftBottomY - 10);
  ctx.lineTo(rightSideBarRightBottomX - 10, rightSideBarLeftBottomY - 10);
  ctx.lineWidth = 2;
  ctx.stroke();
  //draws an arrowhead on the horizontal line in the right balance bar
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarRightBottomX - 10, rightSideBarLeftBottomY - 10);
  ctx.lineTo(rightSideBarRightBottomX - 20, rightSideBarLeftBottomY - 15);
  ctx.lineTo(rightSideBarRightBottomX - 20, rightSideBarLeftBottomY -5);
  ctx.lineTo(rightSideBarRightBottomX - 10, rightSideBarLeftBottomY - 10);
  ctx.fill();
  //draws tic mark 1 in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarLeftTopX + 40, rightSideBarLeftTopY);
  ctx.lineTo(rightSideBarLeftTopX + 40, rightSideBarLeftTopY + 5);
  ctx.lineWidth = 2;
  ctx.stroke();
  //puts tic mark text 1 in the right side bar
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("0.01", rightSideBarLeftTopX + 40 - 10, rightSideBarLeftTopY + 15);
  ctx.fillText("0.01", rightSideBarLeftTopX + 40 - 10, rightSideBarLeftTopY + 15);
  //draws tic mark 2 in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarRightTopX - 40, rightSideBarRightTopY);
  ctx.lineTo(rightSideBarRightTopX - 40, rightSideBarRightTopY + 5);
  ctx.lineWidth = 2;
  //puts tic mark text 2 in the right side bar
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("1.0", rightSideBarRightTopX - 40 - 10, rightSideBarLeftTopY + 15);
  ctx.fillText("1.0", rightSideBarRightTopX - 40 - 10, rightSideBarLeftTopY + 15);
  
  //puts text in the left balance bar - "INCREASING SED SIZE"
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("INCREASING SED SIZE", leftSideBarLeftBottomX + 60, leftSideBarLeftBottomY - 5);
  ctx.fillText("INCREASING SED SIZE", leftSideBarLeftBottomX + 60, leftSideBarLeftBottomY - 5);
  //draws a horizontal arrow in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarLeftBottomX + 55, leftSideBarLeftBottomY - 10);
  ctx.lineTo(leftSideBarLeftBottomX + 5, leftSideBarLeftBottomY - 10);
  ctx.lineWidth = 2;
  ctx.stroke();
  //draws an arrowhead on the horizontal line in the right balance bar
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarLeftBottomX + 5, leftSideBarLeftBottomY - 10);
  ctx.lineTo(leftSideBarLeftBottomX + 15, leftSideBarLeftBottomY - 5);
  ctx.lineTo(leftSideBarLeftBottomX + 15, leftSideBarLeftBottomY -15);
  ctx.lineTo(leftSideBarLeftBottomX + 5, leftSideBarLeftBottomY - 10);
  ctx.fill();
  //draws tic mark 1 in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarLeftTopX + 40, leftSideBarLeftTopY);
  ctx.lineTo(leftSideBarLeftTopX + 40, leftSideBarLeftTopY + 5);
  ctx.lineWidth = 2;
  ctx.stroke();
  //puts tic mark text 1 in the right side bar
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("110", leftSideBarLeftTopX + 40 - 10, leftSideBarLeftTopY + 15);
  ctx.fillText("110", leftSideBarLeftTopX + 40 - 10, leftSideBarLeftTopY + 15);
  //draws tic mark 2 in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarRightTopX - 40, leftSideBarRightTopY);
  ctx.lineTo(leftSideBarRightTopX - 40, leftSideBarRightTopY + 5);
  ctx.lineWidth = 2;
  ctx.stroke();
  //puts tic mark text 2 in the right side bar
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("2", leftSideBarRightTopX - 40 - 3, leftSideBarRightTopY + 15);
  ctx.fillText("2", leftSideBarRightTopX - 40 - 3, leftSideBarRightTopY + 15);
  
  //put in vertical connector to the weight on left side bar
  const connectorX = -((leftSideBarRightBottomX - leftSideBarLeftBottomX - 80) / (110 - 2)) * (Number(localStorage.getItem('valueSize')) - 2) + (leftSideBarRightBottomX - 40);
  //draws weight connector to the left balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX, leftSideBarRightBottomY);
  ctx.lineTo(connectorX, leftSideBarRightBottomY + 40);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //put in vertical connector to the weight on right side bar
  const connectorX2 = ((rightSideBarRightBottomX - rightSideBarLeftBottomX - 80) / (1 - 0.01)) * (Number(localStorage.getItem('valueSlope')) - 0.01) + (rightSideBarLeftBottomX + 40);
  //draws weight connector to the left balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX2, rightSideBarLeftBottomY);
  ctx.lineTo(connectorX2, rightSideBarLeftBottomY + 40);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //put in weight on the left side bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX - 40, leftSideBarRightBottomY + 40);
  ctx.lineTo(connectorX + 40, leftSideBarRightBottomY + 40);
  ctx.lineTo(connectorX + 40, leftSideBarRightBottomY + 120);
  ctx.lineTo(connectorX - 40, leftSideBarRightBottomY + 120);
  ctx.lineTo(connectorX - 40, leftSideBarRightBottomY + 40);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //put in weight on the right side bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX2 - 40, rightSideBarRightBottomY + 40);
  ctx.lineTo(connectorX2 + 40, rightSideBarRightBottomY + 40);
  ctx.lineTo(connectorX2 + 40, rightSideBarRightBottomY + 120);
  ctx.lineTo(connectorX2 - 40, rightSideBarRightBottomY + 120);
  ctx.lineTo(connectorX2 - 40, rightSideBarRightBottomY + 40);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //puts weight text in the supply weight
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  let textSupply = "SUPPLY = ";
  //ctx.strokeText(textSupply, connectorX - 20, leftSideBarRightBottomY + 65);
  ctx.fillText(textSupply, connectorX - 30, leftSideBarRightBottomY + 65);
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  textSupply = localStorage.getItem('valueSupply');
  //ctx.strokeText(textSupply, connectorX - 10, leftSideBarRightBottomY + 85);
  ctx.fillText(textSupply, connectorX - 13, leftSideBarRightBottomY + 85);
  
  //draws a vertical arrow in the supply weight
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX, leftSideBarRightBottomY + 95);
  ctx.lineTo(connectorX, leftSideBarRightBottomY + 115);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //draws an arrowhead on the supply weight arrow
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX, leftSideBarRightBottomY + 115);
  ctx.lineTo(connectorX + 5, leftSideBarRightBottomY + 105);
  ctx.lineTo(connectorX - 5, leftSideBarRightBottomY + 105);
  ctx.lineTo(connectorX, leftSideBarRightBottomY + 115);
  ctx.fill();
  
  //puts weight text in the flow weight
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  let textFlow = "FLOW = ";
  //ctx.strokeText(textFlow, connectorX2 - 20, rightSideBarRightBottomY + 65);
  //ctx.fillText(textFlow, connectorX2 - 25, rightSideBarRightBottomY + 65);
  ctx.fillText(textFlow, connectorX2 - 25, rightSideBarRightBottomY + 54);
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  textFlow = localStorage.getItem('valueFlow');
  //ctx.strokeText(textFlow, connectorX2 - 10, rightSideBarRightBottomY + 85);
  //ctx.fillText(textFlow, connectorX2 - 13, rightSideBarRightBottomY + 85);
  ctx.fillText(textFlow, connectorX2 - 13, rightSideBarRightBottomY + 67);
  //add Manning's N text in the flow weight
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  let textFlow2 = "n = ";
  ctx.fillText(textFlow2, connectorX2 - 10, rightSideBarRightBottomY + 82);
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  textFlow2 = localStorage.getItem('valueManning');
  ctx.fillText(textFlow2, connectorX2 - 16, rightSideBarRightBottomY + 96);
  
  //draws a vertical arrow in the flow weight
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  //ctx.moveTo(connectorX2, rightSideBarRightBottomY + 95);
  ctx.moveTo(connectorX2, rightSideBarRightBottomY + 100);
  ctx.lineTo(connectorX2, rightSideBarRightBottomY + 115);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //draws an arrowhead on the flow weight arrow
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX2, rightSideBarRightBottomY + 115);
  ctx.lineTo(connectorX2 + 5, rightSideBarRightBottomY + 105);
  ctx.lineTo(connectorX2 - 5, rightSideBarRightBottomY + 105);
  ctx.lineTo(connectorX2, rightSideBarRightBottomY + 115);
  ctx.fill();
  
  //draws a line for the scale pointer
  ctx.strokeStyle = "rgb(125, 125, 125)";
  ctx.beginPath();
  ctx.moveTo(centerScaleX, centerScaleY);
  const pointerLength = 164
  const pointerX = pointerLength * Math.sin(degToRad(scaleBarAngle)) + centerScaleX;
  const pointerY = pointerLength * Math.cos(degToRad(scaleBarAngle)) + centerScaleY;
  ctx.lineTo(pointerX, pointerY);
  ctx.lineWidth = 5;
  ctx.stroke();
  
  //draw an arrowhead for the scale pointer
  //point 1 for the arrow head is the end of the pointer, pointerX and pointerY
  //Use an equilateral triangle with the 1st point as the pointer end and the other two points
  //perpendicular to a point 20 pixels closer to the pointer start point.
  //first get the coordinates for the two points perpendicular to the pointer.
  const arrowPointX1 = pointerX;
  const arrowPointY1 = pointerY;
  //use an arrow that is an equilateral triangle 20 points per side
  //get the point on the pointer that is 20 points from the end, closer to the start
  const arrowPointX0 = (pointerLength - 16) * Math.sin(degToRad(scaleBarAngle)) + centerScaleX;
  const arrowPointY0 = (pointerLength - 16) * Math.cos(degToRad(scaleBarAngle)) + centerScaleY;
  //get point 2 that is counter clockwise of point 0
  const arrowPointX2 = arrowPointX0 + Math.cos(degToRad(scaleBarAngle))*8;
  const arrowPointY2 = arrowPointY0 - Math.sin(degToRad(scaleBarAngle))*8;
  //get point 3 that is clockwise of point 0
  const arrowPointX3 = arrowPointX0 - Math.cos(degToRad(scaleBarAngle))*8;
  const arrowPointY3 = arrowPointY0 + Math.sin(degToRad(scaleBarAngle))*8;
  //Create arrowhead with the 3 points
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(arrowPointX1, arrowPointY1);
  ctx.lineTo(arrowPointX2, arrowPointY2);
  ctx.lineTo(arrowPointX3, arrowPointY3);
  ctx.lineTo(arrowPointX1, arrowPointY1);
  //ctx.stroke();
  ctx.fill();
  
  //Add text below the base
  //Supply (Aggradation) vs. Transport (Degradation) - localStorage.setItem('calcBalancePercent','45.0')
  const baseScaleBottomY = Number(localStorage.getItem('graphBaseBottomY'));
  const balancePercent = localStorage.getItem('calcBalancePercent');
  //20241125:  Change the Base text from "Supply (Aggradation) vs. Transport (Degradation)"; to "Transport (Degradation) vs. Supply (Aggradation)";
  //let belowBaseText = "Supply (Aggradation) vs. Transport (Degradation)";
  let belowBaseText = "Transport (Degradation) vs. Supply (Aggradation)";
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "white";
  ctx.font = "14px arial";
  ctx.fillText(belowBaseText, centerScaleX - 150, baseScaleBottomY + 30);
  belowBaseText = balancePercent + "%";
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "white";
  ctx.font = "14px arial";
  ctx.fillText(belowBaseText, centerScaleX - 20, baseScaleBottomY + 60);
  
  //add text above the scale
  let aboveScaleText = "Lane's Dynamic Equilibrium Balance Scale";
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "white";
  ctx.font = "14px arial";
  ctx.fillText(aboveScaleText, centerScaleX - 145, 20);
  aboveScaleText = "Sediment Supply (Qs) * Sediment Size (d50) ~ Flow Rate (Q) * Slope (S)";
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "white";
  ctx.font = "14px arial";
  ctx.fillText(aboveScaleText, centerScaleX - 290, 50);
  

}