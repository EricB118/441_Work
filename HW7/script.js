
class ImageObject {
    constructor(title, image, description, author, year) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.year = year;
    }
}

const images = [
    new ImageObject(
        "The March on Washington",
        "img/march_on_washington.jpg", 
        "A powerful image from the March on Washington in 1963, depicting the unity of people fighting for civil rights.",
        "Unknown",
        "1963"
    ),
    new ImageObject(
        "Protest in Hong Kong",
        "img/hong_kong_protest.jpg", 
        "A striking photo from the 2019 Hong Kong protests, showing a sea of people standing up for democracy.",
        "John Doe",
        "2019"
    ),
    new ImageObject(
        "Black Lives Matter",
        "img/black_lives_matter.jpg", 
        "An image capturing the strength and resilience of the Black Lives Matter movement in 2020.",
        "Jane Smith",
        "2020"
    ),
    new ImageObject(
        "Equality March",
        "img/equality_march.jpg", 
        "A vibrant photo from a pride march, symbolizing equality and acceptance for all.",
        "Alice Johnson",
        "2018"
    ),
    new ImageObject(
        "Women’s Rights Protest",
        "img/womens_rights_protest.jpg", 
        "An image showing the solidarity of women during a protest for equal rights.",
        "Emily White",
        "2017"
    )
];


function displayRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];

    document.getElementById('image').src = selectedImage.image;
    document.getElementById('title').innerText = selectedImage.title;
    document.getElementById('description').innerText = selectedImage.description;
    document.getElementById('author').innerText = `Author: ${selectedImage.author}`;
    document.getElementById('year').innerText = `Year: ${selectedImage.year}`;
}


document.getElementById('nextButton').addEventListener('click', displayRandomImage);


displayRandomImage();
