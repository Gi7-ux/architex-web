document.addEventListener('DOMContentLoaded', () => {
    console.log('Debug script loaded');
    
    // Check if the bird image exists in the DOM
    const origamiBird = document.getElementById('origami-bird');
    console.log('Bird element:', origamiBird);
    
    if (origamiBird) {
        // Log bird properties
        console.log('Bird src:', origamiBird.src);
        console.log('Bird display style:', window.getComputedStyle(origamiBird).display);
        console.log('Bird visibility style:', window.getComputedStyle(origamiBird).visibility);
        console.log('Bird opacity style:', window.getComputedStyle(origamiBird).opacity);
        console.log('Bird width:', window.getComputedStyle(origamiBird).width);
        console.log('Bird height:', window.getComputedStyle(origamiBird).height);
        console.log('Bird z-index:', window.getComputedStyle(origamiBird).zIndex);
        console.log('Bird position:', window.getComputedStyle(origamiBird).position);
        
        // Check if image loaded successfully
        if (origamiBird.complete) {
            console.log('Bird image is already loaded');
            if (origamiBird.naturalWidth === 0) {
                console.error('Bird image failed to load');
            } else {
                console.log('Bird image loaded successfully');
                console.log('Natural width:', origamiBird.naturalWidth);
                console.log('Natural height:', origamiBird.naturalHeight);
            }
        } else {
            console.log('Bird image is still loading...');
            
            origamiBird.onload = () => {
                console.log('Bird image loaded successfully');
                console.log('Natural width:', origamiBird.naturalWidth);
                console.log('Natural height:', origamiBird.naturalHeight);
            };
            
            origamiBird.onerror = () => {
                console.error('Failed to load bird image');
            };
        }
        
        // Check parent container
        const birdContainer = document.querySelector('.bird-container');
        if (birdContainer) {
            console.log('Bird container display:', window.getComputedStyle(birdContainer).display);
            console.log('Bird container visibility:', window.getComputedStyle(birdContainer).visibility);
            console.log('Bird container opacity:', window.getComputedStyle(birdContainer).opacity);
            console.log('Bird container width:', window.getComputedStyle(birdContainer).width);
            console.log('Bird container height:', window.getComputedStyle(birdContainer).height);
            console.log('Bird container z-index:', window.getComputedStyle(birdContainer).zIndex);
            console.log('Bird container position:', window.getComputedStyle(birdContainer).position);
        } else {
            console.error('Bird container not found');
        }
        
        // Check if bird has animation
        console.log('Bird animation:', window.getComputedStyle(origamiBird).animation);
        console.log('Bird has breaking-free class:', origamiBird.classList.contains('breaking-free'));
        
        // Try to force the bird to be visible
        setTimeout(() => {
            console.log('Attempting to force bird visibility...');
            origamiBird.style.opacity = '1';
            origamiBird.style.visibility = 'visible';
            origamiBird.style.display = 'block';
            
            if (!origamiBird.classList.contains('breaking-free')) {
                origamiBird.classList.add('breaking-free');
                console.log('Added breaking-free class to bird');
            }
        }, 1000);
    } else {
        console.error('Bird element not found in the DOM');
    }
});
