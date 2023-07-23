// JavaScript to move the box
const boxContainer = document.getElementById('box-container');
const plusIcon = document.querySelector('.fa-plus');
const imageUpload = document.getElementById('image-upload');
let x;
let y;
let i =0;


let currentImg = null;

// Function to update the box's position
const updatePosition = () => {
    console.log(currentImg.style.left);
    console.log(x);
  currentImg.style.left = x + 'px';
  currentImg.style.top = y + 'px';
}

const handleImageUpload = (event) =>{
    const file = event.target.files[0]
    if (!file) {
        alert('Please select a valid image file.');
        return;
      }
    const img = document.createElement('img');
    const imgIndex = "img"+i++;
    img.setAttribute("class","img"); 
    img.setAttribute("id",imgIndex);
    img.src = URL.createObjectURL(file)   
    img.addEventListener('keydown', handleKeyPress);
    const containerRect = boxContainer.getBoundingClientRect();
    const randomX = Math.random() * (containerRect.width );
    const randomY = Math.random() * (containerRect.height );
    img.style.left = randomX + "px";
    img.style.top = randomY + "px";
    x = randomX;
    y = randomY;
    currentImg = img;
    boxContainer.appendChild(img);


}

const handleMouseDown = (event)=>{
    const id = event.target.id;
    if(id.includes('img')){
        const box = document.getElementById(id);
        const boxRect = box.getBoundingClientRect();
        console.log(boxRect);
        x = boxRect.left;
        y = boxRect.top ;
        currentImg = box;
        currentImg.focus();
    }

}

const handleKeyPress = (event) => {
  const step = 10; 
  
  switch (event.key) {
    case 'ArrowUp':
      y -= step;
      break;
    case 'ArrowDown':
      y += step;
      break;
    case 'ArrowLeft':
      x -= step;
      break;
    case 'ArrowRight':
      x += step;
      break;
    default:
      break;
  }

  updatePosition();
}

const handleIconClick = () => {    
    imageUpload.click();
  }

window.addEventListener('keydown', handleKeyPress);
window.addEventListener("mousedown", handleMouseDown);
plusIcon.addEventListener('click', handleIconClick);
imageUpload.addEventListener('change', handleImageUpload);




