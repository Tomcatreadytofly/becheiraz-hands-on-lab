// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize charts
    initializeCharts();
    
    // Add scroll animations
    initializeScrollAnimations();
    
    // Add interactive features
    initializeInteractiveFeatures();
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
                    data: [12.5, 14.2, 16.8, 18.9, 22.1, 25.3, 28.7, 31.2, 34.8, 38.5, 42.1, 45.9],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
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
                            color: '#f3f4f6'
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
                        hoverBackgroundColor: '#1d4ed8'
                    }
                }
            }
        });
    }

    // Customer Chart
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
                            color: '#f3f4f6'
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

// Scroll animations
function initializeScrollAnimations() {
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
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll('section, .stat-card, .summary-card, .metric-card, .model-card, .recommendation-item');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Counter animation
function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const hasMoney = text.includes('€');
    const hasM = text.includes('M');
    const hasK = text.includes('K');
    
    let number = parseFloat(text.replace(/[^\d.]/g, ''));
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = current.toFixed(1);
        if (number >= 10) displayValue = Math.round(current).toString();
        
        let finalText = displayValue;
        if (hasPlus) finalText = '+' + finalText;
        if (hasPercent) finalText += '%';
        if (hasMoney) finalText = '€' + finalText;
        if (hasM) finalText += 'M';
        if (hasK) finalText += 'K';
        
        element.textContent = finalText;
    }, duration / steps);
}

// Interactive features
function initializeInteractiveFeatures() {
    // Smooth scrolling for internal links
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

    // Recommendation item interactions
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
}

// Click handlers for interactive elements
function addClickHandlers() {
    // Model cards - show more details
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.addEventListener('click', function() {
            showModelDetails(this);
        });
    });

    // Metric cards - show detailed view
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            showMetricDetails(this);
        });
    });
}

// Show model details (placeholder for future expansion)
function showModelDetails(card) {
    const modelName = card.querySelector('h3').textContent;
    console.log(`Showing details for: ${modelName}`);
    
    // Add visual feedback
    card.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.2)';
    setTimeout(() => {
        card.style.boxShadow = '';
    }, 300);
}

// Show metric details (placeholder for future expansion)
function showMetricDetails(card) {
    const metricName = card.querySelector('h4').textContent;
    console.log(`Showing details for: ${metricName}`);
    
    // Add visual feedback
    card.style.transform = 'scale(1.02)';
    setTimeout(() => {
        card.style.transform = '';
    }, 200);
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Utility function to generate random data for demo purposes
function generateRandomData(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Performance monitoring
function trackPerformance() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        maxScroll = Math.max(maxScroll, scrollPercent);
    });

    // Track when user leaves page
    window.addEventListener('beforeunload', function() {
        console.log(`Max scroll depth: ${maxScroll}%`);
    });
}

// Initialize performance tracking
trackPerformance();

// Export functions for potential external use
window.BusinessReport = {
    initializeCharts,
    initializeScrollAnimations,
    initializeInteractiveFeatures,
    formatNumber,
    generateRandomData
};