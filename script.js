/**

 * Funcionalidades:
 *  1. Slideshow automático no hero
 *  2. Prompt de boas-vindas + alert personalizado
 *  3. Formulário de login criado via JS + validação completa
 *  4. Botão "Voltar ao topo" criado via JS
 *  5. Smooth scroll nos links âncora
 *  6. Animação de entrada das seções via IntersectionObserver
 */

document.addEventListener("DOMContentLoaded", function () {

  /*  1. SLIDESHOW */

  var slides = [
    "img/auto.png",
    "img/estudo.png",
    "img/pet.png",
    "img/retrato.png",
    "img/paisagem.png",
    "img/manual.png"
  ];

  var indiceAtual = 0;
  var heroSlide = document.getElementById("hero-slide");

  function proximoSlide() {
    if (!heroSlide) return;

    heroSlide.style.opacity = "0";

    setTimeout(function () {
      indiceAtual = (indiceAtual + 1) % slides.length;
      heroSlide.src = slides[indiceAtual];

      heroSlide.onload = function () {
        heroSlide.style.opacity = "1";
      };

      heroSlide.onerror = function () {
        heroSlide.style.opacity = "1";
      };
    }, 400);
  }

  if (heroSlide) {
    heroSlide.style.transition = "opacity 0.4s ease";
    heroSlide.style.opacity    = "1";
  }

  setInterval(proximoSlide, 3000);


  /* PROMPT DE BOAS-VINDAS*/
  var nome = prompt("Bem-vindo à LensFlow! Qual é o seu nome?");

  if (nome && nome.trim() !== "") {
    alert("Olá, " + nome.trim() + "! Explore os modos da câmera abaixo.");
  }


  /*  3. FORMULÁRIO DE LOGIN */

  // Cria o container do formulário
  var formLogin = document.createElement("div");
  formLogin.id = "form-login";

  // Título 
  var formTitulo = document.createElement("h3");
  formTitulo.textContent = "Acesse sua conta";
  formLogin.appendChild(formTitulo);

  // Campo nome 
  var inputNome = document.createElement("input");
  inputNome.type        = "text";
  inputNome.id          = "campo-nome";
  inputNome.placeholder = "Seu nome";
  inputNome.autocomplete = "name";
  formLogin.appendChild(inputNome);

  // Campo e-mail 
  var inputEmail = document.createElement("input");
  inputEmail.type        = "email";
  inputEmail.id          = "campo-email";
  inputEmail.placeholder = "Seu e-mail";
  inputEmail.autocomplete = "email";
  formLogin.appendChild(inputEmail);

  // Campo senha 
  var inputSenha = document.createElement("input");
  inputSenha.type        = "password";
  inputSenha.id          = "campo-senha";
  inputSenha.placeholder = "Senha (mín. 6 caracteres)";
  inputSenha.autocomplete = "current-password";
  formLogin.appendChild(inputSenha);

  // Botão entrar
  var btnEntrar = document.createElement("button");
  btnEntrar.type        = "button"; // evita submit acidental
  btnEntrar.id          = "btn-entrar";
  btnEntrar.textContent = "Entrar";
  formLogin.appendChild(btnEntrar);

  //  Mensagem de feedback
  var msgLogin = document.createElement("p");
  msgLogin.id = "msg-login";
  formLogin.appendChild(msgLogin);

  //  Insere o formulário antes do footer 
  var footer = document.querySelector("footer");
  document.body.insertBefore(formLogin, footer);

  //  Função auxiliar: exibe erro num campo 
  function mostrarErro(elemento, mensagem) {
    elemento.classList.add("campo-erro");
    msgLogin.textContent  = mensagem;
    msgLogin.className    = "msg-erro";
    elemento.focus();
  }

  //  Função auxiliar: limpa estado de erro
  function limparErro(elemento) {
    elemento.classList.remove("campo-erro");
  }

  // Remove o estado de erro ao digitar
  [inputNome, inputEmail, inputSenha].forEach(function (campo) {
    campo.addEventListener("input", function () {
      limparErro(campo);
      if (msgLogin.classList.contains("msg-erro")) {
        msgLogin.textContent = "";
        msgLogin.className   = "";
      }
    });
  });

  //  Validação de e-mail via  Expressões Regulares
  function emailValido(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Evento do botão Entrar 
  btnEntrar.addEventListener("click", function () {
    var nomeVal  = inputNome.value.trim();
    var emailVal = inputEmail.value.trim();
    var senhaVal = inputSenha.value;

    // Validação em cascata: para no primeiro erro
    if (nomeVal === "") {
      mostrarErro(inputNome, "Por favor, informe seu nome.");
      return;
    }

    if (emailVal === "" || !emailValido(emailVal)) {
      mostrarErro(inputEmail, "Informe um e-mail válido (ex: voce@email.com).");
      return;
    }

    if (senhaVal.length < 6) {
      mostrarErro(inputSenha, "A senha deve ter ao menos 6 caracteres.");
      return;
    }

    // Sucesso
    msgLogin.textContent = "✓ Login realizado com sucesso! Bem-vindo, " + nomeVal + ".";
    msgLogin.className   = "msg-sucesso";

    // Limpa os campos após login
    inputNome.value  = "";
    inputEmail.value = "";
    inputSenha.value = "";
  });


  /* 4. BOTÃO HOME */
  var btnTopo = document.createElement("button");
  btnTopo.textContent   = "↑ Topo";
  btnTopo.id            = "btn-topo";
  btnTopo.setAttribute("aria-label", "Voltar ao topo da página");
  document.body.appendChild(btnTopo);

  // Mostra o botão somente após 300px de scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btnTopo.classList.add("visivel");
    } else {
      btnTopo.classList.remove("visivel");
    }
  });

  btnTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /*  5. SMOOTH SCROLL nos links âncora da nav */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var seletor = this.getAttribute("href");
      if (seletor === "#") return; // evita erro no link "#" do logo
      var alvo = document.querySelector(seletor);
      if (alvo) {
        e.preventDefault();
        alvo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  /* 6. ANIMAÇÃO DE ENTRADA DAS SEÇÕES via IntersectionObserver */

  var elementosAnimados = document.querySelectorAll(".mode-row, .spec-item");

  elementosAnimados.forEach(function (el) {
    el.classList.add("anim-oculto");
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove("anim-oculto");
        entry.target.classList.add("anim-visivel");
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.15 });

  elementosAnimados.forEach(function (el) {
    observer.observe(el);
  });

}); 