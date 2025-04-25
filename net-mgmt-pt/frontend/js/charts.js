/**
 * Network Management Dashboard
 * Charts and data visualization functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize charts if on the metrics page (containing chart canvases)
    if (document.getElementById('cpuChart')) {
        initializeMetricCharts();
    }
    
    // Handle chart interactions
    initializeChartControls();
});

/**
 * Initialize all metric charts on the metrics page
 */
function initializeMetricCharts() {
    // Initialize CPU utilization chart
    initializeCpuChart();
    
    // Initialize Memory usage chart
    initializeMemoryChart();
    
    // Initialize Errors chart
    initializeErrorsChart();
    
    // Initialize Uptime chart
    initializeUptimeChart();
}

/**
 * Initialize CPU utilization chart
 */
function initializeCpuChart() {
    const cpuCtx = document.getElementById('cpuChart').getContext('2d');
    const cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: 'Core Router 1',
                data: [25, 30, 45, 60, 78, 65, 40, 35],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5
            },
            {
                label: 'Edge Router 2',
                data: [15, 20, 35, 45, 55, 50, 30, 25],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'CPU Usage (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            }
        }
    });
}

/**
 * Initialize Memory usage chart
 */
function initializeMemoryChart() {
    const memCtx = document.getElementById('memoryChart').getContext('2d');
    const memChart = new Chart(memCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: 'Core Router 1',
                data: [40, 42, 45, 50, 55, 58, 56, 52],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5
            },
            {
                label: 'Edge Router 2',
                data: [30, 32, 36, 42, 45, 44, 40, 38],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Memory Usage (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            }
        }
    });
}

/**
 * Initialize Interface Errors chart
 */
function initializeErrorsChart() {
    const errorsCtx = document.getElementById('errorsChart').getContext('2d');
    const errorsChart = new Chart(errorsCtx, {
        type: 'bar',
        data: {
            labels: ['Port 1', 'Port 2', 'Port 3', 'Port 4', 'Port 5', 'Port 6'],
            datasets: [{
                label: 'Input Errors',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Output Errors',
                data: [8, 15, 5, 2, 1, 2],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Error Count'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Interface'
                    }
                }
            }
        }
    });
}

/**
 * Initialize Uptime chart
 */
function initializeUptimeChart() {
    const uptimeCtx = document.getElementById('uptimeChart').getContext('2d');
    const uptimeChart = new Chart(uptimeCtx, {
        type: 'doughnut',
        data: {
            labels: ['> 99.9%', '99.0% - 99.9%', '< 99.0%'],
            datasets: [{
                data: [23, 5, 2],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round(value / total * 100);
                            return `${label}: ${value} devices (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize chart control buttons (expand, download, settings)
 */
function initializeChartControls() {
    // Handle chart expand buttons
    const expandButtons = document.querySelectorAll('.chart-actions [title="Expand"]');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartCard = this.closest('.chart-card');
            toggleChartExpand(chartCard);
        });
    });
    
    // Handle chart download buttons
    const downloadButtons = document.querySelectorAll('.chart-actions [title="Download"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartCard = this.closest('.chart-card');
            const chartTitle = chartCard.querySelector('h3').textContent;
            downloadChart(chartCard, chartTitle);
        });
    });
    
    // Handle chart settings buttons
    const settingsButtons = document.querySelectorAll('.chart-actions [title="Settings"]');
    settingsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartCard = this.closest('.chart-card');
            const chartTitle = chartCard.querySelector('h3').textContent;
            showToast(`${chartTitle} settings would open here`);
        });
    });
    
    // Handle time period buttons
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const timePeriod = this.textContent.trim();
            showToast(`Changed time period to ${timePeriod}`);
            // This would actually update the chart data for the selected time period
        });
    });
}

/**
 * Toggle chart expanded state
 * @param {HTMLElement} chartCard - The chart card element to expand/collapse
 */
function toggleChartExpand(chartCard) {
    const isExpanded = chartCard.classList.contains('expanded');
    
    // If already expanded, collapse it
    if (isExpanded) {
        chartCard.classList.remove('expanded');
        chartCard.style.position = '';
        chartCard.style.zIndex = '';
        document.body.style.overflow = '';
    } else {
        // Expand the chart
        chartCard.classList.add('expanded');
        chartCard.style.position = 'fixed';
        chartCard.style.zIndex = '1000';
        document.body.style.overflow = 'hidden';
        
        // Create close button if not exists
        if (!chartCard.querySelector('.close-expanded')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-expanded';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.addEventListener('click', () => toggleChartExpand(chartCard));
            chartCard.appendChild(closeBtn);
        }
    }
    
    // Trigger chart resize
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
}

/**
 * Download chart as image
 * @param {HTMLElement} chartCard - The chart card element containing the chart
 * @param {string} title - The title for the downloaded image
 */
function downloadChart(chartCard, title) {
    const canvas = chartCard.querySelector('canvas');
    if (!canvas) return;
    
    // Create a download link
    const link = document.createElement('a');
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    showToast(`Downloaded ${title} chart`);
}

// Add the chart error styles
const chartErrorStyles = document.createElement('style');
chartErrorStyles.textContent = `
    .chart-error {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .chart-error i {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--danger-color);
    }
    
    .uptime-badge {
        position: absolute;
        top: 50px;
        right: 20px;
        background-color: var(--bg-primary);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        box-shadow: var(--shadow-sm);
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--text-primary);
    }
`;
document.head.appendChild(chartErrorStyles);

// Refresh charts when window is resized
window.addEventListener('resize', function() {
    // Debounce the resize event to prevent excessive redraws
    clearTimeout(this.timeout);
    this.timeout = setTimeout(function() {
        // Clear existing charts
        const chartElements = document.querySelectorAll('.chart');
        chartElements.forEach(chart => {
            chart.innerHTML = '';
        });
        
        // Re-initialize charts
        initializeCharts();
    }, 250);
}); 