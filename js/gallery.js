'use strict';
const bindEventsToCloseImage = () => {
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      closeFullImage();
    }
  };
}

const closeFullImage = () => {
  const full_image_container = document.getElementById('full_image');
  while (full_image_container.hasChildNodes()) {
    full_image_container.removeChild(full_image_container.firstChild);
  }
  full_image_container.setAttribute('style', `top: 0px`);
  full_image_container.setAttribute('class', `full-image`);
  document.body.style.overflowY = 'scroll';
  document.onkeydown = null;
};

const createImageElement = (url, alt_text, full_screen) => {
  const elem = document.createElement("img");
  elem.setAttribute('src', url);
  elem.setAttribute('alt', alt_text);
  return elem;
}

const getData = () => {
  const url = '/images';
  fetch(url).then((res) => {
    return res.json();
  })
  .then(res => {
    showImages(res.photos);
  });
};

const imageClicked = (image_url, image_title) => {
  const full_image_container = document.getElementById('full_image');
  const close_button_elem = document.createElement('button');
  close_button_elem.setAttribute('onClick', 'closeFullImage()');
  close_button_elem.setAttribute('class', 'close-button');
  close_button_elem.innerHTML = 'Close';
  full_image_container.append(close_button_elem);
  full_image_container.append(createImageElement(image_url, image_title, true));
  full_image_container.setAttribute('style', `top: ${window.scrollY}px`);
  document.body.style.overflowY = 'hidden';
  full_image_container.setAttribute('class', `full-image show`);
  bindEventsToCloseImage();
}

const showImages = (images) => {
  if(!images) {
    throw('Images doesn\'t exist');
  }
  const images_container = document.getElementById('images_container');
  for(let image of images.photo) {
    const small_image = image.url_s ? image.url_s : image.url_m ? image.url_m : image.url_l;
    const large_image = image.url_l ? image.url_l : image.url_m ? image.url_m : image.url_s;
    if(!small_image) { continue; }
    const image_block = document.createElement("div");
    const anchor_elem = document.createElement("a");
    image_block.setAttribute('class', 'col-sm-12 col-md-6 col-lg-3 mb-3');
    anchor_elem.href=`javascript: imageClicked('${large_image}', '${image.title}');`
    anchor_elem.append(createImageElement(small_image, image.title));
    image_block.append(anchor_elem);
    images_container.append(image_block);
  }
};

(function() {
  getData()
})()