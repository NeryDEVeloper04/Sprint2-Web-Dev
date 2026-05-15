// 1. SLIDESHOW — phone hero

const slides = [
  { src: "img/auto.png",     label: "✦ Auto"      },
  { src: "img/estudo.png",   label: "📄 Estudo"   },
  { src: "img/pet.png",      label: "🐾 Pet"      },
  { src: "img/retrato.png",  label: "👤 Retrato"  },
  { src: "img/paisagem.png", label: "🏔 Paisagem" },
  { src: "img/manual.png",   label: "⊞ Manual"    },
];

let currentSlide = 0;
const phoneScreen = document.querySelector(".phone-screen");

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  if (phoneScreen) {
    phoneScreen.src = slides[currentSlide].src;
  }
}

setInterval(() => goToSlide(currentSlide + 1), 3500);



// 2. PROMPT DE BOAS-VINDAS

window.addEventListener("load", function () {
  const visited = sessionStorage.getItem("lensflow_visited");
  if (!visited) {
    sessionStorage.setItem("lensflow_visited", "1");
    const nome = prompt("Bem-vindo à LensFlow!\nQual é o seu nome?");
    if (nome && nome.trim() !== "") {
      alert("Olá, " + nome.trim() + "! 📸 Explore os modos da câmera abaixo.");
    }
  }
});

// 3. VALIDAÇÃO DE LOGIN / CADASTRO

function getUsers() {
  return JSON.parse(localStorage.getItem("lensflow_users") || "[]");
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("lensflow_users", JSON.stringify(users));
}

function cadastrar(nome, email, senha, confirma) {
  if (!nome || nome.trim().length < 3) {
    alert("Nome deve ter ao menos 3 caracteres.");
    return false;
  }
  if (!email || !email.includes("@") || !email.includes(".")) {
    alert("E-mail inválido.");
    return false;
  }
  if (!senha || senha.length < 8) {
    alert("Senha deve ter ao menos 8 caracteres.");
    return false;
  }
  if (senha !== confirma) {
    alert("As senhas não coincidem.");
    return false;
  }
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    alert("Este e-mail já está cadastrado.");
    return false;
  }
  saveUser({ nome: nome.trim(), email: email.trim(), senha });
  alert("Conta criada com sucesso! Bem-vindo, " + nome.trim() + "!");
  return true;
}

function login(email, senha) {
  if (!email || !senha) {
    alert("Preencha e-mail e senha.");
    return false;
  }
  const users = getUsers();
  const user = users.find(u => u.email === email && u.senha === senha);
  if (!user) {
    alert("E-mail ou senha incorretos.");
    return false;
  }
  sessionStorage.setItem("lensflow_session", JSON.stringify(user));
  alert("Bem-vindo de volta, " + user.nome + "! 📸");
  return true;
}

const btnLogin = document.getElementById("btn-login");
if (btnLogin) {
  btnLogin.addEventListener("click", function () {
    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-password").value;
    login(email, senha);
  });
}

const btnRegister = document.getElementById("btn-register");
if (btnRegister) {
  btnRegister.addEventListener("click", function () {
    const nome     = document.getElementById("reg-name").value;
    const email    = document.getElementById("reg-email").value;
    const senha    = document.getElementById("reg-password").value;
    const confirma = document.getElementById("reg-confirm").value;
    cadastrar(nome, email, senha, confirma);
  });
}



// 4. BOTÃO VOLTAR AO TOPO

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", function () {
    backToTop.style.display = window.scrollY > 400 ? "block" : "none";
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 5. SMOOTH SCROLL nos links da nav

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 6. ANIMAÇÃO DE ENTRADA DAS SEÇÕES (scroll)

document.querySelectorAll(".mode-row, .spec-item").forEach(function (el) {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".mode-row, .spec-item").forEach(function (el) {
  revealObserver.observe(el);
});