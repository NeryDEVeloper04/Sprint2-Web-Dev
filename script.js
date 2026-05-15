
// 1. SLIDESHOW — troca a imagem do phone hero automaticamente

const slides = [
  "img/auto.png",
  "img/estudo.png",
  "img/pet.png",
  "img/retrato.png",
  "img/paisagem.png",
  "img/manual.png"
];

let indiceAtual = 0;
const phoneScreen = document.querySelector(".phone-screen");

function proximoSlide() {
  indiceAtual = (indiceAtual + 1) % slides.length;
  if (phoneScreen) {
    phoneScreen.src = slides[indiceAtual];
  }
}

setInterval(proximoSlide, 3000);


// 2. PROMPT DE BOAS-VINDAS
//    Requisito: Alertas e prompts
window.addEventListener("load", function () {
  const nome = prompt("Bem-vindo à LensFlow! Qual é o seu nome?");
  if (nome && nome.trim() !== "") {
    alert("Olá, " + nome.trim() + "! Explore os modos da câmera abaixo.");
  }
});


// 3. FORMULÁRIO DE LOGIN — criado e inserido via JS no DOM


// Cria o formulário dinamicamente
const formulario = document.createElement("div");
formulario.id = "form-login";
formulario.innerHTML =
  "<h3>Login</h3>" +
  "<input type='text' id='campo-nome' placeholder='Seu nome' />" +
  "<input type='email' id='campo-email' placeholder='Seu e-mail' />" +
  "<input type='password' id='campo-senha' placeholder='Senha' />" +
  "<button id='btn-entrar'>Entrar</button>" +
  "<p id='msg-login'></p>";

// Insere o formulário antes do footer
const footer = document.querySelector("footer");
document.body.insertBefore(formulario, footer);

// Evento do botão de login
document.getElementById("btn-entrar").addEventListener("click", function () {
  const nome  = document.getElementById("campo-nome").value.trim();
  const email = document.getElementById("campo-email").value.trim();
  const senha = document.getElementById("campo-senha").value;
  const msg   = document.getElementById("msg-login");

  // Validações
  if (nome === "") {
    msg.textContent = "Por favor, informe seu nome.";
    msg.style.color = "red";
    return;
  }
  if (email === "" || !email.includes("@")) {
    msg.textContent = "Informe um e-mail válido.";
    msg.style.color = "red";
    return;
  }
  if (senha.length < 6) {
    msg.textContent = "A senha deve ter ao menos 6 caracteres.";
    msg.style.color = "red";
    return;
  }

  msg.textContent = "Login realizado com sucesso! Bem-vindo, " + nome + ".";
  msg.style.color = "green";
});


// 4. BOTÃO — adiciona um botão "Voltar ao topo" via JS

const btnTopo = document.createElement("button");
btnTopo.textContent = "↑ Topo";
btnTopo.id = "btn-topo";
document.body.appendChild(btnTopo);

// Mostra o botão só depois de rolar um pouco
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
});

// Clique sobe a página
btnTopo.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Estilo básico do botão
btnTopo.style.display    = "none";
btnTopo.style.position   = "fixed";
btnTopo.style.bottom     = "30px";
btnTopo.style.right      = "30px";
btnTopo.style.padding    = "10px 16px";
btnTopo.style.background = "#a50000";
btnTopo.style.color      = "#fff";
btnTopo.style.border     = "none";
btnTopo.style.borderRadius = "8px";
btnTopo.style.cursor     = "pointer";
btnTopo.style.fontSize   = "14px";


// 5. SMOOTH SCROLL nos links da nav

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    const alvo = document.querySelector(this.getAttribute("href"));
    if (alvo) {
      e.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// 6. ANIMAÇÃO DE ENTRADA DAS SEÇÕES ao rolar

document.querySelectorAll(".mode-row, .spec-item").forEach(function (el) {
  el.style.opacity   = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".mode-row, .spec-item").forEach(function (el) {
  observer.observe(el);
});