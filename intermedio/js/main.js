// SCROLL SUAVE

function smoothScroll() {
	document.querySelectorAll("a").forEach(link => {
		link.addEventListener("click", e => {
			const href = link.getAttribute("href");

			if (href.startsWith("#")) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					target.scrollIntoView({ behavior: "smooth" });
				}
			}
		});
	});
}

// NAVBAR SCROLL

function navbarEffect() {
	const header = document.querySelector(".header");

	window.addEventListener("scroll", () => {
		header.classList.toggle("scrolled", window.scrollY > 50);
	});
}

// ANIMACIONES SCROLL

function scrollAnimations() {
	const elements = document.querySelectorAll(".hidden");

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
			}
		});
	});

	elements.forEach(el => observer.observe(el));
}

// LIGHTBOX

function lightbox() {
	const images = document.querySelectorAll(".grid img");
	const lightbox = document.getElementById("lightbox");
	const lightboxImg = document.getElementById("lightbox-img");
	const close = document.getElementById("close");

	images.forEach(img => {
		img.addEventListener("click", () => {
			lightbox.style.display = "flex";
			lightboxImg.src = img.src;
		});
	});

	close.addEventListener("click", () => {
		lightbox.style.display = "none";
	});

	lightbox.addEventListener("click", e => {
		if (e.target === lightbox) {
			lightbox.style.display = "none";
		}
	});
}

// CARRUSEL

function carousel() {
	const grid = document.querySelector(".grid");
	const next = document.getElementById("next");
	const prev = document.getElementById("prev");

	const scrollStep = 320;

	next.addEventListener("click", () => {
		grid.scrollBy({ left: scrollStep, behavior: "smooth" });
	});

	prev.addEventListener("click", () => {
		grid.scrollBy({ left: -scrollStep, behavior: "smooth" });
	});
}

// FORMULARIO

function formHandler() {
	const form = document.getElementById("form");
	const status = document.getElementById("status");

	form.addEventListener("submit", function(e) {
		e.preventDefault();

		const name = form.name.value.trim();
		const email = form.email.value.trim();
		const message = form.message.value.trim();

		if (name.length < 3) {
			status.textContent = "Nombre muy corto";
			return;
		}

		if (!email.includes("@")) {
			status.textContent = "Email inválido";
			return;
		}

		if (message.length < 10) {
			status.textContent = "Mensaje muy corto";
			return;
		}

		status.textContent = "Enviando...";

		emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
			name,
			email,
			message
		})
		.then(() => {
			status.textContent = "Mensaje enviado ✅";
			form.reset();
		})
		.catch(() => {
			status.textContent = "Error ❌";
		});
	});
}


// INIT

document.addEventListener("DOMContentLoaded", () => {
	smoothScroll();
	navbarEffect();
	scrollAnimations();
	lightbox();
	carousel();
	formHandler();
});