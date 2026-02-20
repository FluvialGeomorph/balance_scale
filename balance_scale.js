class BalanceScale {
    constructor(context_object,width_canvas) {
            this.ctx = context_object;
            this.width = width_canvas;
            this.base_width_ratio=0.5;
            this.base_thickness_ratio=0.03;
            this.balance_width_center_ratio=0.48;
            this.balance_width_side_ratio=0.24;
            this.balance_thickness_ratio=0.05;
            this.fulcrum_dist_top_ratio=0.07;
            this.fulcrum_radius_ratio=0.0087;
            this.speedometer_buffer_ratio=0.043;
            this.speedometer_buffer_vertical_ratio=0.05797;
            this.speedometer_font_size_ratio=0.01159;
            this.balance_side_bar_font_size_ratio=0.01449;
            this.weight_font_size_ratio=0.01739;
            this.balance_weight_width_height_ratio=0.11594;
            this.pointer_arrowhead_ratio=0.02318;
            this.above_below_font_size_ratio=0.02028;
            this.percent_balance_font_size_ratio=0.02608;
            this.weight_connector_length_ratio=0.05797;
            this.spacing_buffer_ratio=0.00724;
            this.arrow_line_thickness_sides_ratio=0.00289;
            this.speedometer_text_offset_vertical_ratio=0.00289;
            this.color_canvas = "rgb(0, 0, 0)";
            this.color_speedometer_tics_arc_lines = "rgb(0, 0, 0)";
            this.color_pointer_arrowhead = "rgb(0, 0, 0)";
            this.color_fulcrum = "rgb(0, 0, 0)";
            this.color_speedometer_base = "rgb(210, 210, 210)";
            this.color_pointer = "rgb(125, 125, 125)";
            this.color_balance_scale_bar = "rgb(255, 255, 255)";
            this.color_base = "rgb(0, 112, 172)";
            this.color_text_header_footer = "white";
            this.color_text_scale_bar = "white";
            this.color_text_speedometer = "black";
            this.base_width = null;
            this.base_vert_height = null;
            this.base_thickness = null;
            this.balance_width_center = null;
            this.balance_width_side = null;
            this.balance_thickness = null;
            this.fulcrum_dist_top = null;
            this.pointer_length = null;
            this.balance_center = null;
            this.balance_required_height = null;
            this.base_bottom_y = null;
            this.base_left_x = null;
            this.base_right_x = null;
            this.base_top = null;
            this.fulcrum_center_y = null;
            this.fulcrum_radius = null;
            this.speedometer_buffer = null;
            this.speedometer_buffer_vertical = null;
            this.speedometer_font_size = null;
            this.balance_side_bar_font_size = null;
            this.weight_font_size = null;
            this.balance_weight_width_height = null;
            this.pointer_arrowhead = null;
            this.above_below_font_size = null;
            this.percent_balance_font_size = null;
            this.weight_connector_length = null;
            this.spacing_buffer = null;
            this.arrow_line_thickness_sides = null;
            this.speedometer_text_offset_vertical = null;
            this.angle_scale_bar = null; //The middle rotates based on this angle, which is normally obtained from local storage.
            this.balance_percent = null;
            this.slope = null;
            this.flow = null;
            this.mannings = null;
            this.supply = null;
            this.size = null;
            this.scale_points = null;
            this.slope_range = null;
            this.sed_size_range = null;
            this.height_text_right = null;
            this.height_text_left = null;
    }
    calc_geometry(context_object,width_canvas) {
        this.ctx = context_object;
        this.width = width_canvas;
        this.base_width = Math.round(this.base_width_ratio * this.width); //width of bottom part of the Inverted "T" base.
        this.base_vert_height = this.base_width; //1.  vert part of the Inverted "T" base.
        this.base_thickness = Math.round(this.base_thickness_ratio * this.width); //2.  thickness for both the horizontal and vertical parts of the base.
        this.balance_width_center = Math.round(this.balance_width_center_ratio * this.width); //3.  width of the center part of the Balance Scale Bar
        this.balance_width_side = Math.round(this.balance_width_side_ratio * this.width);  //4.  width of each side part of the Balance Scale Bar
        this.balance_thickness = Math.round(this.balance_thickness_ratio * this.width); //5.  Thickness of each side part of the Balance Scale Bar
        this.fulcrum_dist_top = Math.round(this.fulcrum_dist_top_ratio * this.width);  //6.  Vertical distance down from the top of the base to the fulcrum.
        this.pointer_length = this.balance_width_side; //7.  The balance scale pointer
        this.balance_center = Math.round(this.width * 0.5);  //8.  The vertical and horizontal center of the canvas
        this.balance_required_height = Math.round(this.base_vert_height + this.base_thickness + 
            this.balance_width_center/2 + this.balance_thickness/2 - this.fulcrum_dist_top);
        this.base_bottom_y = Math.round(this.balance_center + this.balance_required_height/2);
        this.base_left_x = Math.round(this.balance_center - this.base_width/2);
        this.base_right_x = Math.round(this.balance_center + this.base_width/2);
        this.base_top = this.base_bottom_y - this.base_vert_height - this.base_thickness;
        this.fulcrum_center_y = this.base_top + this.fulcrum_dist_top;
        this.fulcrum_radius = Math.ceil(this.width * this.fulcrum_radius_ratio);
        this.speedometer_buffer = Math.ceil(this.width * this.speedometer_buffer_ratio);
        this.speedometer_buffer_vertical = Math.ceil(this.width * this.speedometer_buffer_vertical_ratio);
        this.speedometer_font_size = Math.ceil(this.width * this.speedometer_font_size_ratio);
        this.balance_side_bar_font_size = Math.ceil(this.width * this.balance_side_bar_font_size_ratio);
        this.weight_font_size = Math.ceil(this.width * this.weight_font_size_ratio);
        this.balance_weight_width_height = Math.ceil(this.width *this.balance_weight_width_height_ratio);
        this.pointer_arrowhead = Math.ceil(this.width * this.pointer_arrowhead_ratio);
        this.above_below_font_size = Math.ceil(this.width * this.above_below_font_size_ratio);
        this.percent_balance_font_size = Math.ceil(this.width * this.percent_balance_font_size_ratio);
        this.weight_connector_length = Math.ceil(this.width * this.weight_connector_length_ratio);
        this.spacing_buffer = Math.ceil(this.width * this.spacing_buffer_ratio);
        this.arrow_line_thickness_sides = Math.ceil(this.width * this.arrow_line_thickness_sides_ratio);
        this.speedometer_text_offset_vertical = Math.ceil(this.width * this.speedometer_text_offset_vertical_ratio);
    }
    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    addPoly(coordinates, color_val, clear_array = 1) {
        this.ctx.fillStyle = color_val;
        this.ctx.beginPath();
        this.ctx.moveTo(coordinates[0][0],coordinates[0][1]);
        for (let i = 0; i < coordinates.length; i++) {
            this.ctx.lineTo(coordinates[i][0], coordinates[i][1]);
        }
        this.ctx.fill();
        if (clear_array === 1) {
            coordinates.length = 0;
        }
    }
    addArrowhead(coordinates_tip, length_arrowhead, angle_arrow, color_val) {
        let xy = [[coordinates_tip[0][0],coordinates_tip[0][1]]];
        let xy0 = [[[xy[0][0]]-Math.sin(this.degToRad(angle_arrow))*length_arrowhead, [xy[0][1]]-Math.cos(this.degToRad(angle_arrow))*length_arrowhead]];
        xy.push([xy0[0][0]+Math.cos(this.degToRad(angle_arrow))*length_arrowhead/2.0,xy0[0][1]-Math.sin(this.degToRad(angle_arrow))*length_arrowhead/2.0]);
        xy.push([xy0[0][0]-Math.cos(this.degToRad(angle_arrow))*length_arrowhead/2.0,xy0[0][1]+Math.sin(this.degToRad(angle_arrow))*length_arrowhead/2.0]);
        xy.push([xy[0][0],xy[0][1]]);
        this.addPoly(xy,color_val);
    }
    addLine(coordinates, color_val, line_width, clear_array=1) {
        this.ctx.strokeStyle = color_val;
        this.ctx.beginPath();
        this.ctx.moveTo(coordinates[0][0],coordinates[0][1]);
        for (let i = 0; i < coordinates.length; i++) {
            this.ctx.lineTo(coordinates[i][0], coordinates[i][1]);
        }
        this.ctx.lineWidth = line_width;
        this.ctx.stroke();
        if (clear_array === 1) {
            coordinates.length = 0;
        }
    }
    addText(x,y,text_val,color_val,font_val) {
        this.ctx.fillStyle = color_val;
        this.ctx.font = font_val;
        this.ctx.textAlign = "start";
        this.ctx.fillText(text_val, x, y);
    }
    addTextAlign({x,y,text_val,color_val,font_val,text_align="start",text_baseline="alphabetic"} = {}) {
        this.ctx.fillStyle = color_val;
        this.ctx.font = font_val;
        this.ctx.textAlign = text_align;
        this.ctx.textBaseline = text_baseline;
        this.ctx.fillText(text_val, x, y);
    }
    text_width_height(text_val,font_val,text_align="start",text_baseline="alphabetic") {
        this.ctx.font = font_val;
        this.ctx.textAlign = text_align;
        this.ctx.textBaseline = text_baseline;
        const metrics_text = this.ctx.measureText(text_val);
        const width_text = metrics_text.width;
        const height_text = metrics_text.actualBoundingBoxAscent + metrics_text.actualBoundingBoxDescent;
        return [width_text,height_text,metrics_text.actualBoundingBoxAscent,metrics_text.actualBoundingBoxDescent];
    }
    set_parameters(ang,bal,slp,q,n,qs,d50) {
        this.angle_scale_bar = Number(ang); //The middle rotates based on this angle (= balance_percent * 0.4)
        this.balance_percent = bal;
        this.slope = Number(slp);
        this.flow = q;
        this.mannings = n;
        this.supply = qs;
        this.size = Number(d50);
    }
    getSelectValueRange(selectElement2) {
        //const selectElement = document.getElementById(selectElement2);  //1. Get the Select Element
        const selectElement = document.querySelector(selectElement2);  //This worked, the above statement did not
        const values = Array.from(selectElement.options).map(option => Number(option.value)); //2.  Use Array.from to array convert collections.  Map --> Numbers.
        const minValue = Math.min(...values); //3.  Find Minima 
        const maxValue = Math.max(...values); //4.  Find Maxima
        //return { min: minValue, max: maxValue };  Returns dictionary keyed with min and max
        //console.log(`Min for ${selectElement2}: ${minValue};  Max for ${selectElement2}: ${maxValue}`);
        return [minValue, maxValue]; //Returns array with the 0 element the min and 1 element the max.
    }
    build_base(){
        this.ctx.clearRect(0, 0, this.width, this.width);
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color_canvas;
        this.ctx.fillRect(0, 0, this.width, this.width);
        let xy = [[this.base_left_x,this.base_bottom_y],[this.base_right_x,this.base_bottom_y],[this.base_right_x,this.base_bottom_y-this.base_thickness]];
        xy.push(...[[Math.round(this.balance_center+this.base_thickness/2),xy[2][1]],[Math.round(this.balance_center+this.base_thickness/2),this.base_top]]);
        xy.push(...[[Math.round(this.balance_center-this.base_thickness/2),this.base_top],[Math.round(this.balance_center-this.base_thickness/2),xy[2][1]]]);
        xy.push(...[[xy[0][0],xy[2][1]],[xy[0][0],xy[0][1]]]);
        this.addPoly(xy,this.color_base);
    }
    build_fulcrum(){
        this.ctx.fillStyle = this.color_fulcrum;
        this.ctx.beginPath();
        this.ctx.arc(this.balance_center, this.fulcrum_center_y, this.fulcrum_radius, this.degToRad(0), this.degToRad(360), false);
        this.ctx.fill();
    }
    build_sed_meter(){
        let xy = [[this.pointer_length * Math.sin(this.degToRad(40)) + this.balance_center + this.speedometer_buffer,
            this.pointer_length * Math.cos(this.degToRad(40)) + this.fulcrum_center_y - this.speedometer_buffer],
        [-this.pointer_length * Math.sin(this.degToRad(40)) + this.balance_center - this.speedometer_buffer,
            this.pointer_length * Math.cos(this.degToRad(40)) + this.fulcrum_center_y - this.speedometer_buffer],
        [-this.pointer_length * Math.sin(this.degToRad(40)) + this.balance_center - this.speedometer_buffer,
            this.pointer_length + this.fulcrum_center_y + this.speedometer_buffer_vertical]]
        xy.push(...[[xy[0][0],xy[2][1]],[xy[0][0],xy[0][1]]]);
        this.addPoly(xy,this.color_speedometer_base); //Add speedometer screen
        this.ctx.strokeStyle = this.color_speedometer_tics_arc_lines;
        this.ctx.beginPath();
        this.ctx.arc(this.balance_center, this.fulcrum_center_y, this.pointer_length, this.degToRad(50), this.degToRad(130), false);
        this.ctx.lineWidth = 1;
        this.ctx.stroke(); //sed_meter dial (arc) from -40 to 40 degrees (-100 to 100)
        for (let i = -100; i <= 100; i+=25) {
            xy = [[Math.sin(this.degToRad(i*0.4)) * this.pointer_length + this.balance_center,
                Math.cos(this.degToRad(i*0.4)) * this.pointer_length + this.fulcrum_center_y],
                [Math.sin(this.degToRad(i*0.4)) * (this.pointer_length + this.spacing_buffer) + this.balance_center,
                    Math.cos(this.degToRad(i*0.4)) * (this.pointer_length + this.spacing_buffer) + this.fulcrum_center_y]];
            this.addLine(xy,this.color_speedometer_tics_arc_lines,1); //Add speedometer tics every 25 degrees from -100 to 100.
            this.addTextAlign({x:Math.sin(this.degToRad(i*0.4)) * (this.pointer_length + this.spacing_buffer) + this.balance_center, 
                y: Math.cos(this.degToRad(i*0.4)) * (this.pointer_length + this.spacing_buffer) + this.fulcrum_center_y + 
                this.text_width_height(String(i)+"%",String(this.weight_font_size) + "px arial")[2] + this.speedometer_text_offset_vertical, 
                text_val: String(i)+"%", color_val: this.color_text_speedometer, 
                font_val: String(this.balance_side_bar_font_size) + "px arial", text_align: "center"}); //Add text labels to the Tic Marks.
        }
        let xy1 = [[Math.round(this.balance_center + this.base_thickness / 2),
            this.pointer_length + this.fulcrum_center_y + this.speedometer_buffer_vertical - Math.ceil(this.speedometer_font_size/2)],
            [Math.sin(this.degToRad(100*0.4)) * (this.pointer_length + this.spacing_buffer) + this.balance_center,
            this.pointer_length + this.fulcrum_center_y + this.speedometer_buffer_vertical - Math.ceil(this.speedometer_font_size/2)]];
        this.addLine(xy1,this.color_speedometer_tics_arc_lines,1,2); //Add arrow line for the aggradation side
        this.addArrowhead([[xy1[1][0],xy1[1][1]]],Math.ceil(this.speedometer_font_size/2) * 2,90,this.color_speedometer_tics_arc_lines); //ARROWHEAD AGGRADATION;
        this.addText(xy1[0][0]+this.arrow_line_thickness_sides,xy1[0][1]-2,"AGGRADATION",this.color_text_speedometer, String(this.weight_font_size) + "px arial"); //AGG LAB
        let xy3 = [[Math.round(this.balance_center - this.base_thickness / 2),
            xy1[0][1]],[Math.sin(this.degToRad(-100*0.4)) * (this.pointer_length + this.spacing_buffer) + this.balance_center,xy1[0][1]]];
        this.addLine(xy3,this.color_speedometer_tics_arc_lines,1,2); //Add arrow line for the degradation side
        this.addArrowhead([[xy3[1][0],xy3[1][1]]],Math.ceil(this.speedometer_font_size/2) * 2,-90,this.color_speedometer_tics_arc_lines); //ARROWHEAD DEGRADATION;
        this.addText(xy3[1][0]+Math.ceil(this.speedometer_font_size/2) * 2+this.arrow_line_thickness_sides,xy3[1][1] - 2,
        "DEGRADATION", this.color_text_speedometer, String(this.weight_font_size) + "px arial"); //DEG LAB
        xy1.length = 0;
        xy3.length = 0;
    }
    build_balance_bar() {
        let xy1 = [[(this.balance_width_center / 2.0) * Math.cos(this.degToRad(this.angle_scale_bar)) + this.balance_center,
            -(this.balance_width_center / 2.0) * Math.sin(this.degToRad(this.angle_scale_bar)) + this.fulcrum_center_y],
            [-(this.balance_width_center / 2.0) * Math.cos(this.degToRad(this.angle_scale_bar)) + this.balance_center,
            (this.balance_width_center / 2.0) * Math.sin(this.degToRad(this.angle_scale_bar)) + this.fulcrum_center_y]];
        this.scale_points = xy1;
        this.addLine(xy1, this.color_balance_scale_bar, 2, 2); //Add middle part of balance bar (rotates around the fulcrum at "angle_scale_bar" degrees).
        let xy2 = [[xy1[0][0],xy1[0][1]+this.balance_thickness/2.0],[xy1[0][0]+this.balance_width_side,xy1[0][1]+this.balance_thickness/2.0],
                [xy1[0][0]+this.balance_width_side,xy1[0][1]-this.balance_thickness/2.0],[xy1[0][0],xy1[0][1]-this.balance_thickness/2.0],
                [xy1[0][0],xy1[0][1]+this.balance_thickness/2.0]];
        this.addLine(xy2, this.color_balance_scale_bar, 2, 2); //Add right part of balance bar as a rectangle (connected to the middle but doesn't rotate). 
        let xy3 = [[xy1[1][0],xy1[1][1]+this.balance_thickness/2.0],[xy1[1][0]-this.balance_width_side,xy1[1][1]+this.balance_thickness/2.0],
                [xy1[1][0]-this.balance_width_side,xy1[1][1]-this.balance_thickness/2.0],[xy1[1][0],xy1[1][1]-this.balance_thickness/2.0],
                [xy1[1][0],xy1[1][1]+this.balance_thickness/2.0]];
        this.addLine(xy3, this.color_balance_scale_bar, 2, 2); //Add left part of balance bar as a rectangle (connected to the middle but doesn't rotate).
        let slopeRange = this.getSelectValueRange('#slope'); //Get the slope min and max in an array.
        let sedSizeRange = this.getSelectValueRange('#size'); //Get the sed size min and max in an array.
        this.slope_range = slopeRange;
        this.sed_size_range = sedSizeRange;
        let width_text_right = this.text_width_height("INCREASING SLOPE",String(this.weight_font_size) + "px arial")[0];
        let height_text_right = this.text_width_height("INCREASING SLOPE",String(this.weight_font_size) + "px arial")[1];
        this.height_text_right = height_text_right;
        let xy3b = [[xy1[0][0]+this.spacing_buffer, 
            xy2[0][1] - this.balance_thickness/2.0 + height_text_right/2.0]]
        this.addText(xy3b[0][0],xy3b[0][1],"INCREASING SLOPE",this.color_text_scale_bar,String(this.weight_font_size) + "px arial"); //INCREASING SLOPE TEXT
        let xy4 = [[xy3b[0][0] + width_text_right + this.arrow_line_thickness_sides,
            xy2[0][1] - this.balance_thickness/2.0],[xy2[1][0] - this.spacing_buffer,xy2[0][1] - this.balance_thickness/2.0]];
        this.addLine(xy4,this.color_balance_scale_bar,this.arrow_line_thickness_sides,2); //ADD ARROW FOR INCREASING SLOPE
        this.addArrowhead([[xy4[1][0],xy4[1][1]]],height_text_right,90,this.color_balance_scale_bar); //ADD ARROWHEAD FOR INCREASING SLOPE;
        let xy6 = [[xy2[0][0]+this.balance_weight_width_height/2,xy2[2][1]]];
        xy6.push([xy6[0][0],xy6[0][1]-5]);
        this.addLine(xy6,this.color_balance_scale_bar,2,2); //Add tic mark for the min slope value
        this.addTextAlign({x: xy6[0][0], y: xy6[1][1]-this.spacing_buffer, text_val: String(slopeRange[0]), 
            color_val: this.color_text_scale_bar, font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //Label for the Min Slope Tic Mark
        let xy7 = [[xy2[2][0]-this.balance_weight_width_height/2,xy6[0][1]],[xy2[2][0]-this.balance_weight_width_height/2,xy6[1][1]]];
        this.addLine(xy7,this.color_balance_scale_bar,2,2); //Add tic mark for the max slope value
        this.addTextAlign({x: xy7[0][0], y: xy7[1][1]-this.spacing_buffer, text_val: String(slopeRange[1]), 
            color_val: this.color_text_scale_bar, font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //Label for the Max Slope Tic Mark
        let width_text_left = this.text_width_height("INCREASING SED SIZE",String(this.weight_font_size) + "px arial")[0];
        let height_text_left = this.text_width_height("INCREASING SED SIZE",String(this.weight_font_size) + "px arial")[1];
        this.height_text_left = height_text_left;
        let xy7b = [[xy3[0][0]-width_text_left-this.spacing_buffer, xy3[0][1]-this.balance_thickness/2+height_text_left/2.0]];
        this.addText(xy7b[0][0],xy7b[0][1],"INCREASING SED SIZE",this.color_text_scale_bar,String(this.weight_font_size) + "px arial"); //INCREASING SED SIZE TEXT
        let xy8 = [[xy7b[0][0] - this.arrow_line_thickness_sides,xy7b[0][1]-height_text_left/2.0],[xy3[1][0]+this.spacing_buffer,xy7b[0][1]-height_text_left/2.0]];
        this.addLine(xy8,this.color_balance_scale_bar,this.arrow_line_thickness_sides,2); //ADD ARROW FOR INCREASING SED SIZE
        this.addArrowhead([[xy8[1][0],xy8[1][1]]],height_text_left,-90,this.color_balance_scale_bar); //ADD ARROWHEAD FOR INCREASING SED SIZE;
        let xy10 = [[xy1[1][0]-this.balance_weight_width_height/2,xy3[2][1]]];
        xy10.push([xy10[0][0],xy10[0][1]-5]);
        this.addLine(xy10,this.color_balance_scale_bar,2,2); //Add tic mark for the min sed size value
        this.addTextAlign({x: xy10[0][0], y: xy10[1][1]-this.spacing_buffer, text_val: String(sedSizeRange[0]), 
            color_val: this.color_text_scale_bar, font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //Label for the Min Sed Size Tic Mark
        let xy11 = [[xy3[1][0]+this.balance_weight_width_height/2,xy10[0][1]],[xy3[1][0]+this.balance_weight_width_height/2,xy10[1][1]]];
        this.addLine(xy11,this.color_balance_scale_bar,2,2); //Add tic mark for the max sed size value
        this.addTextAlign({x: xy11[0][0], y: xy11[1][1]-this.spacing_buffer, text_val: String(sedSizeRange[1]), 
            color_val: this.color_text_scale_bar, font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //Label for the Max Sed Size Tic Mark
        xy2.length=0;
        xy3.length=0;
        xy3b.length=0;
        xy4.length=0;
        xy6.length=0;
        xy7.length=0;
        xy7b.length=0;
        xy8.length=0;
        xy10.length=0;
        xy11.length=0;
    }
    build_weights() {
        let connectorX = -((this.balance_width_side - this.balance_weight_width_height) / 
        (this.sed_size_range[1] - this.sed_size_range[0])) * (Number(this.size) - this.sed_size_range[0]) + 
        (this.scale_points[1][0] - this.balance_weight_width_height/2);
        let xy = [[connectorX,this.scale_points[1][1]+this.balance_thickness/2],[connectorX,this.scale_points[1][1]+this.balance_thickness/2 + this.weight_connector_length]];
        this.addLine(xy,this.color_balance_scale_bar,2,2);  //ADD LEFT WEIGHT CONNECTOR
        let connectorX2 = ((this.balance_width_side - this.balance_weight_width_height) / 
        (this.slope_range[1] - this.slope_range[0])) * (Number(this.slope) - this.slope_range[0]) + 
        (this.scale_points[0][0] + this.balance_weight_width_height/2);
        let xy2 = [[connectorX2,this.scale_points[0][1]+this.balance_thickness/2],[connectorX2,this.scale_points[0][1]+this.balance_thickness/2 + this.weight_connector_length]];
        this.addLine(xy2,this.color_balance_scale_bar,2,2);  //ADD RIGHT WEIGHT CONNECTOR
        let xy3 =[[xy[0][0]-this.balance_weight_width_height/2,xy[1][1]],[xy[0][0]-this.balance_weight_width_height/2,xy[1][1]+this.balance_weight_width_height]];
        xy3.push([xy[0][0]+this.balance_weight_width_height/2,xy3[1][1]],[xy[0][0]+this.balance_weight_width_height/2,xy3[0][1]],[xy3[0][0],xy3[0][1]]);
        this.addLine(xy3,this.color_balance_scale_bar,2,2);  //ADD LEFT WEIGHT
        let xy4 =[[xy2[0][0]-this.balance_weight_width_height/2,xy2[1][1]],[xy2[0][0]-this.balance_weight_width_height/2,xy2[1][1]+this.balance_weight_width_height]];
        xy4.push([xy2[0][0]+this.balance_weight_width_height/2,xy4[1][1]],[xy2[0][0]+this.balance_weight_width_height/2,xy4[0][1]],[xy4[0][0],xy4[0][1]]);
        this.addLine(xy4,this.color_balance_scale_bar,2,2);  //ADD RIGHT WEIGHT
        let xy5 = [[connectorX2,this.text_width_height("FLOW =",String(this.weight_font_size) + "px arial")[1] + xy4[0][1] + this.spacing_buffer * 4.0]]
        this.addTextAlign({x: xy5[0][0], y: xy5[0][1],text_val: "FLOW =", color_val: this.color_text_scale_bar, 
            font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //ADD TEXT "FLOW ="
        let xy6 = [[connectorX2,xy5[0][1]+this.text_width_height(String(this.flow),String(this.weight_font_size) + "px arial")[1] + this.spacing_buffer]];
        this.addTextAlign({x: xy6[0][0], y: xy6[0][1], text_val: String(this.flow), color_val: this.color_text_scale_bar, 
            font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //ADD TEXT with flow value.
        let xy9 = [[connectorX2,xy6[0][1] + this.spacing_buffer], [connectorX2,xy4[1][1] - this.spacing_buffer]];
        this.addLine(xy9,this.color_balance_scale_bar,2,2);  //ADD ARROW FOR THE RIGHT WEIGHT
        this.addArrowhead([[connectorX2,xy9[1][1]]],this.height_text_right,0,this.color_balance_scale_bar); //ADD ARROWHEAD FOR THE RIGHT WEIGHT
        let xy10 = [[connectorX,this.text_width_height("SUPPLY =",String(this.weight_font_size) + "px arial")[1]+xy[1][1] + this.spacing_buffer]]
        this.addTextAlign({x: xy10[0][0], y: xy10[0][1], text_val: "SUPPLY =", color_val: this.color_text_scale_bar, 
            font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //ADD TEXT "SUPPLY ="
        let xy11 = [[connectorX,this.text_width_height(String(this.supply),String(this.weight_font_size) + "px arial")[1]+xy10[0][1] + this.spacing_buffer]]
        this.addTextAlign({x: xy11[0][0], y: xy11[0][1], text_val: String(this.supply), color_val: this.color_text_scale_bar, 
            font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //ADD TEXT with supply value.
        let xy7 = [[connectorX,xy11[0][1]+this.text_width_height(String("n="),String(this.weight_font_size) + "px arial")[1] + this.spacing_buffer]];
        this.addTextAlign({x: xy7[0][0], y: xy7[0][1], text_val: 'n =', color_val: this.color_text_scale_bar, 
            font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //ADD TEXT "n ="
        let xy8 = [[connectorX,xy7[0][1]+this.text_width_height(String(this.mannings),String(this.weight_font_size) + "px arial")[1] + this.spacing_buffer]];
        this.addTextAlign({x: xy8[0][0], y: xy8[0][1], text_val: String(this.mannings), color_val: this.color_text_scale_bar, 
            font_val: String(this.weight_font_size) + "px arial", text_align: "center"}); //ADD TEXT with roughness value.
        let xy12 = [[connectorX,xy8[0][1] + this.spacing_buffer], [connectorX,xy3[1][1] - this.spacing_buffer]];
        this.addLine(xy12,this.color_balance_scale_bar,2,2);  //ADD ARROW FOR THE LEFT WEIGHT
        this.addArrowhead([[connectorX,xy12[1][1]]],this.height_text_left,0,this.color_balance_scale_bar); //ADD ARROWHEAD FOR THE LEFT WEIGHT
        xy.length=0;
        xy2.length=0;
        xy3.length=0;
        xy4.length=0;
        xy5.length=0;
        xy6.length=0;
        xy7.length=0;
        xy8.length=0;
        xy9.length=0;
        xy10.length=0;
        xy11.length=0;
        xy12.length=0;
    }
    build_scale_pointer() {
        let xy=[[this.balance_center,this.fulcrum_center_y],
        [this.balance_center + this.pointer_length * Math.sin(this.degToRad(this.angle_scale_bar)),
            this.fulcrum_center_y + this.pointer_length * Math.cos(this.degToRad(this.angle_scale_bar))]];
        this.addLine(xy,this.color_pointer,this.spacing_buffer,2); //ADD THE POINTER ARROW
        this.addArrowhead([[xy[1][0],xy[1][1]]],this.pointer_arrowhead,this.angle_scale_bar,this.color_pointer_arrowhead); //ADD ARROWHEAD FOR THE THE POINTER ARROW
        xy.length=0;
    }
    add_text_below_base() {
        let xy = [[this.balance_center,this.base_bottom_y+this.text_width_height("Sediment Continuity Balance",
            String(this.above_below_font_size) + "px arial")[2]+this.spacing_buffer*3]];
        this.addTextAlign({x: xy[0][0], y: xy[0][1], text_val: "Sediment Continuity Balance", color_val: this.color_text_header_footer,
            font_val: String(this.above_below_font_size) + "px arial", text_align: "center"}); //ADD "Sediment Continuity Balance" TEXT
        let xy1 = [[xy[0][0],xy[0][1]+this.text_width_height("(A Negative Balance Is Degradation and a Positive Balance Is Aggradation)",
            String(this.above_below_font_size) + "px arial")[2]+this.spacing_buffer*2+
            this.text_width_height("Sediment Continuity Balance",String(this.above_below_font_size) + "px arial")[3]]]
        this.addTextAlign({x: xy1[0][0], y: xy1[0][1], text_val: "(A Negative Balance Is Degradation and a Positive Balance Is Aggradation)", 
            color_val: this.color_text_header_footer, font_val: String(this.above_below_font_size) + "px arial", text_align: "center"}); //ADD note TEXT
        let xy3 = [[xy[0][0],xy1[0][1]+this.text_width_height(String(this.balance_percent)+"%",String(this.percent_balance_font_size) + "px arial")[2] + 
            this.spacing_buffer * 2 + this.text_width_height("(A Negative Balance Is Degradation and a Positive Balance Is Aggradation)",
                String(this.above_below_font_size) + "px arial")[3]]];
        this.addTextAlign({x: xy3[0][0], y: xy3[0][1], text_val: String(this.balance_percent)+"%", color_val: this.color_text_header_footer,
            font_val: this.percent_balance_font_size + "px arial", text_align: "center"}); //ADD String(this.balance_percent)+"%" TEXT
        xy.length=0;
        xy1.length=0;
        xy3.length=0;
    }
    add_text_above_base() {
        let xy = [[this.balance_center,this.text_width_height("Lane's Sediment Continuity Balance Scale",
            String(this.above_below_font_size) + "px arial")[2]+this.spacing_buffer*2]];
        this.addTextAlign({x: xy[0][0], y: xy[0][1], text_val: "Lane's Sediment Continuity Balance Scale", color_val: this.color_text_header_footer,
            font_val: String(this.above_below_font_size) + "px arial", text_align: "center"}); //ADD "Lane's Sediment Continuity Balance Scale" TEXT
        let xy1 = [[xy[0][0],xy[0][1] + this.text_width_height("Sediment Supply (Qs) * Sediment Size (d50) * Manning's Coef. (n) ~ Flow Rate (Q) * Slope (S)",
            String(this.above_below_font_size) + "px arial")[2]+this.spacing_buffer*3 + this.text_width_height("Lane's Sediment Continuity Balance Scale",
            String(this.above_below_font_size) + "px arial")[3]]];
        this.addTextAlign({x: xy1[0][0], y: xy1[0][1], text_val: "Sediment Supply (Qs) * Sediment Size (d50) * Manning's Coef. (n) ~ Flow Rate (Q) * Slope (S)", 
            color_val: this.color_text_header_footer, font_val: String(this.above_below_font_size) + "px arial", 
            text_align: "center"}); //ADD "Sediment Supply (Qs) * Sediment Size (d50) * Manning's Coef. (n) ~ Flow Rate (Q) * Slope (S)" TEXT
    }
}