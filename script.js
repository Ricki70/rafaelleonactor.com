document.addEventListener("DOMContentLoaded", function() {
    const galleryImgs = document.querySelectorAll(".gallery-img");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const videoThumbnails = document.querySelectorAll(".video-thumbnail");
    const videoModal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const closeBtn = document.querySelector(".close");
  
    videoThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function() {
        const videoSrc = this.dataset.video;
        openVideoModal(videoSrc);
      });
  
    galleryImgs.forEach((img, index) => {
      img.addEventListener("click", function() {
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
      leftArrow.addEventListener("click", function() {
        index = (index - 1 + galleryImgs.length) % galleryImgs.length;
        enlargedImg.src = galleryImgs[index].src;
      });
      overlay.appendChild(leftArrow);
  
      const rightArrow = document.createElement("span");
      rightArrow.classList.add("carousel-control", "right");
      rightArrow.innerHTML = "&gt;";
      rightArrow.addEventListener("click", function() {
        index = (index + 1) % galleryImgs.length;
        enlargedImg.src = galleryImgs[index].src;
      });
      overlay.appendChild(rightArrow);
    }
  
    overlay.addEventListener("click", function(e) {
      if (e.target === this) {
        this.style.display = "none";
        this.innerHTML = "";
      }
    });
  });




  
    function openVideoModal(src) {
      videoFrame.querySelector("source").src = src;
      videoFrame.load(); // Recargar el video para actualizar la fuente
      videoModal.style.display = "block";
    }
  
    closeBtn.addEventListener("click", function() {
        alert("prueba");
      videoFrame.pause(); // Pausar el video al cerrar la modal
      videoModal.style.display = "none";
    });
  
    window.addEventListener("click", function(event) {
      if (event.target === videoModal) {
        videoFrame.pause(); // Pausar el video al hacer clic fuera de la modal
        videoModal.style.display = "none";
      }
    });
  });