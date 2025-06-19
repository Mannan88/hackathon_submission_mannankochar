
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // Adjust for navbar height
        const top = target.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const keywords = document.querySelectorAll('.keyword');
    let activeCardGroup = new Set();
    let hideTimeout = null;

    keywords.forEach(keyword => {
        keyword.addEventListener('mouseenter', () => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }

            const targetGroup = keyword.dataset.targetGroup;
            const cardsInGroup = document.querySelectorAll(`[id^="${targetGroup}-card-"]`);

            activeCardGroup.forEach(cardId => {
                if (!cardId.startsWith(targetGroup)) {
                    const cardToHide = document.getElementById(cardId);
                    if (cardToHide) {
                        cardToHide.classList.remove('active');
                    }
                }
            });
            activeCardGroup.clear();

            if (cardsInGroup.length > 0) {
                cardsInGroup.forEach(targetCard => {
                    targetCard.classList.add('active');
                    activeCardGroup.add(targetCard.id);
                });
            }
        });

        keyword.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                activeCardGroup.forEach(cardId => {
                    const cardToHide = document.getElementById(cardId);
                    if (cardToHide) {
                        cardToHide.classList.remove('active');
                    }
                });
                activeCardGroup.clear();
            }, 300);
        });
    });

    document.querySelectorAll('.popup-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
        });

        card.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                activeCardGroup.forEach(cardId => {
                    const cardToHide = document.getElementById(cardId);
                    if (cardToHide) {
                        cardToHide.classList.remove('active');
                    }
                });
                activeCardGroup.clear();
            }, 300);
        });
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            keywords.forEach(keyword => {
                const targetGroup = keyword.dataset.targetGroup;
                if (Array.from(activeCardGroup).some(id => id.startsWith(targetGroup))) {
                    const cardsToReposition = document.querySelectorAll(`[id^="${targetGroup}-card-"]`);
                    cardsToReposition.forEach(card => card.classList.remove('active'));
                    activeCardGroup.clear();
                    keyword.dispatchEvent(new Event('mouseenter'));
                }
            });
        }, 250);
    });
});

const brands = [
  ["perplexity.png", "supercell.png", "monzo.png", "raycast.png", "retool.png", "mercury.png"],
  ["spotify.jpg", "airbnb.png", "discord.png", "stripe.png", "figma.png", "twitch.png"],
  ["slack.png", "notion.png", "openai.png", "dropbox.png", "netflix.png", "uber.png"]
];

const carousel = document.getElementById("carousel");
let index = 0;

brands[0].forEach((logo) => {
  const container = document.createElement("div");
  container.className = "logo-wrapper";

  const img = document.createElement("img");
  img.src = `assets/${logo}`;
  img.alt = logo.split(".")[0];
  img.classList.add("visible");

  container.appendChild(img);
  carousel.appendChild(container);
});

setInterval(() => {
  index = (index + 1) % brands.length;
  const newSet = brands[index];
  const logoWrappers = document.querySelectorAll(".logo-wrapper");

  logoWrappers.forEach((wrapper, i) => {
    const oldImg = wrapper.querySelector("img");

    setTimeout(() => {
      oldImg.classList.remove("visible");

      setTimeout(() => {
        oldImg.src = `assets/logos/${newSet[i]}`;
        oldImg.alt = newSet[i].split(".")[0];

        setTimeout(() => {
          oldImg.classList.add("visible");
        }, 50);
      }, 400); 
    }, i * 100); 
  });
}, 3000);

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => loader.style.display = 'none', 500);
  }, 2000);
});

  const toggleBtn = document.getElementById("darkModeToggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

