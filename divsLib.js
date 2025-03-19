function designateIdToDom(domElement, id) {
    if (!domElement || !id) {
        console.error('Invalid DOM element or ID provided.');
        return;
    }

    // Check if the ID is already in use
    if (document.getElementById(id)) {
        console.warn(`An element with the ID "${id}" already exists. IDs must be unique.`);
        return;
    }

    // Assign the ID to the DOM element
    domElement.id = id;
    //console.log(`ID "${id}" assigned to the DOM element.`);
}

function designateTagToDom(domElement, tagName) {
    if (!domElement || !tagName) {
        console.error('Invalid DOM element or tag name provided.');
        return null;
    }

    // Create a new element with the specified tag
    const newElement = document.createElement(tagName);

    // Copy all attributes from the old element to the new element
    for (const attr of domElement.attributes) {
        newElement.setAttribute(attr.name, attr.value);
    }

    // Copy all child nodes from the old element to the new element
    while (domElement.firstChild) {
        newElement.appendChild(domElement.firstChild);
    }

    // Replace the old element with the new element in the DOM
    domElement.replaceWith(newElement);

    //console.log(`Tag of the DOM element changed to "${tagName}".`);
    return newElement;
}

function setImageAsTexture(domElement, imagePath) {
    // Create an image element
    const img = new Image();

    // Set the image source
    img.src = imagePath;

    // Set the image as the background of the div
    domElement.style.backgroundImage = `url('${imagePath}')`;

    // Ensure the image scales proportionally based on the div's width
    domElement.style.backgroundSize = 'cover';

    // Center the image both horizontally and vertically
    domElement.style.backgroundPosition = 'center';

    // Prevent the image from repeating
    domElement.style.backgroundRepeat = 'no-repeat';

    // Optionally, set the height of the div to match the image's aspect ratio
    //const aspectRatio = img.height / img.width;
    //const divWidth = domElement.clientWidth; // Get the current width of the div
    //domElement.style.height = `${divWidth * aspectRatio}px`; // Set height based on aspect ratio
}
function addCenteredSquare(parentDiv, squareWidth, invertHorizontally) {
    // Ensure the parent div has a defined height and is a positioned element
    /*if (!parentDiv.style.height) {
        parentDiv.style.height = '100%'; // Default to full height if not set
    }
    parentDiv.style.position = 'relative'; // Make the parent a positioned element*/

    // Create the square child div
    const square = document.createElement('div');
    square.style.width = `${squareWidth}px`; // Set width
    square.style.height = `${squareWidth}px`; // Set height (same as width for a square)
    //[mjtgbvsquare.style.backgroundColor = 'purple'; // Just for visibility
    square.style.position = 'absolute'; // Position absolutely within the parent
    square.style.top = '50%'; // Position from the top
    square.style.left = '25%'; // Position from the left
    square.style.transform = 'translate(0%, -50%)'; // Center the square
    square.style.transformOrigin = 'center center'; // Ensure proper centering


    //square.style.transform = 'scaleX(-1)';
    //setImageAsTexture(square, "arrow.png");

    // Append the square to the parent div
    parentDiv.appendChild(square);
    return square;
}


function addSimpleChildElement(parent)
{
    return addChildElement(
        parent,
        '100%', '100%',
        '50%', '50%',
        'translate(-50%, -50%)'
    );
}
function addChildElement(parent,
    width,
    height,
    horPos,
    verPos,
    anchorPoint) {
    // Create the child element
    const child = document.createElement('div');
    child.style.width = width;
    child.style.height = height;
    child.style.backgroundColor = getRandomColor(); // Random color
    //child.style.border = '1px solid black'; // Add a border for visibility
    child.style.display = 'flex';
    child.style.justifyContent = 'center';
    child.style.alignItems = 'center';
    //child.textContent = 'Child'; // Add some text

    // Position the child absolutely within the parent
    child.style.position = 'absolute';
    child.style.top = verPos; // Position at half the height of the parent
    child.style.left = horPos; // Position at half the width of the parent
    child.style.transform = anchorPoint; // Center the child

    // Append the child to the parent
    parent.appendChild(child);
    return child;
}


function assignImageToDiv(imagePath, divElement) {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
        divElement.innerHTML = ''; // Clear the div
        divElement.appendChild(img); // Add the image to the div
    };
    img.onerror = () => {
        console.error('Failed to load image:', imagePath);
        divElement.textContent = 'Image failed to load'; // Error message
    };
}