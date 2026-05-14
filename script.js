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
