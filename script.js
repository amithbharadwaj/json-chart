const margin = 80;
const width = 700 - 2 * margin;
const height = 600 - 2 * margin;

var entries=null;

function process() {
	$.get( "https://api.thingspeak.com/channels/456757/feeds.json?api_key=E65ADORJN3PVGCAQ&results=10",function(data){
	    update(data.feeds);
	});
}

function update(inputObj) {
              console.log(inputObj);
	
	var svg = d3.select('svg');

	var svgChilds = document.getElementById("svg");
	while (svgChilds.hasChildNodes()) {
      svgChilds.removeChild(svgChilds.firstChild);
    }

	const chart = svg.append('g')
		.attr('transform', 'translate(' + margin + ',' + margin + ')');
	
	//x axis
	const xScale = d3.scaleBand()
	  .range([0, width])
	  .domain(inputObj.map((s) => s.entry_id))
	  .padding(0.2)
    
	chart.append('g')
	  .attr('transform', 'translate(0, ' + height + ')')
	  .call(d3.axisBottom(xScale));

	// y axis
	const yScale = d3.scaleLinear()
	  .range([height, 0])
	  .domain([0, d3.max(inputObj,function(d,i){return d.field1})]);
	  
	chart.append('g')
	  .call(d3.axisLeft(yScale));
	  
	//grid
	chart.append('g')
	  .attr('class', 'grid')
	  .call(d3.axisLeft(yScale)
		.tickSize(-width, 0, 0)
		.tickFormat('')
	  )
	  
	  const trans = chart.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	//transistion 
	trans
	     
		.append('rect')
		.attr('class', 'bar')
		.attr('height',0)
		.attr('y',height)
		.transition().duration(3000)
		.delay(function(d,i){return i*200;})
	    .attr('x', (g) => xScale(g.entry_id))
		 
		.attr('y', (g) => yScale(g.field1))
			
		.attr('height', (g) => height - yScale(g.field1))
		.attr('width', xScale.bandwidth())
	
        .style('fill',function(d,i){return 'rgb('+((i*30)+255)+',255,224)'});
	   
	// bar chart
	const barGroups = chart.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	barGroups
	     
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (g) => xScale(g.entry_id))
		 
		.attr('y', (g) => yScale(g.field1))
			
		.attr('height', (g) => height - yScale(g.field1))
		.attr('width', xScale.bandwidth())
	
        .style('fill',function(d,i){return 'rgb('+((i*30)+10)+',150,'+((i*30)+180)+')'})
		.on("mouseover",function(){
			tooltip.style("display",null);
		})
			
		.on("mouseout",function(){
			tooltip.style("display","none")
		})
		.on("mousemove",function(d){
			var xPos=d3.mouse(this)[0]+40;
			var yPos=d3.mouse(this)[1]+40;
			tooltip.attr("transform","translate("+ xPos+","+yPos+")");
			tooltip.select("text").text("ID:"+d.entry_id+" "+"INCHES:"+d.field1)
		}) ;
		 
	var tooltip=svg.append("g")
		  .attr("class",tooltip)
		  .style("display","none");
	tooltip.append("text")
		.attr("x",15)
		.attr("dy","1.2em")
		.style("font-size","1em");

	svg.append('text')
	  .attr('class', 'title')
	  .attr('x', width / 2 + margin)
	  .attr('y', 50)
	  .attr('text-anchor', 'middle')
	  .text('Field 1');
	  
	svg.append('text')
	  .attr('class', 'source')
	  .attr('x', width - margin)
	  .attr('y', height + margin * 1.5)
	  .attr('text-anchor', 'start')
	  .text('ENTRY_ID');
	  
	  svg.append('text')
	  .attr('class','source')
	  .attr('x',margin-72)
	  .attr('y', 300)
	  .attr('text-anchor', 'start')
	  .text('INCHES');
	  
	 
	  
	  const come = chart.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	come
	.append('text')
	.text(function(d){return d.field1;})
	.attr('x',function(d){return (xScale(d.entry_id));})
	.attr('y',function(d){return yScale(d.field1)+12;})
	.style('text-anchor','auto')
	.style('fill','purple');


}
function process1() {
	$.get( "https://api.thingspeak.com/channels/456757/feeds.json?api_key=E65ADORJN3PVGCAQ&results=10", function( data ) {
	    update1(data.feeds);
	});
}
function update1(inputObj) {
              console.log(inputObj);
	
	var svg1 = d3.select('#svg1');

	var svgChilds1 = document.getElementById("svg1");
	while (svgChilds1.hasChildNodes()) {
      svgChilds1.removeChild(svgChilds1.firstChild);
    }

	const chart1 = svg1.append('g')
		.attr('transform', 'translate(' + margin + ',' + margin + ')');
	//x axis
	const xScale1 = d3.scaleBand()
	  .range([0, width])
	  .domain(inputObj.map((s) => s.entry_id))
	  .padding(0.2)
    
	chart1.append('g')
	  .attr('transform', 'translate(0, ' + height + ')')
	  .call(d3.axisBottom(xScale1));

	// y axis
	const yScale1 = d3.scaleLinear()
	  .range([height, 0])
	  .domain([0, d3.max(inputObj,function(d,i){return d.field2})]);
	  
	chart1.append('g')
	  .call(d3.axisLeft(yScale1));
	  
	//grid
	chart1.append('g')
	  .attr('class', 'grid')
	  .call(d3.axisLeft(yScale1)
		.tickSize(-width, 0, 0)
		.tickFormat('')
	  )
	  
	  const trans1 = chart1.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	//transistion 
	trans1
	     
		.append('rect')
		.attr('class', 'bar')
		.attr('height',0)
		.attr('y',height)
		.transition().duration(3000)
		.delay(function(d,i){return i*200;})
	    .attr('x', (g) => xScale1(g.entry_id))
		 
		.attr('y', (g) => yScale1(g.field2))
			
		.attr('height', (g) => height - yScale1(g.field2))
		.attr('width', xScale1.bandwidth())
	
        .style('fill',function(d,i){return 'rgb('+((i*30)+255)+',255,224)'});
	   
	// bar chart
	const barGroups1 = chart1.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	barGroups1
	     
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (g) => xScale1(g.entry_id))
		 
		.attr('y', (g) => yScale1(g.field2))
			
		.attr('height', (g) => height - yScale1(g.field2))
		.attr('width', xScale1.bandwidth())
	
        .style('fill',function(d,i){return 'rgb('+((i*30)+10)+',150,'+((i*30)+180)+')'})
		.on("mouseover",function(){
			tooltip1.style("display",null);
		})
			
		.on("mouseout",function(){
			tooltip1.style("display","none")
		})
		.on("mousemove",function(d){
			var xPos1=d3.mouse(this)[0]+40;
			var yPos1=d3.mouse(this)[1]+40;
			tooltip1.attr("transform","translate("+ xPos1+","+yPos1+")");
			tooltip1.select("text").text("ID:"+d.entry_id+" "+"INCHES:"+d.field2)
		}) ;
		 
	var tooltip1=svg1.append("g")
		  .attr("class",tooltip1)
		  .style("display","none");
	tooltip1.append("text")
		.attr("x",15)
		.attr("dy","1.2em")
		.style("font-size","1em");

	svg1.append('text')
	  .attr('class', 'title')
	  .attr('x', width / 2 + margin)
	  .attr('y', 50)
	  .attr('text-anchor', 'middle')
	  .text('Field 2');
	  
	svg1.append('text')
	  .attr('class', 'source')
	  .attr('x', width - margin)
	  .attr('y', height + margin * 1.5)
	  .attr('text-anchor', 'start')
	  .text('ENTRY_ID');
	  
	  svg1.append('text')
	  .attr('class','source')
	  .attr('x',margin-72)
	  .attr('y', 300)
	  .attr('text-anchor', 'start')
	  .text('INCHES');
	  
	  const come1 = chart1.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	come1
	.append('text')
	.text(function(d){return d.field2;})
	.attr('x',function(d){return (xScale1(d.entry_id));})
	.attr('y',function(d){return yScale1(d.field2)+12;})
	.style('text-anchor','auto')
	.style('fill','red');


}
function process2() {
	$.get( "https://api.thingspeak.com/channels/456757/feeds.json?api_key=E65ADORJN3PVGCAQ&results=5", function( data ) {
	    update2(data.feeds);
	});
}
function update2(inputObj) {
              console.log(inputObj);
	
	var svg2 = d3.select('#svg2');

	var svgChilds2 = document.getElementById("svg2");
	while (svgChilds2.hasChildNodes()) {
      svgChilds2.removeChild(svgChilds2.firstChild);
    }

	const chart2 = svg2.append('g')
		.attr('transform', 'translate(' + margin + ',' + margin + ')');
	
	//x axis
	const xScale2 = d3.scaleBand()
	  .range([0, width])
	  .domain(inputObj.map((s) => s.entry_id))
	  .padding(0.2)
    
	chart2.append('g')
	  .attr('transform', 'translate(0, ' + height + ')')
	  .call(d3.axisBottom(xScale2));

	// y axis
	const yScale2 = d3.scaleLinear()
	  .range([height, 0])
	  .domain([0, d3.max(inputObj,function(d,i){return d.field3})])
	  
	chart2.append('g')
	  .call(d3.axisLeft(yScale2));
	  
	//grid
	chart2.append('g')
	  .attr('class', 'grid')
	  .call(d3.axisLeft(yScale2)
		.tickSize(-width, 0, 0)
		.tickFormat('')
	  )
	  
	  const trans2 = chart2.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	//transistion 
	trans2
	     
		.append('rect')
		.attr('class', 'bar')
		.attr('height',0)
		.attr('y',height)
		.transition().duration(3000)
		.delay(function(d,i){return i*200;})
	    .attr('x', (g) => xScale2(g.entry_id))
		 
		.attr('y', (g) => yScale2(g.field3))
			
		.attr('height', (g) => height - yScale2(g.field3))
		.attr('width', xScale2.bandwidth())
	
        .style('fill',function(d,i){return 'rgb('+((i*30)+255)+',255,224)'});
	   
	// bar chart
	const barGroups2 = chart2.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	barGroups2
	     
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (g) => xScale2(g.entry_id))
		 
		.attr('y', (g) => yScale2(g.field3))
			
		.attr('height', (g) => height - yScale2(g.field3))
		.attr('width', xScale2.bandwidth())
	
        .style('fill',function(d,i){return 'rgb('+((i*30)+10)+',150,'+((i*30)+180)+')'})
		.on("mouseover",function(){
			tooltip2.style("display",null);
		})
			
		.on("mouseout",function(){
			tooltip2.style("display","none")
		})
		.on("mousemove",function(d){
			var xPos2=d3.mouse(this)[0]+40;
			var yPos2=d3.mouse(this)[1]+40;
			tooltip2.attr("transform","translate("+ xPos2+","+yPos2+")");
			tooltip2.select("text").text("ID:"+d.entry_id+" "+"INCHES:"+d.field3)
		}) ;
		 
	var tooltip2=svg2.append("g")
		  .attr("class",tooltip2)
		  .style("display","none");
	tooltip2.append("text")
		.attr("x",15)
		.attr("dy","1.2em")
		.style("font-size","1em");

	svg2.append('text')
	  .attr('class', 'title')
	  .attr('x', width / 2 + margin)
	  .attr('y', 60)
	  .attr('text-anchor', 'middle')
	  .text('Field3');
	  
	svg2.append('text')
	  .attr('class', 'source')
	  .attr('x', width - margin)
	  .attr('y', height + margin * 1.5)
	  .attr('text-anchor', 'start')
	  .text('ENTRY_ID');
	  
	  svg2.append('text')
	  .attr('class','source')
	  .attr('x',margin-72)
	  .attr('y', 300)
	  .attr('text-anchor', 'start')
	  .text('INCHES');
	  
	  const come2 = chart2.selectAll()
	  .data(inputObj)
	  .enter()
	  .append('g')
	  
	come2
	.append('text')
	.text(function(d){return d.field3;})
	.attr('x',function(d){return (xScale2(d.entry_id));})
	.attr('y',function(d){return yScale2(d.field3)+12;})
	.style('text-anchor','auto')
	.style('fill','brown');


}
function plot() {
	$.get( "https://api.thingspeak.com/channels/456757/feeds.json?api_key=E65ADORJN3PVGCAQ&results=15", function( data ) {
	    up(data.feeds);
	});
}
function up(inputObj) {
              console.log(inputObj);
			  
var data = [
  {
    type: "indicator",
    value: 100,
    delta: { reference: 160 },
    gauge: { axis: { visible: false, range: [0, 250] } },
    domain: { row: 0, column: 0 }
  },
  {
    type: "indicator",
    value: 120,
    gauge: {
      shape: "bullet",
      axis: {
        visible: false,
        range: [-200, 200]
      }
    },
    domain: { x: [0.1, 0.5], y: [0.15, 0.35] }
  },
  {
    type: "indicator",
    mode: "number+delta",
    value: 300,
    domain: { row: 0, column: 1 }
  },
  { type: "indicator", mode: "delta", value: 40, domain: { row: 1, column: 1 } }
];

var layout = {
  width: 950,
  height: 600,
  margin: { t: 25, b: 25, l: 25, r: 25 },
  grid: { rows: 2, columns: 2, pattern: "independent" },
  template: {
    data: {
      indicator: [
        {
          title: { text: "gauze" },
          mode: "number+delta+gauge",
          delta: { reference: 90 }
        }
      ]
    }
  }
};

Plotly.newPlot('myDiv', data, layout);
}
 
plot();
process();
process1();
process2();



