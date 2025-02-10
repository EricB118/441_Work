// Variables to store the choices and story state
let storyText = document.getElementById("story-text");
let imageContainer = document.getElementById("story-image");

// Function to update the story text and image based on the user's choice
function makeChoice(choice) {
    let newStoryText = "";
    let newImageSrc = "";
    
    // If statements to determine story outcomes
    if (choice === "explore") {
        newStoryText = "You venture deeper into the forest, and find an ancient tree with glowing markings.";
        newImageSrc = "explore.jpg";
    } else if (choice === "rest") {
        newStoryText = "You lay under the tree, resting peacefully, and hear birds singing.";
        newImageSrc = "rest.jpg";
    } else if (choice === "search") {
        newStoryText = "You begin searching for an exit and find a hidden path that seems to lead somewhere.";
        newImageSrc = "search.jpg";
    }

    // Update the DOM with the new story text and image
    storyText.textContent = newStoryText;
    imageContainer.src = newImageSrc;

    // Disable the buttons after the user makes a choice
    disableChoices();
}

// Function to disable buttons after a choice is made
function disableChoices() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}
