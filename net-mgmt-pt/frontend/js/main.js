/**
 * Network Management Dashboard
 * Main JavaScript file for shared functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab switching
    initializeTabs();
    
    // Initialize other interactive elements
    initializeRefreshButtons();
    initializeDeviceFilters();
    initializeSearchBars();
    initializeNotifications();
});

/**
 * Initialize tab switching functionality
 * This is used across multiple pages
 */
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabs.length === 0 || tabContents.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * Initialize refresh buttons
 */
function initializeRefreshButtons() {
    const refreshButtons = document.querySelectorAll('.refresh-btn');
    
    refreshButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            // Add rotation animation
            icon.classList.add('rotating');
            
            // Simulate refresh action
            setTimeout(() => {
                icon.classList.remove('rotating');
                
                // Show success message
                showToast('Page refreshed successfully!');
            }, 1000);
        });
    });
}

/**
 * Initialize device filters
 */
function initializeDeviceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add active state to button
            this.classList.add('active');
            
            // Simulate filter application
            setTimeout(() => {
                this.classList.remove('active');
                showToast('Filters applied');
            }, 500);
        });
    });
}

/**
 * Initialize search bars
 */
function initializeSearchBars() {
    const searchInputs = document.querySelectorAll('.search-bar input');
    
    searchInputs.forEach(input => {
        input.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // Search functionality would be implemented here
                    console.log('Searching for:', searchTerm);
                    showToast(`Searching for "${searchTerm}"...`);
                }
            }
        });
    });
}

/**
 * Initialize notifications
 */
function initializeNotifications() {
    const notificationIcons = document.querySelectorAll('.notifications');
    
    notificationIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Notification panel would be toggled here
            showToast('Notifications panel would open here');
        });
    });
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, warning, error)
 */
function showToast(message, type = 'success') {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast-notification');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    
    // Set toast content and type
    toast.textContent = message;
    toast.className = 'toast-notification ' + type;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Main JavaScript for Network Management Dashboard

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('sidebar-toggle');
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.top-header').prepend(toggleBtn);
    
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
    });
    
    // Handle Window Resize
    function handleResize() {
        if (window.innerWidth < 992) {
            sidebar.classList.add('collapsed');
            document.querySelector('.main-content').classList.add('expanded');
        } else {
            sidebar.classList.remove('collapsed');
            document.querySelector('.main-content').classList.remove('expanded');
        }
    }
    
    // Initial check and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Notifications Dropdown
    const notificationsIcon = document.querySelector('.notifications');
    if (notificationsIcon) {
        const notificationsDropdown = document.createElement('div');
        notificationsDropdown.classList.add('notifications-dropdown');
        notificationsDropdown.innerHTML = `
            <div class="dropdown-header">
                <span>Notifications</span>
                <a href="#" class="mark-read">Mark all as read</a>
            </div>
            <ul class="notification-list">
                <li class="notification-item unread">
                    <div class="notification-icon warning">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="notification-content">
                        <p class="notification-text">High traffic detected on Router-Main</p>
                        <span class="notification-time">5 minutes ago</span>
                    </div>
                </li>
                <li class="notification-item unread">
                    <div class="notification-icon critical">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="notification-content">
                        <p class="notification-text">Switch-Floor3 is down</p>
                        <span class="notification-time">15 minutes ago</span>
                    </div>
                </li>
                <li class="notification-item">
                    <div class="notification-icon info">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <div class="notification-content">
                        <p class="notification-text">New device connected: Workstation-5C</p>
                        <span class="notification-time">1 hour ago</span>
                    </div>
                </li>
            </ul>
            <div class="dropdown-footer">
                <a href="#alerts">View all notifications</a>
            </div>
        `;
        
        document.body.appendChild(notificationsDropdown);
        
        notificationsIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationsDropdown.classList.toggle('show');
            
            // Position the dropdown
            const rect = notificationsIcon.getBoundingClientRect();
            notificationsDropdown.style.top = `${rect.bottom + 5}px`;
            notificationsDropdown.style.left = `${rect.left - notificationsDropdown.offsetWidth + rect.width}px`;
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            notificationsDropdown.classList.remove('show');
        });
        
        // Prevent closing when clicking inside dropdown
        notificationsDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        searchInput.addEventListener('input', function() {
            // In a real application, you would implement actual search functionality here
            console.log('Searching for:', this.value);
        });
    }
    
    // Add active class to current nav item based on hash
    function setActiveNavItem() {
        const currentHash = window.location.hash || '#dashboard';
        
        // Remove active class from all items
        document.querySelectorAll('.nav-menu li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current hash
        const activeItem = document.querySelector(`.nav-menu a[href="${currentHash}"]`)?.parentElement;
        if (activeItem) activeItem.classList.add('active');
    }
    
    // Initial active item and listen for hash changes
    setActiveNavItem();
    window.addEventListener('hashchange', setActiveNavItem);
    
    // Refresh Button Animation
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.querySelector('i').classList.add('fa-spin');
            
            // Simulate a refresh (would be an actual data refresh in a real application)
            setTimeout(() => {
                this.querySelector('i').classList.remove('fa-spin');
                // Here you would update data from the backend
                showToast('Dashboard refreshed successfully!');
            }, 1500);
        });
    }
    
    // Toast Notifications
    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        
        let icon = 'check-circle';
        if (type === 'error') icon = 'times-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        if (type === 'info') icon = 'info-circle';
        
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(toast);
        
        // Show with delay for animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 50);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', function() {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
    };
    
    // Add CSS for dynamically created elements
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .sidebar-toggle {
            display: none;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            font-size: 1.2rem;
            cursor: pointer;
        }
        
        @media screen and (max-width: 992px) {
            .sidebar-toggle {
                display: block;
                margin-right: 1rem;
            }
            
            .sidebar.collapsed {
                transform: translateX(-100%);
            }
            
            .main-content.expanded {
                margin-left: 0;
            }
        }
        
        .notifications-dropdown {
            position: fixed;
            width: 320px;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
        }
        
        .notifications-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dropdown-header, .dropdown-footer {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
        }
        
        .dropdown-footer {
            border-top: 1px solid var(--border-color);
            border-bottom: none;
        }
        
        .dropdown-header span {
            font-weight: 500;
        }
        
        .mark-read, .dropdown-footer a {
            color: var(--primary-color);
            text-decoration: none;
            font-size: 0.8rem;
        }
        
        .notification-list {
            max-height: 300px;
            overflow-y: auto;
            padding: 0;
            margin: 0;
            list-style: none;
        }
        
        .notification-item {
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            transition: background-color 0.3s ease;
        }
        
        .notification-item:last-child {
            border-bottom: none;
        }
        
        .notification-item.unread {
            background-color: rgba(52, 152, 219, 0.05);
        }
        
        .notification-item:hover {
            background-color: var(--bg-secondary);
        }
        
        .notification-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.75rem;
        }
        
        .notification-icon.warning {
            background-color: rgba(243, 156, 18, 0.1);
            color: var(--warning-color);
        }
        
        .notification-icon.critical {
            background-color: rgba(231, 76, 60, 0.1);
            color: var(--danger-color);
        }
        
        .notification-icon.info {
            background-color: rgba(52, 152, 219, 0.1);
            color: var(--info-color);
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-text {
            margin: 0 0 0.25rem 0;
            font-size: 0.9rem;
        }
        
        .notification-time {
            font-size: 0.75rem;
            color: var(--text-secondary);
        }
        
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            min-width: 250px;
            padding: 1rem;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .toast i {
            margin-right: 0.75rem;
            font-size: 1.2rem;
        }
        
        .toast.success i {
            color: var(--success-color);
        }
        
        .toast.error i {
            color: var(--danger-color);
        }
        
        .toast.warning i {
            color: var(--warning-color);
        }
        
        .toast.info i {
            color: var(--info-color);
        }
        
        .toast span {
            flex: 1;
        }
        
        .toast-close {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
        }
        
        .search-bar.focused input {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
    `;
    document.head.appendChild(dynamicStyles);
});

// Simulated data for demonstration
const networkData = {
    devices: [
        { id: 1, name: 'Router-Main', type: 'router', status: 'active', location: 'Data Center' },
        { id: 2, name: 'Switch-Floor1', type: 'switch', status: 'active', location: 'Floor 1' },
        { id: 3, name: 'Switch-Floor2', type: 'switch', status: 'warning', location: 'Floor 2' },
        { id: 4, name: 'Switch-Floor3', type: 'switch', status: 'critical', location: 'Floor 3' },
        { id: 5, name: 'AP-Conference', type: 'access-point', status: 'active', location: 'Conference Room' },
        { id: 6, name: 'Firewall-Edge', type: 'firewall', status: 'active', location: 'Data Center' }
    ],
    alerts: [
        { id: 1, device: 'Router-Main', level: 'critical', message: 'High CPU Usage', time: '10 min ago' },
        { id: 2, device: 'Switch-Floor2', level: 'warning', message: 'Port Errors', time: '45 min ago' },
        { id: 3, device: 'Firewall-Edge', level: 'critical', message: 'Multiple Connection Failures', time: '1 hour ago' },
        { id: 4, device: 'AP-Conference', level: 'info', message: 'Firmware Update Available', time: '3 hours ago' }
    ]
};

// Mock API functions for data retrieval
// In a real application, these would make HTTP requests to your backend API
const api = {
    getDevices: function() {
        return new Promise(resolve => {
            setTimeout(() => resolve(networkData.devices), 500);
        });
    },
    getAlerts: function() {
        return new Promise(resolve => {
            setTimeout(() => resolve(networkData.alerts), 500);
        });
    },
    getNetworkHealth: function() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    uptime: '99.8%',
                    deviceStatus: {
                        active: 45,
                        warning: 3,
                        critical: 1,
                        maintenance: 2
                    },
                    trafficData: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        incoming: [320, 332, 301, 334, 390, 330, 320],
                        outgoing: [120, 132, 101, 134, 90, 230, 210]
                    }
                });
            }, 600);
        });
    }
}; 