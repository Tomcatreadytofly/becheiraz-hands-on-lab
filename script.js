// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize charts
    initializeCharts();
    
    // Add smooth scrolling and animations
    initializeAnimations();
    
    // Add interactive features
    initializeInteractivity();
});

// Chart initialization
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Umsatz (€M)',
                    data: [2.1, 2.3, 2.8, 3.2, 3.7, 4.1, 4.6, 5.2, 5.8, 6.3, 6.9, 7.5],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280'
                        }
                    },
                    y: {
                        grid: {
                            color: '#e5e7eb'
                        },
                        ticks: {
                            color: '#6b7280',
                            callback: function(value) {
                                return '€' + value + 'M';
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    // Customer Acquisition Chart
    const customerCtx = document.getElementById('customerChart');
    if (customerCtx) {
        new Chart(customerCtx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Neue Kunden (K)',
                    data: [145, 189, 234, 287],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(6, 182, 212, 0.8)',
                        'rgba(124, 58, 237, 0.8)',
                        'rgba(37, 99, 235, 0.8)'
                    ],
                    borderColor: [
                        '#10b981',
                        '#06b6d4',
                        '#7c3aed',
                        '#2563eb'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280'
                        }
                    },
                    y: {
                        grid: {
                            color: '#e5e7eb'
                        },
                        ticks: {
                            color: '#6b7280',
                            callback: function(value) {
                                return value + 'K';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animate progress bars
                const progressBars = entry.target.querySelectorAll('.progress-fill, .roi-fill');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                
                // Animate counters
                const counters = entry.target.querySelectorAll('.stat-value, .metric-value');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll('section, .stat-card, .summary-card, .metric-card, .model-card, .recommendation-item');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Counter animation
function animateCounter(element) {
    const target = element.textContent;
    const numericValue = parseFloat(target.replace(/[^\d.-]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (numericValue - startValue) * easeOutCubic;
        
        // Format the number based on original format
        let formattedValue;
        if (target.includes('%')) {
            formattedValue = currentValue.toFixed(1) + '%';
        } else if (target.includes('M')) {
            formattedValue = currentValue.toFixed(1) + 'M';
        } else if (target.includes('K')) {
            formattedValue = Math.round(currentValue) + 'K';
        } else if (target.includes('€')) {
            formattedValue = '€' + currentValue.toFixed(1) + 'M';
        } else if (target.includes('+')) {
            formattedValue = '+' + Math.round(currentValue) + '%';
        } else {
            formattedValue = Math.round(currentValue).toLocaleString();
        }
        
        element.textContent = formattedValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Interactive features
function initializeInteractivity() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.stat-card, .summary-card, .metric-card, .model-card, .flow-stage');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Recommendation item hover effects
    const recommendations = document.querySelectorAll('.recommendation-item');
    recommendations.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add click handlers for interactive elements
    addClickHandlers();
    
    // Initialize tooltips
    initializeTooltips();
}

// Click handlers for interactive elements
function addClickHandlers() {
    // Model cards - show detailed information
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.addEventListener('click', function() {
            const modelName = this.querySelector('h3').textContent;
            showModelDetails(modelName);
        });
    });

    // Metric cards - show detailed charts
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            const metricName = this.querySelector('h4').textContent;
            showMetricDetails(metricName);
        });
    });
}

// Show model details modal
function showModelDetails(modelName) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${modelName} - Detailanalyse</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Detaillierte Analyse für ${modelName} würde hier angezeigt werden.</p>
                <div class="modal-metrics">
                    <div class="modal-metric">
                        <span class="metric-label">Marktpotential</span>
                        <span class="metric-value">€${Math.floor(Math.random() * 100)}M</span>
                    </div>
                    <div class="modal-metric">
                        <span class="metric-label">Implementierungszeit</span>
                        <span class="metric-value">${Math.floor(Math.random() * 12) + 6} Monate</span>
                    </div>
                    <div class="modal-metric">
                        <span class="metric-label">Risikobewertung</span>
                        <span class="metric-value">${['Niedrig', 'Mittel', 'Hoch'][Math.floor(Math.random() * 3)]}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.3s ease;
    `;

    document.body.appendChild(modal);

    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Show metric details
function showMetricDetails(metricName) {
    console.log(`Showing details for ${metricName}`);
    // Implementation would show detailed metric analysis
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 0.5rem 0.75rem;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.375rem;
        transition: background-color 0.2s;
    }
    
    .modal-close:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .modal-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .modal-metric {
        text-align: center;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 0.5rem;
    }
    
    .modal-metric .metric-label {
        display: block;
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
    }
    
    .modal-metric .metric-value {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2563eb;
    }
`;
document.head.appendChild(style);

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track user interactions
        document.addEventListener('click', function(e) {
            const element = e.target.closest('[class]');
            if (element) {
                console.log(`User clicked: ${element.className}`);
            }
        });
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();