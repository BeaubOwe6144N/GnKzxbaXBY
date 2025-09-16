// 代码生成时间: 2025-09-16 14:48:49
// Load D3 library
const d3 = require('d3');

// Define the memory usage analysis module
const MemoryUsageAnalysis = (function() {
    let data;

    // Function to initialize data
    function initializeData(memoryData) {
        if (!Array.isArray(memoryData) || !memoryData.every(d => 'process' in d && 'memoryUsage' in d)) {
            throw new Error('Invalid data format');
        }
        data = memoryData;
    }

    // Function to create the chart
    function createChart() {
        if (!data) {
            throw new Error('Data not initialized');
        }

        // Set dimensions and margins
        const margin = {top: 20, right: 30, bottom: 40, left: 90},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // Append the SVG object to the body of the page
        const svg = d3.select('body').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // X axis
        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x));

        // Y axis
        const y = d3.scaleLinear()
            .range([height, 0]);
        svg.append('g')
            .call(d3.axisLeft(y));

        // Define the x and y domains
        x.domain(data.map(d => d.process));
        y.domain([0, d3.max(data, d => d.memoryUsage)]);

        // Append rectangles
        svg.selectAll('myRects')
            .data(data)
            .enter().append('rect')
            .attr('x', d => x(d.process))
            .attr('y', d => y(d.memoryUsage))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.memoryUsage))
            .attr('fill', 'steelblue');

        // Append text labels
        svg.selectAll('myTexts')
            .data(data)
            .enter().append('text')
            .attr('x', d => x(d.process) + x.bandwidth() / 2)
            .attr('y', d => y(d.memoryUsage) - 5)
            .attr('text-anchor', 'middle', 'end')
            .text(d => d.memoryUsage);
    }

    // Public API
    return {
        initializeData: initializeData,
        createChart: createChart
    };
})();

// Example usage:
try {
    // Provide sample data
    const sampleData = [
        { process: 'Process1', memoryUsage: 150 },
        { process: 'Process2', memoryUsage: 300 },
        { process: 'Process3', memoryUsage: 200 }
    ];

    // Initialize data
    MemoryUsageAnalysis.initializeData(sampleData);

    // Create chart
    MemoryUsageAnalysis.createChart();
} catch (error) {
    console.error(error.message);
}