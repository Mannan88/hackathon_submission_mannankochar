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

            // Hide any currently active cards that are NOT part of the current group
            activeCardGroup.forEach(cardId => {
                if (!cardId.startsWith(targetGroup)) {
                    const cardToHide = document.getElementById(cardId);
                    if (cardToHide) {
                        cardToHide.classList.remove('active');
                    }
                }
            });
            activeCardGroup.clear(); // Clear previous active group

            if (cardsInGroup.length > 0) {
                // No more getBoundingClientRect or cardWidth/Height calculations for positioning
                // Cards are now positioned purely by CSS

                cardsInGroup.forEach(targetCard => {
                    // Just add the active class. CSS handles position, visibility, and animation.
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
                        // IMPORTANT: Cards remain in their CSS-defined positions when inactive.
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
  ["spotify.png", "airbnb.png", "discord.png", "stripe.png", "figma.png", "twitch.png"],
  ["slack.png", "notion.png", "openai.png", "dropbox.png", "netflix.png", "uber.png"]
];

const carousel = document.getElementById("carousel");
let index = 0;

brands[0].forEach((logo) => {
  const container = document.createElement("div");
  container.className = "logo-wrapper";

  const img = document.createElement("img");
  img.src = `assets/logos/${logo}`;
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

