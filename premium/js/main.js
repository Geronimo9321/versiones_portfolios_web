document.addEventListener("DOMContentLoaded", () => {

	// ==========================
	// MENU MOBILE
	// ==========================
	const menuToggle = document.getElementById("menu-toggle");
	const nav = document.querySelector(".nav");

	menuToggle.addEventListener("click", () => {
		nav.classList.toggle("active");
	});

	// ==========================
	// SCROLL SUAVE
	// ==========================
	document.querySelectorAll("a[href^='#']").forEach(link => {
		link.addEventListener("click", e => {
			e.preventDefault();
			const target = document.querySelector(link.getAttribute("href"));
			if (target) target.scrollIntoView({ behavior: "smooth" });
		});
	});

	// ==========================
	// ANIMACIONES AL SCROLL
	// ==========================
	const hiddenElements = document.querySelectorAll(".hidden");

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
			}
		});
	});

	hiddenElements.forEach(el => observer.observe(el));

	// ==========================
	// CARRUSEL
	// ==========================
	const carousel = document.getElementById("carousel");
	const next = document.getElementById("next");
	const prev = document.getElementById("prev");

	const scrollAmount = 320;

	next.addEventListener("click", () => {
		carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
	});

	prev.addEventListener("click", () => {
		carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
	});

	// ==========================
	// FILTROS
	// ==========================
	const filterButtons = document.querySelectorAll(".filtro-btn");
	const items = document.querySelectorAll(".carousel .item");

	filterButtons.forEach(btn => {
		btn.addEventListener("click", () => {

			// activar botón
			filterButtons.forEach(b => b.classList.remove("active"));
			btn.classList.add("active");

			const filter = btn.dataset.filter;

			items.forEach(item => {
				if (filter === "all" || item.classList.contains(filter)) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				}
			});
		});
	});

	// ==========================
	// LIGHTBOX + SLIDER
	// ==========================
	const lightbox = document.getElementById("lightbox");
	const lightboxImg = document.getElementById("lightbox-img");
	const close = document.getElementById("close");
	const nextLightbox = document.getElementById("next-lightbox");
	const prevLightbox = document.getElementById("prev-lightbox");

	let currentIndex = 0;
	const images = Array.from(document.querySelectorAll(".carousel .item"));

	function showImage(index) {
		if (images[index].style.display === "none") {
			// saltar imágenes ocultas por filtro
			if (index < images.length - 1) showImage(index + 1);
			else if (index > 0) showImage(index - 1);
			return;
		}
		currentIndex = index;
		lightboxImg.src = images[currentIndex].src;
	}

	images.forEach((img, index) => {
		img.addEventListener("click", () => {
			lightbox.style.display = "flex";
			showImage(index);
		});
	});

	nextLightbox.addEventListener("click", () => {
		let nextIndex = currentIndex + 1;
		if (nextIndex >= images.length) nextIndex = 0;
		showImage(nextIndex);
	});

	prevLightbox.addEventListener("click", () => {
		let prevIndex = currentIndex - 1;
		if (prevIndex < 0) prevIndex = images.length - 1;
		showImage(prevIndex);
	});

	close.addEventListener("click", () => {
		lightbox.style.display = "none";
	});

	lightbox.addEventListener("click", e => {
		if (e.target === lightbox) {
			lightbox.style.display = "none";
		}
	});

	document.addEventListener("keydown", e => {
		if (e.key === "Escape") lightbox.style.display = "none";
	});

});

// ==========================
// LIGHTBOX
// ==========================
const images = document.querySelectorAll(".carousel .item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev-lightbox");
const nextBtn = document.getElementById("next-lightbox");

let currentIndex = 0;

// ABRIR IMAGEN
images.forEach((img, index) => {
	img.addEventListener("click", () => {
		currentIndex = index;
		showImage();
		lightbox.style.display = "flex";
	});
});

// MOSTRAR IMAGEN
function showImage() {
	lightboxImg.src = images[currentIndex].src;
}

// SIGUIENTE
nextBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	currentIndex = (currentIndex + 1) % images.length;
	showImage();
});

// ANTERIOR
prevBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	currentIndex = (currentIndex - 1 + images.length) % images.length;
	showImage();
});

// CERRAR CON X
closeBtn.addEventListener("click", () => {
	lightbox.style.display = "none";
});

// CERRAR HACIENDO CLICK FUERA
lightbox.addEventListener("click", (e) => {
	if (e.target === lightbox) {
		lightbox.style.display = "none";
	}
});

// CERRAR CON ESC
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		lightbox.style.display = "none";
	}
});