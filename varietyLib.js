function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function loadImage(path) {
    const img = new Image();
    img.src = path;
    return img;
}


function generateImagePaths(length) {
    const paths = [];
    for (let i = 0; i < length; i++) {
        paths.push('imgs/' + `img (${String(i)}).jpeg`);
    }
    return paths;
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function sortAlphabeticallyCaseInsensitive(arr) {
    return arr.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}


function loadAllImages(imageUrls, callback) {
    // Create an array of Promises for each image
    const imagePromises = imageUrls.map(url => checkIfImgExists(url));

    // Wait for all Promises to resolve
    Promise.all(imagePromises).then(images => {
        // Filter out null values (failed images)
        const loadedImages = images.filter(img => img !== null);
        // Execute the callback with the loaded images
        callback(loadedImages);
    });
}

function checkIfImgExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            valid_images.push(url); // Push the URL to valid_images
            resolve(true); // Resolve with true (image loaded)
        };
        img.onerror = () => resolve(false); // Resolve with false (image failed to load)
        img.src = url;
    });
}

function getSafeIndexes(index, length) {
    if (length <= 0) return [];

    // Normalize index within bounds
    index = ((index % length) + length) % length;
    
    // Compute left and right indexes
    let left = ((index - 1) % length + length) % length;
    let right = ((index + 1) % length + length) % length;

    return [index, left, right];
}