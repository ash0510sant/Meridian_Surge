// Get DOM elements
const video = document.getElementById('introVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseOverlay = document.getElementById('playPauseOverlay');
const skipBtn = document.getElementById('skipBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const progressFill = document.getElementById('progressFill');
const timeDisplay = document.getElementById('timeDisplay');
const videoContainer = document.querySelector('.video-container');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

// Configuration
const HOME_PAGE_URL = '/pre-loader/home-content/index.html'; // Local file path
let isPlaying = false;
let hideControlsTimeout;

// Initialize video
function initializeVideo() {
    // Show loading indicator initially
    loadingIndicator.classList.remove('hidden');
    
    // Set video properties
    video.muted = false; // Allow audio to play
    video.playsInline = true;
    
    // Event listeners
    setupEventListeners();
    
    // Try to play video
    playVideo();
}

// Setup all event listeners
function setupEventListeners() {
    // Video events
    video.addEventListener('loadstart', showLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('play', onVideoPlay);
    video.addEventListener('pause', onVideoPause);
    video.addEventListener('ended', redirectToHome);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('waiting', showLoading);
    video.addEventListener('playing', hideLoading);
    
    // Button events
    playPauseBtn.addEventListener('click', togglePlayPause);
    skipBtn.addEventListener('click', redirectToHome);
    
    // Video container events
    videoContainer.addEventListener('click', handleContainerClick);
    videoContainer.addEventListener('mousemove', showControls);
    videoContainer.addEventListener('mouseleave', hideControls);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyPress);
    
    // Prevent context menu
    video.addEventListener('contextmenu', (e) => e.preventDefault());
}

// Try to play video function
async function playVideo() {
    try {
        // Wait for video to be ready
        if (video.readyState < 2) {
            await new Promise((resolve) => {
                video.addEventListener('canplay', resolve, { once: true });
            });
        }
        
        await video.play();
        isPlaying = true;
        updatePlayPauseButton();
        console.log('Video started playing successfully');
    } catch (error) {
        console.error('Error playing video:', error);
        // Try to play muted as fallback
        try {
            video.muted = true;
            await video.play();
            isPlaying = true;
            updatePlayPauseButton();
            console.log('Video started playing (muted fallback)');
            
            // Show unmute button or instruction
            showUnmuteOption();
        } catch (mutedError) {
            console.error('Even muted playback failed:', mutedError);
            handleVideoError();
        }
    }
}

// Pause video function
function pauseVideo() {
    video.pause();
    isPlaying = false;
    updatePlayPauseButton();
}

// Toggle play/pause
function togglePlayPause(e) {
    e.stopPropagation();
    
    if (isPlaying) {
        pauseVideo();
    } else {
        playVideo();
    }
}

// Handle container click (play/pause on video click)
function handleContainerClick(e) {
    // Don't trigger if clicking on buttons
    if (e.target.closest('.skip-btn') || e.target.closest('.play-pause-btn')) {
        return;
    }
    
    togglePlayPause(e);
}

// Update play/pause button appearance
function updatePlayPauseButton() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        videoContainer.classList.remove('paused');
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        videoContainer.classList.add('paused');
    }
}

// Video event handlers
function onVideoPlay() {
    isPlaying = true;
    updatePlayPauseButton();
}

function onVideoPause() {
    isPlaying = false;
    updatePlayPauseButton();
}

// Show/hide loading indicator
function showLoading() {
    loadingIndicator.classList.remove('hidden');
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

// Update progress bar
function updateProgress() {
    if (video.duration && video.currentTime) {
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${progress}%`;
        
        // Update time display
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    }
}

// Format time helper
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Show controls
function showControls() {
    clearTimeout(hideControlsTimeout);
    videoContainer.style.cursor = 'default';
    
    // Auto-hide after 3 seconds if video is playing
    if (isPlaying) {
        hideControlsTimeout = setTimeout(() => {
            videoContainer.style.cursor = 'none';
        }, 3000);
    }
}

// Hide controls
function hideControls() {
    clearTimeout(hideControlsTimeout);
    if (isPlaying) {
        videoContainer.style.cursor = 'none';
    }
}

// Keyboard controls
function handleKeyPress(e) {
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlayPause(e);
            break;
        case 'Escape':
        case 'Enter':
            redirectToHome();
            break;
        case 'ArrowRight':
            e.preventDefault();
            video.currentTime = Math.min(video.currentTime + 10, video.duration);
            break;
        case 'ArrowLeft':
            e.preventDefault();
            video.currentTime = Math.max(video.currentTime - 10, 0);
            break;
        case 'KeyM':
            e.preventDefault();
            video.muted = !video.muted;
            break;
    }
}

// Handle video errors
function handleVideoError() {
    console.error('Video error:', video.error);
    hideLoading();
    
    // Show error message with more helpful information
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-align: center;
        z-index: 25;
        background: rgba(0, 0, 0, 0.9);
        padding: 30px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        max-width: 400px;
    `;
    
    errorDiv.innerHTML = `
        <h3 style="margin-bottom: 15px;">Video Could Not Load</h3>
        <p style="margin-bottom: 20px; opacity: 0.8; font-size: 14px;">
            Please check:<br>
            • Video file exists: <strong>intro-video.mp4</strong><br>
            • File is in the same folder as this HTML<br>
            • Video format is supported (MP4 recommended)
        </p>
        <button onclick="redirectToHome()" style="
            padding: 12px 24px;
            background: white;
            color: black;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
        ">Continue to Home</button>
        <div style="margin-top: 15px;">
            <button onclick="location.reload()" style="
                padding: 8px 16px;
                background: transparent;
                color: white;
                border: 1px solid rgba(255,255,255,0.3);
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
            ">Try Again</button>
        </div>
    `;
    
    videoContainer.appendChild(errorDiv);
}

// Show unmute option for fallback
function showUnmuteOption() {
    const unmuteDiv = document.createElement('div');
    unmuteDiv.style.cssText = `
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 20;
        cursor: pointer;
        backdrop-filter: blur(10px);
    `;
    
    unmuteDiv.innerHTML = '🔇 Click to unmute';
    unmuteDiv.onclick = () => {
        video.muted = false;
        unmuteDiv.remove();
    };
    
    videoContainer.appendChild(unmuteDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (unmuteDiv.parentNode) {
            unmuteDiv.remove();
        }
    }, 5000);
}

// Redirect to home page
function redirectToHome() {
    console.log('Redirecting to home page...');
    
    // Add fade out effect
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = HOME_PAGE_URL;
    }, 500);
}

// Add smooth fade-in effect when page loads
function addPageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Add visual feedback for button interactions
function addButtonFeedback() {
    [playPauseBtn, skipBtn].forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = btn === skipBtn ? 'translateY(0) scale(0.95)' : 'scale(0.95)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addPageTransition();
    addButtonFeedback();
    initializeVideo();
    
    // Auto-hide cursor initially if video starts playing
    setTimeout(() => {
        if (isPlaying) {
            videoContainer.style.cursor = 'none';
        }
    }, 2000);
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (video && !video.paused) {
        video.pause();
    }
    clearTimeout(hideControlsTimeout);
});