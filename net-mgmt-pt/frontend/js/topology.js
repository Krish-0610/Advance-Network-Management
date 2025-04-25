// Network Topology Visualization

document.addEventListener('DOMContentLoaded', function() {
    // Initialize topology
    initializeTopology();
    
    // Set up event listeners
    setupTopologyControls();
});

// Network topology data - in a real application, this would come from an API
const topologyData = {
    nodes: [
        { id: 1, label: 'Router-Main', type: 'router', status: 'active', 
          info: { ip: '192.168.1.1', mac: '00:0A:95:9D:68:16', location: 'Data Center', uptime: '15 days, 7 hours', 
                 cpu: '34%', memory: '1.2GB / 4GB', firmware: 'v2.3.4' } },
        { id: 2, label: 'Firewall-Edge', type: 'firewall', status: 'active',
          info: { ip: '192.168.1.2', mac: '00:1B:44:11:3A:B7', location: 'Data Center', uptime: '21 days, 3 hours', 
                 cpu: '45%', memory: '2.4GB / 8GB', firmware: 'v3.1.2' } },
        { id: 3, label: 'Switch-Core', type: 'switch', status: 'active',
          info: { ip: '192.168.1.3', mac: '00:1A:2B:3C:4D:5E', location: 'Data Center', uptime: '32 days, 14 hours', 
                 cpu: '22%', memory: '0.7GB / 2GB', firmware: 'v2.5.1' } },
        { id: 4, label: 'Switch-Floor1', type: 'switch', status: 'active',
          info: { ip: '192.168.2.1', mac: '00:2C:4D:6E:8F:10', location: 'Floor 1', uptime: '12 days, 8 hours', 
                 cpu: '18%', memory: '0.5GB / 2GB', firmware: 'v2.5.1' } },
        { id: 5, label: 'Switch-Floor2', type: 'switch', status: 'warning',
          info: { ip: '192.168.3.1', mac: '00:3D:5E:7F:9G:11', location: 'Floor 2', uptime: '8 days, 2 hours', 
                 cpu: '67%', memory: '1.7GB / 2GB', firmware: 'v2.5.1' } },
        { id: 6, label: 'Switch-Floor3', type: 'switch', status: 'critical',
          info: { ip: '192.168.4.1', mac: '00:4E:6F:8G:12:13', location: 'Floor 3', uptime: '0 days, 2 hours', 
                 cpu: '92%', memory: '1.9GB / 2GB', firmware: 'v2.5.1' } },
        { id: 7, label: 'AP-Lobby', type: 'access-point', status: 'active',
          info: { ip: '192.168.2.10', mac: '00:5F:7G:9H:13:14', location: 'Lobby', uptime: '10 days, 9 hours', 
                 cpu: '24%', memory: '0.3GB / 0.5GB', firmware: 'v1.9.4' } },
        { id: 8, label: 'AP-Conference', type: 'access-point', status: 'active',
          info: { ip: '192.168.3.10', mac: '00:6G:8H:10I:15:16', location: 'Conference Room', uptime: '5 days, 16 hours', 
                 cpu: '31%', memory: '0.2GB / 0.5GB', firmware: 'v1.9.4' } },
        { id: 9, label: 'Server-Web', type: 'server', status: 'active',
          info: { ip: '192.168.1.100', mac: '00:7H:9I:11J:17:18', location: 'Data Center', uptime: '45 days, 12 hours', 
                 cpu: '56%', memory: '16GB / 64GB', firmware: 'OS v4.2.1' } },
        { id: 10, label: 'Server-DB', type: 'server', status: 'active',
          info: { ip: '192.168.1.101', mac: '00:8I:10J:12K:19:20', location: 'Data Center', uptime: '45 days, 12 hours', 
                 cpu: '72%', memory: '48GB / 128GB', firmware: 'OS v4.2.1' } },
        { id: 11, label: 'Client-Reception', type: 'client', status: 'active',
          info: { ip: '192.168.2.101', mac: '00:9J:11K:13L:21:22', location: 'Reception', uptime: '2 days, 5 hours', 
                 cpu: '23%', memory: '4GB / 16GB', firmware: 'OS v10' } },
        { id: 12, label: 'Client-Admin', type: 'client', status: 'active',
          info: { ip: '192.168.2.102', mac: '00:10K:12L:14M:23:24', location: 'Admin Office', uptime: '1 days, 7 hours', 
                 cpu: '35%', memory: '6GB / 16GB', firmware: 'OS v10' } }
    ],
    edges: [
        { from: 1, to: 2, type: 'ethernet', bandwidth: '1 Gbps', utilization: '42%' },
        { from: 2, to: 3, type: 'ethernet', bandwidth: '10 Gbps', utilization: '38%' },
        { from: 3, to: 4, type: 'fiber', bandwidth: '10 Gbps', utilization: '25%' },
        { from: 3, to: 5, type: 'fiber', bandwidth: '10 Gbps', utilization: '67%' },
        { from: 3, to: 6, type: 'fiber', bandwidth: '10 Gbps', utilization: '58%' },
        { from: 3, to: 9, type: 'ethernet', bandwidth: '10 Gbps', utilization: '72%' },
        { from: 3, to: 10, type: 'ethernet', bandwidth: '10 Gbps', utilization: '65%' },
        { from: 4, to: 7, type: 'ethernet', bandwidth: '1 Gbps', utilization: '18%' },
        { from: 5, to: 8, type: 'ethernet', bandwidth: '1 Gbps', utilization: '22%' },
        { from: 7, to: 11, type: 'wireless', bandwidth: '300 Mbps', utilization: '12%' },
        { from: 4, to: 12, type: 'ethernet', bandwidth: '1 Gbps', utilization: '8%' }
    ]
};

// Main network instance
let network = null;

// Current view and layout configurations
let currentConfig = {
    layout: 'force',
    view: 'logical'
};

function initializeTopology() {
    const container = document.getElementById('topology-canvas');
    
    if (!container) return;
    
    // Process data for visualization
    const visData = processTopologyData(topologyData);
    
    // Configuration for the network
    const options = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 14,
                color: '#333333'
            },
            borderWidth: 2,
            shadow: true
        },
        edges: {
            width: 2,
            shadow: true,
            smooth: {
                type: 'continuous',
                forceDirection: 'none'
            }
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -8000,
                centralGravity: 0.3,
                springLength: 150,
                springConstant: 0.04,
                damping: 0.09
            }
        },
        interaction: {
            navigationButtons: true,
            keyboard: true,
            hover: true,
            tooltipDelay: 200
        },
        layout: {
            improvedLayout: true
        }
    };
    
    // Create the network visualization
    network = new vis.Network(container, visData, options);
    
    // Handle node selection
    network.on('selectNode', function(params) {
        if (params.nodes.length === 1) {
            const nodeId = params.nodes[0];
            const node = topologyData.nodes.find(n => n.id === nodeId);
            if (node) {
                showDeviceDetails(node);
            }
        }
    });
    
    network.on('deselectNode', function() {
        hideDeviceDetails();
    });
    
    // Setup zoom controls
    document.getElementById('zoom-in').addEventListener('click', function() {
        const scale = network.getScale() + 0.1;
        network.moveTo({ scale: scale });
    });
    
    document.getElementById('zoom-out').addEventListener('click', function() {
        const scale = network.getScale() - 0.1;
        network.moveTo({ scale: scale });
    });
    
    document.getElementById('zoom-reset').addEventListener('click', function() {
        network.moveTo({ scale: 1.0 });
    });
    
    document.getElementById('fit-view').addEventListener('click', function() {
        network.fit();
    });
    
    document.getElementById('export-topology').addEventListener('click', function() {
        exportTopologyImage();
    });
    
    // Setup close details button
    document.querySelector('.close-details').addEventListener('click', function() {
        hideDeviceDetails();
        network.unselectAll();
    });
}

function processTopologyData(data) {
    // Create deep copies to avoid modifying the original data
    const nodes = JSON.parse(JSON.stringify(data.nodes));
    const edges = JSON.parse(JSON.stringify(data.edges));
    
    // Process nodes
    const processedNodes = nodes.map(node => {
        let color, icon;
        
        // Determine color based on type and status
        switch (node.type) {
            case 'router':
                color = { background: 'rgba(52, 152, 219, 0.2)', border: '#3498db' };
                icon = { code: '\uf233', color: '#3498db' }; // fa-server
                break;
            case 'switch':
                color = { background: 'rgba(46, 204, 113, 0.2)', border: '#2ecc71' };
                icon = { code: '\uf6ff', color: '#2ecc71' }; // fa-network-wired
                break;
            case 'firewall':
                color = { background: 'rgba(231, 76, 60, 0.2)', border: '#e74c3c' };
                icon = { code: '\uf06e', color: '#e74c3c' }; // fa-eye
                break;
            case 'access-point':
                color = { background: 'rgba(155, 89, 182, 0.2)', border: '#9b59b6' };
                icon = { code: '\uf1eb', color: '#9b59b6' }; // fa-wifi
                break;
            case 'server':
                color = { background: 'rgba(243, 156, 18, 0.2)', border: '#f39c12' };
                icon = { code: '\uf233', color: '#f39c12' }; // fa-server
                break;
            case 'client':
                color = { background: 'rgba(149, 165, 166, 0.2)', border: '#95a5a6' };
                icon = { code: '\uf109', color: '#95a5a6' }; // fa-laptop
                break;
            default:
                color = { background: 'rgba(52, 152, 219, 0.2)', border: '#3498db' };
                icon = { code: '\uf233', color: '#3498db' };
        }
        
        // Modify border based on status
        if (node.status === 'warning') {
            color.border = '#f39c12';
        } else if (node.status === 'critical') {
            color.border = '#e74c3c';
        } else if (node.status === 'maintenance') {
            color.border = '#95a5a6';
        }
        
        // Create the tooltip HTML (displayed on hover)
        const title = `
            <div class="vis-tooltip-device">
                <div class="vis-tooltip-title">${node.label}</div>
                <div class="vis-tooltip-type">${node.type.toUpperCase()}</div>
                <div class="vis-tooltip-status">${node.status.toUpperCase()}</div>
                <div class="vis-tooltip-ip">${node.info.ip}</div>
            </div>
        `;
        
        return {
            ...node,
            color: color,
            icon: icon,
            title: title
        };
    });
    
    // Process edges
    const processedEdges = edges.map(edge => {
        let color, dashes;
        
        // Determine color and style based on connection type
        switch (edge.type) {
            case 'ethernet':
                color = '#3498db';
                dashes = false;
                break;
            case 'fiber':
                color = '#2ecc71';
                dashes = false;
                break;
            case 'wireless':
                color = '#9b59b6';
                dashes = [5, 5];
                break;
            default:
                color = '#95a5a6';
                dashes = false;
        }
        
        // Create the tooltip HTML (displayed on hover)
        const title = `
            <div class="vis-tooltip-edge">
                <div class="vis-tooltip-type">${edge.type.toUpperCase()} CONNECTION</div>
                <div class="vis-tooltip-bandwidth">Bandwidth: ${edge.bandwidth}</div>
                <div class="vis-tooltip-utilization">Utilization: ${edge.utilization}</div>
            </div>
        `;
        
        return {
            ...edge,
            color: { color: color },
            dashes: dashes,
            title: title,
            width: edge.type === 'fiber' ? 3 : 2 // Make fiber connections a bit thicker
        };
    });
    
    return {
        nodes: new vis.DataSet(processedNodes),
        edges: new vis.DataSet(processedEdges)
    };
}

function setupTopologyControls() {
    // Layout options
    document.querySelectorAll('.layout-options button').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in the group
            document.querySelectorAll('.layout-options button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the layout type from data attribute
            const layout = this.getAttribute('data-layout');
            
            // Apply the layout
            applyLayout(layout);
        });
    });
    
    // View options
    document.querySelectorAll('.view-options button').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in the group
            document.querySelectorAll('.view-options button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the view type from data attribute
            const view = this.getAttribute('data-view');
            
            // Apply the view
            applyView(view);
        });
    });
    
    // Device filters
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            applyFilters();
        });
    });
}

function applyLayout(layout) {
    if (!network) return;
    
    currentConfig.layout = layout;
    
    let options = {};
    
    switch (layout) {
        case 'force':
            options = {
                physics: {
                    enabled: true,
                    barnesHut: {
                        gravitationalConstant: -8000,
                        centralGravity: 0.3,
                        springLength: 150,
                        springConstant: 0.04,
                        damping: 0.09
                    }
                }
            };
            break;
        case 'hierarchical':
            options = {
                layout: {
                    hierarchical: {
                        direction: 'UD',
                        sortMethod: 'directed',
                        nodeSpacing: 150,
                        treeSpacing: 200
                    }
                },
                physics: {
                    enabled: false
                }
            };
            break;
        case 'circular':
            options = {
                layout: {
                    improvedLayout: true,
                    hierarchical: false
                },
                physics: {
                    enabled: true,
                    barnesHut: {
                        gravitationalConstant: -4000,
                        centralGravity: 0.8,
                        springLength: 150,
                        springConstant: 0.04,
                        damping: 0.09
                    }
                }
            };
            network.once('stabilized', function() {
                // Arrange nodes in a circle after stabilization
                const nodeIds = network.body.data.nodes.getIds();
                const positions = {};
                const radius = Math.min(network.canvas.canvasViewCenter.x, network.canvas.canvasViewCenter.y) * 0.8;
                const angleStep = (2 * Math.PI) / nodeIds.length;
                
                nodeIds.forEach((id, index) => {
                    const angle = index * angleStep;
                    positions[id] = {
                        x: radius * Math.cos(angle) + network.canvas.canvasViewCenter.x,
                        y: radius * Math.sin(angle) + network.canvas.canvasViewCenter.y
                    };
                });
                
                network.setPositions(positions);
                network.storePositions();
                // Disable physics after positioning
                network.setOptions({ physics: { enabled: false } });
            });
            break;
    }
    
    network.setOptions(options);
    
    // If circular, we need to let it stabilize first
    if (layout !== 'circular') {
        network.stabilize();
    }
}

function applyView(view) {
    if (!network) return;
    
    currentConfig.view = view;
    
    if (view === 'physical') {
        // In a real app, you would load a background image or position nodes according to their physical location
        showToast('Physical view would show devices based on actual floor plan/location', 'info');
    } else {
        // Logical view - remove any background and restore normal visualization
        network.setOptions({
            background: {
                image: null
            }
        });
    }
    
    // Re-apply current layout to update view
    applyLayout(currentConfig.layout);
}

function applyFilters() {
    if (!network) return;
    
    const deviceFilters = {
        router: document.getElementById('router').checked,
        switch: document.getElementById('switch').checked,
        firewall: document.getElementById('firewall').checked,
        'access-point': document.getElementById('access-point').checked,
        server: document.getElementById('server').checked,
        client: document.getElementById('client').checked
    };
    
    const statusFilters = {
        active: document.getElementById('active').checked,
        warning: document.getElementById('warning').checked,
        critical: document.getElementById('critical').checked,
        maintenance: document.getElementById('maintenance').checked
    };
    
    const connectionFilters = {
        ethernet: document.getElementById('ethernet').checked,
        fiber: document.getElementById('fiber').checked,
        wireless: document.getElementById('wireless').checked
    };
    
    // Filter nodes based on selected types and statuses
    const visData = network.body.data;
    const allNodes = topologyData.nodes;
    const allEdges = topologyData.edges;
    
    const filteredNodes = allNodes.filter(node => 
        deviceFilters[node.type] && statusFilters[node.status]
    );
    
    const filteredNodeIds = filteredNodes.map(node => node.id);
    
    // Filter edges based on connection types and connected nodes
    const filteredEdges = allEdges.filter(edge => 
        connectionFilters[edge.type] && 
        filteredNodeIds.includes(edge.from) && 
        filteredNodeIds.includes(edge.to)
    );
    
    // Update visualization
    visData.nodes.clear();
    visData.edges.clear();
    
    const processedData = processTopologyData({
        nodes: filteredNodes,
        edges: filteredEdges
    });
    
    visData.nodes.add(processedData.nodes.get());
    visData.edges.add(processedData.edges.get());
    
    // Re-apply current layout
    applyLayout(currentConfig.layout);
}

function showDeviceDetails(node) {
    const detailsContainer = document.getElementById('device-details');
    const selectMessage = detailsContainer.querySelector('.select-device-message');
    const deviceInfo = detailsContainer.querySelector('.device-info');
    
    // Hide the select message
    selectMessage.style.display = 'none';
    
    // Update device info content
    const icon = deviceInfo.querySelector('.device-title i');
    const name = deviceInfo.querySelector('.device-title h4');
    const status = deviceInfo.querySelector('.device-status');
    
    // Map node type to FontAwesome icon
    let iconClass = 'fa-server';
    switch (node.type) {
        case 'router': iconClass = 'fa-network-wired'; break;
        case 'switch': iconClass = 'fa-random'; break;
        case 'firewall': iconClass = 'fa-shield-alt'; break;
        case 'access-point': iconClass = 'fa-wifi'; break;
        case 'server': iconClass = 'fa-server'; break;
        case 'client': iconClass = 'fa-laptop'; break;
    }
    
    // Update icon and apply appropriate class
    icon.className = '';
    icon.classList.add('fas', iconClass);
    
    // Update device name
    name.textContent = node.label;
    
    // Update status
    status.className = 'device-status';
    status.classList.add(node.status);
    status.querySelector('span').textContent = node.status.charAt(0).toUpperCase() + node.status.slice(1);
    
    // Update properties
    const props = deviceInfo.querySelector('.device-props');
    props.innerHTML = '';
    
    // Add all properties from the info object
    for (const [key, value] of Object.entries(node.info)) {
        const propEl = document.createElement('div');
        propEl.className = 'prop';
        
        const nameEl = document.createElement('span');
        nameEl.className = 'prop-name';
        
        // Format the property name (e.g., "ip" becomes "IP Address")
        let formattedName = '';
        if (key === 'ip') formattedName = 'IP Address';
        else if (key === 'mac') formattedName = 'MAC Address';
        else formattedName = key.charAt(0).toUpperCase() + key.slice(1);
        
        nameEl.textContent = formattedName;
        
        const valueEl = document.createElement('span');
        valueEl.className = 'prop-value';
        valueEl.textContent = value;
        
        propEl.appendChild(nameEl);
        propEl.appendChild(valueEl);
        props.appendChild(propEl);
    }
    
    // Show the device info
    deviceInfo.style.display = 'block';
}

function hideDeviceDetails() {
    const detailsContainer = document.getElementById('device-details');
    const selectMessage = detailsContainer.querySelector('.select-device-message');
    const deviceInfo = detailsContainer.querySelector('.device-info');
    
    // Show the select message
    selectMessage.style.display = 'block';
    
    // Hide the device info
    deviceInfo.style.display = 'none';
}

function exportTopologyImage() {
    // Get the canvas element
    const canvas = network.canvas.frame.canvas;
    
    try {
        // Create an image from the canvas
        const image = canvas.toDataURL('image/png');
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = image;
        link.download = 'network-topology.png';
        
        // Append the link, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Topology exported as PNG image', 'success');
    } catch (error) {
        console.error('Error exporting topology:', error);
        showToast('Failed to export topology image', 'error');
    }
}

// Add some CSS for vis-network specific elements
document.addEventListener('DOMContentLoaded', function() {
    const visStyles = document.createElement('style');
    visStyles.textContent = `
        .vis-tooltip-device, .vis-tooltip-edge {
            padding: 8px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 4px;
            font-family: 'Roboto', sans-serif;
            font-size: 12px;
            pointer-events: none;
        }
        
        .vis-tooltip-title {
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 4px;
        }
        
        .vis-tooltip-type, .vis-tooltip-status {
            font-size: 11px;
            opacity: 0.8;
            margin-bottom: 2px;
        }
        
        .vis-tooltip-ip {
            font-family: monospace;
            margin-top: 4px;
        }
        
        .vis-tooltip-bandwidth, .vis-tooltip-utilization {
            font-size: 11px;
            margin-top: 2px;
        }
    `;
    document.head.appendChild(visStyles);
}); 