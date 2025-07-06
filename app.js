// Global state
let currentPage = 'home';
let isDarkMode = false;
let animationObserver;

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const footnoteModal = document.getElementById('footnote-modal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeInteractiveElements();
    initializeCharts();
    initializeForms();
    initializeFootnotes();
    
    // Set initial page
    showPage('home');
});

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
    } else {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    document.documentElement.setAttribute('data-color-scheme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon();

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = isDarkMode ? '☀️' : '🌙';
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Hero buttons navigation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') && e.target.hasAttribute('data-page')) {
            const page = e.target.getAttribute('data-page');
            showPage(page);
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Trigger any page-specific initialization
        if (pageId === 'ai-implementation') {
            initializeAIToolsPage();
        }
    }

    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.research-card, .paper-card, .conference-card, .ai-tool-card');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Research page interactions
    initializeResearchDemos();
    
    // Skills animation
    initializeSkillsAnimation();
}

function initializeResearchDemos() {
    // Policy simulation
    const simulateBtn = document.querySelector('.simulate-btn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            const resultDiv = document.querySelector('.simulation-result');
            
            // Add loading state
            this.textContent = 'Running...';
            this.disabled = true;
            
            setTimeout(() => {
                const results = [
                    'GDP Growth: +2.3%',
                    'Unemployment Rate: -0.8%',
                    'Inflation Impact: +0.5%',
                    'Consumer Confidence: +5.2%'
                ];
                
                resultDiv.innerHTML = `
                    <h4>Policy Simulation Results</h4>
                    <ul>
                        ${results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                `;
                
                this.textContent = 'Run Policy Simulation';
                this.disabled = false;
            }, 2000);
        });
    }

    // NLP sentiment analysis
    const analyzeBtn = document.querySelector('.analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const textarea = document.querySelector('.nlp-demo textarea');
            const resultDiv = document.querySelector('.sentiment-result');
            
            if (!textarea.value.trim()) {
                alert('Please enter some text to analyze.');
                return;
            }
            
            this.textContent = 'Analyzing...';
            this.disabled = true;
            
            setTimeout(() => {
                const sentiment = Math.random() > 0.5 ? 'Positive' : 'Negative';
                const score = (Math.random() * 0.4 + 0.6).toFixed(2);
                
                resultDiv.innerHTML = `
                    <h4>Sentiment Analysis Result</h4>
                    <p><strong>Overall Sentiment:</strong> ${sentiment}</p>
                    <p><strong>Confidence Score:</strong> ${score}</p>
                    <p><strong>Key Indicators:</strong> Market optimism, economic growth, policy impact</p>
                `;
                
                this.textContent = 'Analyze Sentiment';
                this.disabled = false;
            }, 1500);
        });
    }
}

function initializeAIToolsPage() {
    // Initialize AI tools when page loads
    setTimeout(() => {
        initializeAITools();
    }, 100);
}

function initializeAITools() {
    // Economic Forecasting Tool
    const forecastBtn = document.getElementById('run-forecast');
    if (forecastBtn && !forecastBtn.hasAttribute('data-initialized')) {
        forecastBtn.setAttribute('data-initialized', 'true');
        forecastBtn.addEventListener('click', function() {
            const indicator = document.getElementById('indicator-select').value;
            const period = document.getElementById('forecast-period').value;
            const resultDiv = document.querySelector('.forecast-result');
            
            this.textContent = 'Generating...';
            this.disabled = true;
            
            setTimeout(() => {
                // Show result container
                resultDiv.style.display = 'block';
                
                // Generate forecast chart
                const canvas = document.getElementById('forecast-result-chart');
                if (canvas) {
                    generateForecastChart(canvas, indicator, period);
                }
                
                // Add forecast summary
                const summary = document.createElement('div');
                summary.innerHTML = `
                    <h4>Forecast Summary</h4>
                    <p><strong>Indicator:</strong> ${indicator.toUpperCase()}</p>
                    <p><strong>Period:</strong> ${period} months</p>
                    <p><strong>Trend:</strong> ${Math.random() > 0.5 ? 'Upward' : 'Stable'}</p>
                    <p><strong>Confidence:</strong> ${(Math.random() * 20 + 75).toFixed(1)}%</p>
                `;
                
                // Clear previous summary and add new one
                const existingSummary = resultDiv.querySelector('div:not(canvas)');
                if (existingSummary) {
                    existingSummary.remove();
                }
                resultDiv.appendChild(summary);
                
                this.textContent = 'Generate Forecast';
                this.disabled = false;
            }, 1500);
        });
    }

    // Policy Impact Simulator
    const simulateBtn = document.getElementById('simulate-policy');
    if (simulateBtn && !simulateBtn.hasAttribute('data-initialized')) {
        simulateBtn.setAttribute('data-initialized', 'true');
        simulateBtn.addEventListener('click', function() {
            const policyType = document.getElementById('policy-type').value;
            const magnitude = document.getElementById('impact-magnitude').value;
            const resultsDiv = document.querySelector('.simulation-results');
            
            this.textContent = 'Simulating...';
            this.disabled = true;
            
            setTimeout(() => {
                const metrics = generatePolicyMetrics(policyType, magnitude);
                
                resultsDiv.innerHTML = `
                    <h4>Policy Impact Results</h4>
                    <div class="result-metrics">
                        ${metrics.map(metric => `
                            <div class="metric-item">
                                <span class="metric-value">${metric.value}</span>
                                <span class="metric-label">${metric.label}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                this.textContent = 'Run Simulation';
                this.disabled = false;
            }, 1500);
        });
    }

    // Market Sentiment Analyzer
    const sentimentBtn = document.getElementById('analyze-sentiment');
    if (sentimentBtn && !sentimentBtn.hasAttribute('data-initialized')) {
        sentimentBtn.setAttribute('data-initialized', 'true');
        sentimentBtn.addEventListener('click', function() {
            const text = document.getElementById('sentiment-text').value;
            const resultDiv = document.querySelector('.sentiment-analysis-result');
            
            if (!text.trim()) {
                alert('Please enter some text to analyze.');
                return;
            }
            
            this.textContent = 'Analyzing...';
            this.disabled = true;
            
            setTimeout(() => {
                const sentiment = analyzeSentiment(text);
                
                resultDiv.innerHTML = `
                    <div class="sentiment-score">
                        <div class="sentiment-value">${sentiment.score}</div>
                        <div>Overall Sentiment Score</div>
                    </div>
                    <div class="sentiment-breakdown">
                        <div class="sentiment-item">
                            <div><strong>Positive</strong></div>
                            <div>${sentiment.positive}%</div>
                        </div>
                        <div class="sentiment-item">
                            <div><strong>Neutral</strong></div>
                            <div>${sentiment.neutral}%</div>
                        </div>
                        <div class="sentiment-item">
                            <div><strong>Negative</strong></div>
                            <div>${sentiment.negative}%</div>
                        </div>
                    </div>
                `;
                
                this.textContent = 'Analyze Sentiment';
                this.disabled = false;
            }, 1000);
        });
    }

    // Range input updates
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        const valueSpan = input.nextElementSibling;
        
        if (valueSpan && valueSpan.classList.contains('range-value')) {
            input.addEventListener('input', function() {
                let value = this.value;
                if (this.id === 'impact-magnitude') {
                    value += '%';
                }
                valueSpan.textContent = value;
            });
        }
    });
}

function initializeSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
                
                skillObserver.unobserve(bar);
            }
        });
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Charts
function initializeCharts() {
    // Initialize demo charts
    setTimeout(() => {
        const forecastChart = document.getElementById('forecast-chart');
        const tradingChart = document.getElementById('trading-chart');
        
        if (forecastChart) {
            generateDemoChart(forecastChart, 'Economic Forecast');
        }
        
        if (tradingChart) {
            generateDemoChart(tradingChart, 'Trading Algorithm');
        }
    }, 1000);
}

function generateDemoChart(canvas, title) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate sample data
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(Math.random() * 100 + 50);
    }
    
    // Draw chart
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Add points
    ctx.fillStyle = '#21808D';
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function generateForecastChart(canvas, indicator, period) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate forecast data
    const data = [];
    let baseValue = 100;
    
    for (let i = 0; i < parseInt(period); i++) {
        baseValue += (Math.random() - 0.5) * 10;
        data.push(Math.max(0, baseValue));
    }
    
    // Draw forecast line
    ctx.strokeStyle = '#1FB8CD';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Add confidence band
    ctx.fillStyle = 'rgba(31, 184, 205, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((data[i] + 20) / 150) * height;
        ctx.lineTo(x, y);
    }
    
    for (let i = data.length - 1; i >= 0; i--) {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((data[i] - 20) / 150) * height;
        ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Add data points
    ctx.fillStyle = '#1FB8CD';
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// Utility functions
function generatePolicyMetrics(policyType, magnitude) {
    const multiplier = magnitude / 100;
    const metrics = [];
    
    switch (policyType) {
        case 'fiscal':
            metrics.push(
                { value: `+${(2.1 * multiplier).toFixed(1)}%`, label: 'GDP Growth' },
                { value: `${(1.5 * multiplier).toFixed(1)}%`, label: 'Inflation' },
                { value: `-${(0.8 * multiplier).toFixed(1)}%`, label: 'Unemployment' },
                { value: `+${(3.2 * multiplier).toFixed(1)}%`, label: 'Consumer Spending' }
            );
            break;
        case 'monetary':
            metrics.push(
                { value: `+${(1.8 * multiplier).toFixed(1)}%`, label: 'Investment' },
                { value: `${(0.9 * multiplier).toFixed(1)}%`, label: 'Interest Rate' },
                { value: `+${(2.5 * multiplier).toFixed(1)}%`, label: 'Money Supply' },
                { value: `-${(1.2 * multiplier).toFixed(1)}%`, label: 'Currency Value' }
            );
            break;
        case 'trade':
            metrics.push(
                { value: `+${(1.4 * multiplier).toFixed(1)}%`, label: 'Export Growth' },
                { value: `${(0.6 * multiplier).toFixed(1)}%`, label: 'Import Change' },
                { value: `+${(2.8 * multiplier).toFixed(1)}%`, label: 'Trade Balance' },
                { value: `${(1.1 * multiplier).toFixed(1)}%`, label: 'Tariff Impact' }
            );
            break;
    }
    
    return metrics;
}

function analyzeSentiment(text) {
    // Simple sentiment analysis simulation
    const positiveWords = ['growth', 'increase', 'positive', 'bullish', 'optimistic', 'strong', 'good', 'excellent'];
    const negativeWords = ['decline', 'decrease', 'negative', 'bearish', 'pessimistic', 'weak', 'bad', 'crisis'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
        if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
        if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    const positive = total > 0 ? Math.round((positiveCount / total) * 100) : 33;
    const negative = total > 0 ? Math.round((negativeCount / total) * 100) : 33;
    const neutral = 100 - positive - negative;
    
    const overallScore = positive > negative ? 
        (0.5 + (positive - negative) / 200).toFixed(2) : 
        (0.5 - (negative - positive) / 200).toFixed(2);
    
    return {
        score: overallScore,
        positive: positive,
        negative: negative,
        neutral: neutral
    };
}

// Forms
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! Dr. Mirindi will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Footnotes
function initializeFootnotes() {
    const footnoteButtons = document.querySelectorAll('.footnote-btn');
    const footnoteClose = document.querySelector('.footnote-close');
    
    // Make footnote buttons more visible
    footnoteButtons.forEach((button, index) => {
        button.style.display = 'inline-block';
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const footnoteId = this.getAttribute('data-footnote');
            showFootnote(footnoteId);
        });
    });
    
    if (footnoteClose) {
        footnoteClose.addEventListener('click', hideFootnote);
    }
    
    // Close modal when clicking outside
    if (footnoteModal) {
        footnoteModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideFootnote();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && footnoteModal && footnoteModal.classList.contains('active')) {
            hideFootnote();
        }
    });
}

function showFootnote(footnoteId) {
    const footnoteBody = document.querySelector('.footnote-body');
    
    if (!footnoteBody) return;
    
    // Sample footnote content
    const footnotes = {
        '1': {
            title: 'Machine Learning Applications in Macroeconomic Forecasting',
            citation: 'Mirindi, F. (2024). Machine Learning Applications in Macroeconomic Forecasting. Journal of Economic Analysis, 45(3), 123-145.',
            doi: 'doi:10.1000/jea.2024.0123',
            citations: 47,
            downloads: 1250,
            altmetric: 18
        },
        '2': {
            title: 'AI-Driven Policy Evaluation: A Comprehensive Framework',
            citation: 'Mirindi, F. (2024). AI-Driven Policy Evaluation: A Comprehensive Framework. Economic Policy Review, 78(2), 67-89.',
            doi: 'doi:10.1000/epr.2024.0456',
            citations: 35,
            downloads: 890,
            altmetric: 15
        },
        '3': {
            title: 'Natural Language Processing for Economic Sentiment Analysis',
            citation: 'Mirindi, F. (2023). Natural Language Processing for Economic Sentiment Analysis. Computational Economics, 62(4), 234-256.',
            doi: 'doi:10.1000/ce.2023.0789',
            citations: 62,
            downloads: 1560,
            altmetric: 22
        },
        '4': {
            title: 'Deep Learning Models for Financial Market Prediction',
            citation: 'Mirindi, F. (2023). Deep Learning Models for Financial Market Prediction. Financial Economics Review, 91(1), 34-52.',
            doi: 'doi:10.1000/fer.2023.0012',
            citations: 28,
            downloads: 720,
            altmetric: 12
        }
    };
    
    const footnote = footnotes[footnoteId];
    
    if (footnote) {
        footnoteBody.innerHTML = `
            <h4>${footnote.title}</h4>
            <div class="citation-info">
                <p><strong>Citation:</strong> ${footnote.citation}</p>
                <p><strong>DOI:</strong> <a href="#" target="_blank">${footnote.doi}</a></p>
            </div>
            <div class="impact-metrics">
                <h5>Impact Metrics</h5>
                <div class="metrics-grid">
                    <div class="metric">
                        <span class="metric-number">${footnote.citations}</span>
                        <span class="metric-label">Citations</span>
                    </div>
                    <div class="metric">
                        <span class="metric-number">${footnote.downloads}</span>
                        <span class="metric-label">Downloads</span>
                    </div>
                    <div class="metric">
                        <span class="metric-number">${footnote.altmetric}</span>
                        <span class="metric-label">Altmetric Score</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        footnoteBody.innerHTML = '<p>Citation information not available.</p>';
    }
    
    footnoteModal.classList.add('active');
}

function hideFootnote() {
    if (footnoteModal) {
        footnoteModal.classList.remove('active');
    }
}

// Utility functions for smooth interactions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
window.addEventListener('beforeunload', function() {
    // Clean up observers
    if (animationObserver) {
        animationObserver.disconnect();
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Export functions for global access
window.showPage = showPage;
window.toggleTheme = toggleTheme;






