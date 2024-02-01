 // Obtener referencia al botón de menú
 const menuButton = document.querySelector('.navbar-toggler');

 // Obtener referencia a todos los enlaces dentro del menú
 const menuLinks = document.querySelectorAll('.navbar-nav a');

 // Obtener referencia al offcanvas
 const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasDarkNavbar'));

 // Función para cerrar el menú
 function closeMenu() {
     offcanvas.hide();
 }

 // Agregar el evento clic a cada enlace del menú
 menuLinks.forEach(link => {
     link.addEventListener('click', closeMenu);
 });

document.addEventListener("DOMContentLoaded", function () {
  const galleryImgs = document.querySelectorAll(".gallery-img");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  galleryImgs.forEach((img, index) => {
    img.addEventListener("click", function () {
      showEnlargedImage(index);
    });
  });

  function showEnlargedImage(index) {
    overlay.style.display = "block";
    const enlargedImg = document.createElement("img");
    enlargedImg.classList.add("enlarged-img");
    enlargedImg.src = galleryImgs[index].src;
    overlay.appendChild(enlargedImg);

    const leftArrow = document.createElement("span");
    leftArrow.classList.add("carousel-control", "left");
    leftArrow.innerHTML = "&lt;";
    leftArrow.addEventListener("click", function () {
      index = (index - 1 + galleryImgs.length) % galleryImgs.length;
      enlargedImg.src = galleryImgs[index].src;
    });
    overlay.appendChild(leftArrow);

    const rightArrow = document.createElement("span");
    rightArrow.classList.add("carousel-control", "right");
    rightArrow.innerHTML = "&gt;";
    rightArrow.addEventListener("click", function () {
      index = (index + 1) % galleryImgs.length;
      enlargedImg.src = galleryImgs[index].src;
    });
    overlay.appendChild(rightArrow);
  }

  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
      this.innerHTML = "";
    }
  });
});

// Función para abrir el modal con el video de YouTube embebido en el iframe
function openVideoModal(videoId) {
  var videoUrl = "https://www.youtube.com/embed/" + videoId;
  var iframe = document.getElementById("videoFrame");
  iframe.setAttribute("src", videoUrl);

  var btncerrar = document.querySelector(".close");
  var videoContainer = document.querySelector(".modal-content");

  if (window.innerWidth > window.innerHeight) {
    videoContainer.classList.add("with-margin");
    btncerrar.classList.add("with-margin");
  } else {
    videoContainer.classList.remove("with-margin");
    btncerrar.classList.remove("with-margin");
  }

  var modal = document.getElementById("videoModal");
  modal.style.display = "block";
}


// Función para cerrar el modal
function closeVideoModal() {
  var modal = document.getElementById("videoModal");
  var videoFrame = document.getElementById("videoFrame");

  // Detener la reproducción del video
  videoFrame.src = "";
  modal.style.display = "none";
}

document.getElementById("cerrarmodal").addEventListener("click", function (e) {
  var modal = document.getElementById("videoModal");
  var videoFrame = document.getElementById("videoFrame");
  if (e.target === this) {
    videoFrame.src = "";
    modal.style.display = "none";
  }
});

// Event listener para las miniaturas de video
var thumbnails = document.getElementsByClassName("video-thumbnail");
for (var i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", function () {
    var videoId = this.getAttribute("data-video");
    openVideoModal(videoId);
  });
}

// Event listener para cerrar el modal
var closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener("click", closeVideoModal);

// Event listener para cerrar el modal al hacer clic fuera del video
window.addEventListener("click", function (event) {
  var modal = document.getElementById("videoModal");
  if (event.target == modal) {
    closeVideoModal();
  }
});