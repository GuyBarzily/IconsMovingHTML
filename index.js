const boxContainer = document.getElementById('box-container');
const plusIcon = document.querySelector('.fa-plus');
const imageUpload = document.getElementById('image-upload');
const latLan = {};
let i = 0;
let currentImg = null;

const updatePosition = (x, y) => {
    currentImg.style.left = x + 'px';
    currentImg.style.top = y + 'px';
}

const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) {
        alert('Please select a valid image file.');
        return;
    }
    const img = document.createElement('img');
    const imgIndex = "img" + i++;
    img.setAttribute("class", "img");
    img.setAttribute("id", imgIndex);
    img.src = URL.createObjectURL(file)
    img.addEventListener('keydown', handleKeyPress);
    const containerRect = boxContainer.getBoundingClientRect();
    const randomX = Math.random() * (containerRect.width);
    const randomY = Math.random() * (containerRect.height);
    img.style.left = randomX + "px";
    img.style.top = randomY + "px";
    latLan[imgIndex] = { x: randomX, y: randomY };
    currentImg = img;
    boxContainer.appendChild(img);
    const input = document.getElementById("image-upload");
    input.value = null;

}

const handleMouseDown = (event) => {
    const id = event.target.id;
    if (id.includes('img')) {
        const box = document.getElementById(id);
        currentImg = box;
        currentImg.focus();
    }

}

const handleKeyPress = (event) => {
    const step = 10;
    const position = latLan[currentImg.id];
    switch (event.key) {
        case 'ArrowUp':
            position.y -= step;
            break;
        case 'ArrowDown':
            position.y += step;
            break;
        case 'ArrowLeft':
            position.x -= step;
            break;
        case 'ArrowRight':
            position.x += step;
            break;
        default:
            break;
    }

    updatePosition(position.x, position.y);
}

const handleIconClick = () => {
    imageUpload.click();
}

window.addEventListener('keydown', handleKeyPress);
window.addEventListener("mousedown", handleMouseDown);
plusIcon.addEventListener('click', handleIconClick);
imageUpload.addEventListener('change', handleImageUpload);




