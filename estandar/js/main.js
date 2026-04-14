//SCROLL SUAVE
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

//FORMULARIO EMAILJS
const form = document.getElementById("form");
const status = document.getElementById("status");

if (form) {
	form.addEventListener("submit", function(e) {
		e.preventDefault();

		//VALIDACIÓN
		if (!form.name.value || !form.email.value || !form.message.value) {
			status.textContent = "Completa todos los campos";
			return;
		}

		status.textContent = "Enviando...";

		emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
			name: form.name.value,
			email: form.email.value,
			message: form.message.value
		})
		.then(() => {
			status.textContent = "Mensaje enviado correctamente ✅";
			form.reset();
		})
		.catch(() => {
			status.textContent = "Error al enviar ❌";
		});
	});
}