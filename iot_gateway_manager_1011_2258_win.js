// 代码生成时间: 2025-10-11 22:58:49
// Load necessary libraries
const d3 = require('d3');

// Define the IoT Gateway Manager class
class IoTGatewayManager {
  constructor() {
    this.gateways = []; // Stores the list of gateways
  }

  /**
   * Load gateways data from a JSON file
   * @param {string} url - The URL of the JSON file
   */
  loadGateways(url) {
    d3.json(url).then(data => {
      this.gateways = data;
      this.renderGateways();
    }).catch(error => {
      console.error('Failed to load gateways:', error);
    });
  }

  /**
   * Render the gateways data using D3.js
   */
  renderGateways() {
    if (!this.gateways.length) {
      console.warn('No gateways data to render');
      return;
    }

    // Select the container element for the gateways
    const container = d3.select('#gateways-container');

    // Bind the gateways data to the container
    const gateways = container.selectAll('.gateway')
      .data(this.gateways, d => d.id);

    // Enter selection: Create new elements for new data
    gateways.enter().append('div')
      .attr('class', 'gateway')
      .text(d => `Gateway ID: ${d.id}, Name: ${d.name}`);

    // Update selection: Update existing elements with new data
    gateways.text(d => `Gateway ID: ${d.id}, Name: ${d.name}`);

    // Exit selection: Remove elements for data that is no longer present
    gateways.exit().remove();
  }
}

// Create an instance of the IoT Gateway Manager
const manager = new IoTGatewayManager();

// Load the gateways data from a JSON file
manager.loadGateways('gateways.json');
