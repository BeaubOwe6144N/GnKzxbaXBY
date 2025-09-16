// 代码生成时间: 2025-09-16 20:06:25
 * displaying data points on a scatter plot and computing statistics like mean, median, and mode.
 */

// Importing necessary D3 modules
const { select, create, selectAll, scaleLinear, scaleLog, axisLeft, axisBottom, max, min } = d3;

// Constants for scaling
const MARGIN = { top: 20, right: 30, bottom: 40, left: 60 };
const WIDTH = 800 - MARGIN.left - MARGIN.right;
const HEIGHT = 600 - MARGIN.top - MARGIN.bottom;

// Create SVG container
const svg = create('svg')
  .attr('width', WIDTH + MARGIN.left + MARGIN.right)
  .attr('height', HEIGHT + MARGIN.top + MARGIN.bottom)
  .attr('class', 'chart');

// Append the SVG object to the body of the page
select('body')
  .node()
  .appendChild(svg.node());

// Append the X axis
const x = scaleLinear()
  .domain([0, 100])
  .range([0, WIDTH]);

const xAxis = axisBottom(x);
svg.append('g')
  .attr('transform', `translate(0,${HEIGHT})`)
  .call(xAxis);

// Append the Y axis
const y = scaleLinear()
  .domain([0, 100])
  .range([HEIGHT, 0]);

const yAxis = axisLeft(y);
svg.append('g')
  .attr('transform', 'translate(0,0)')
  .call(yAxis);

// Function to update the chart with new data
function updateChart(data) {
  // Error handling: if data is not an array
  if (!Array.isArray(data)) {
    console.error('Data must be an array');
    return;
  }

  // Compute statistics
  const stats = computeStatistics(data);
  console.log(stats); // Output the statistics to the console

  // Create circles for each data point
  const circles = svg.selectAll('circle').data(data);

  // Enter new data points
  circles.enter()
    .append('circle')
    .attr('r', 5)
    .attr('fill', 'steelblue')
    .merge(circles)
    .attr('cx', (d, i) => x(d))
    .attr('cy', (d, i) => y(i))
    .on('mouseover', (event, d) => {
      // Handle mouseover event
      console.log(`Data point: ${d}`);
    });

  // Exit old data points
  circles.exit().remove();
}

// Function to compute basic statistics (mean, median, and mode)
function computeStatistics(data) {
  let mean = 0, median, mode;
  let dataset = data.slice();
  let count = {};

  // Calculating mean
  mean = dataset.reduce((accumulator, current) => accumulator + current) / dataset.length;

  // Calculating median
  dataset.sort(d3.ascending);
  median = dataset.length % 2 !== 0 ? dataset[(dataset.length - 1) / 2] : (dataset[dataset.length / 2] + dataset[dataset.length / 2 + 1]) / 2;

  // Calculating mode
  dataset.forEach((number) => {
    count[number] = (count[number] || 0) + 1;
  });
  let maxCount = 0;
  for (let number in count) {
    if (count[number] > maxCount) {
      mode = number;
      maxCount = count[number];
    }
  }

  return { mean, median, mode };
}

// Example usage
const sampleData = [25, 30, 45, 10, 15, 20, 50];
updateChart(sampleData);