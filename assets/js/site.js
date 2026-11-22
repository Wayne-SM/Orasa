/* ORASA — site interactions: showcase carousel + full menu browser */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Showcase carousel                                                   */
  /* ------------------------------------------------------------------ */

  var FAVOURITES = [
    {
      name: "Halloween at ORASA",
      note: "Pumpkins, ghosts and a few unexpected guests",
      image: "assets/img/instagram-halloween-at-orasa.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DfICspoGI2N/"
    },
    {
      name: "Coconut Pasta",
      note: "A little coconut comfort",
      image: "assets/img/instagram-coconut-pasta.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/De6T0ITGBUG/"
    },
    {
      name: "Podi Pasta",
      note: "Podi meets pasta",
      image: "assets/img/instagram-podi-pasta.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DeeDLMmmAhg/"
    },
    {
      name: "Podi Tossed Fries",
      note: "Served the ORASA way",
      image: "assets/img/instagram-podi-tossed-fries.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DeJbpt4GOpD/"
    },
    {
      name: "Korean Chilli Bao",
      note: "Soft · bold · bright with heat",
      image: "assets/img/instagram-korean-chilli-bao.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DdrE5FFGMGQ/"
    },
    {
      name: "Middle East Sliders",
      note: "Three sliders · one serious craving",
      image: "assets/img/instagram-middle-east-sliders.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DdjN7k2GJwK/"
    },
    {
      name: "Mezze Platter",
      note: "Made in-house at ORASA",
      image: "assets/img/instagram-mezze-platter.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DdbvE-RmMkk/"
    },
    {
      name: "Coconut Cheesecake",
      note: "Made in-house · served the ORASA way",
      image: "assets/img/instagram-coconut-cheesecake.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DdXypnOk55f/"
    },
    {
      name: "Vinayaka Chavithi",
      note: "Warm wishes from all of us",
      image: "assets/img/instagram-vinayaka-chavithi-orasa.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DdPZlqAT_-a/"
    },
    {
      name: "ORASA Signature Paneer Crunch",
      note: "The crunch is the point",
      image: "assets/img/instagram-orasa-signature-paneer-crunch.jpg",
      instagramUrl: "https://www.instagram.com/orasa.coffee/p/DdMOu7BmODh/"
    }
  ];

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function initCarousel() {
    var shell = document.querySelector("[data-carousel]");
    if (!shell) return;

    var track = shell.querySelector(".showcase-track");
    var prevButton = shell.querySelector("[data-carousel-prev]");
    var nextButton = shell.querySelector("[data-carousel-next]");
    if (!track) return;

    var paused = false;
    var lightboxOpen = false;
    var timer = null;

    function instagramIcon() {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("aria-hidden", "true");
      svg.innerHTML =
        '<rect x="3" y="3" width="18" height="18" rx="5"></rect>' +
        '<circle cx="12" cy="12" r="4.25"></circle>' +
        '<circle cx="17.4" cy="6.7" r="1" class="instagram-dot"></circle>';
      return svg;
    }

    function buildCard(item, index) {
      var card = document.createElement("article");
      card.className = "showcase-card instagram-card";
      card.setAttribute("role", "listitem");
      if (index >= FAVOURITES.length) card.setAttribute("aria-hidden", "true");

      var button = document.createElement("button");
      button.type = "button";
      button.className = "showcase-image-button";
      button.setAttribute("aria-label", "Enlarge " + item.name + " image");

      var img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name + ", " + item.note;
      img.loading = "lazy";
      img.decoding = "async";
      button.appendChild(img);
      button.addEventListener("click", function () {
        openLightbox(item);
      });

      var link = document.createElement("a");
      link.className = "carousel-instagram-link";
      link.href = item.instagramUrl;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.setAttribute("aria-label", "Open " + item.name + " on Instagram");
      link.title = "View on Instagram";
      link.appendChild(instagramIcon());

      card.appendChild(button);
      card.appendChild(link);
      return card;
    }

    FAVOURITES.concat(FAVOURITES).forEach(function (item, index) {
      track.appendChild(buildCard(item, index));
    });

    function cards() {
      return track.querySelectorAll(".showcase-card");
    }

    function offsetOf(index) {
      var card = cards()[index];
      return card ? card.offsetLeft : 0;
    }

    function currentIndex() {
      var best = 0;
      var distance = Infinity;
      Array.prototype.forEach.call(cards(), function (card, index) {
        var delta = Math.abs(card.offsetLeft - track.scrollLeft);
        if (delta < distance) {
          distance = delta;
          best = index;
        }
      });
      return best;
    }

    function scrollToIndex(index, behavior) {
      track.scrollTo({ left: offsetOf(index), behavior: behavior || "auto" });
    }

    function next() {
      var index = currentIndex();
      if (index >= FAVOURITES.length) {
        index -= FAVOURITES.length;
        scrollToIndex(index, "auto");
      }
      var target = index + 1;
      scrollToIndex(target, "smooth");
      if (target === FAVOURITES.length) {
        window.setTimeout(function () {
          scrollToIndex(0, "auto");
        }, 700);
      }
    }

    function prev() {
      var index = currentIndex();
      if (index <= 0) {
        index = FAVOURITES.length;
        scrollToIndex(index, "auto");
      }
      scrollToIndex(index - 1, "smooth");
    }

    if (prevButton) prevButton.addEventListener("click", prev);
    if (nextButton) nextButton.addEventListener("click", next);

    function startAutoplay() {
      stopAutoplay();
      if (paused || lightboxOpen || reducedMotion.matches) return;
      timer = window.setInterval(next, 4200);
    }

    function stopAutoplay() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function pause() {
      paused = true;
      stopAutoplay();
    }

    function resume() {
      paused = false;
      startAutoplay();
    }

    shell.addEventListener("mouseenter", pause);
    shell.addEventListener("mouseleave", resume);
    shell.addEventListener("focusin", pause);
    shell.addEventListener("focusout", function (event) {
      if (!shell.contains(event.relatedTarget)) resume();
    });

    /* Drag / swipe is left to native touch scrolling */

    /* Lightbox */
    var lightbox = null;
    var lastFocused = null;

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.remove();
      lightbox = null;
      lightboxOpen = false;
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
      startAutoplay();
    }

    function openLightbox(item) {
      closeLightbox();
      lastFocused = document.activeElement;
      stopAutoplay();
      lightboxOpen = true;

      var overlay = document.createElement("div");
      overlay.className = "carousel-lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", item.name);
      overlay.addEventListener("click", closeLightbox);

      var close = document.createElement("button");
      close.type = "button";
      close.className = "carousel-lightbox-close";
      close.setAttribute("aria-label", "Close enlarged image");
      close.innerHTML = "&times;";
      close.addEventListener("click", closeLightbox);

      var img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name + ", " + item.note;
      img.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      overlay.appendChild(close);
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      close.focus();
      lightbox = overlay;
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeLightbox();
      if (!lightbox) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    });

    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener("change", startAutoplay);
    }

    startAutoplay();
  }

  /* ------------------------------------------------------------------ */
  /* Full menu browser                                                   */
  /* ------------------------------------------------------------------ */

  var DESSERT_ORDER = [
    "Cakes & Pastries",
    "Croissants & Danishes",
    "Continental Desserts",
    "Churros",
    "Bomboloni",
    "Gelato"
  ];
  var DRINK_ORDER = [
    "Signature Drinks",
    "Espresso",
    "Pour Over",
    "Cold Brew",
    "Matcha",
    "Ube Drinks",
    "Hot Chocolate",
    "Frappe & Milkshakes",
    "Sparkling Drinks"
  ];
  var FOOD_ORDER = [
    "All Day Breakfast",
    "Smoothie Bowls",
    "Salads",
    "Soups",
    "Bagels",
    "Small Plates",
    "French Fries",
    "Sandwiches",
    "Burgers",
    "Pizza",
    "Pasta",
    "Pan Asian",
    "Sushi",
    "Mains",
    "Cheese Offerings"
  ];

  var DESSERT_CATEGORIES = new Set(DESSERT_ORDER);
  var DRINK_CATEGORIES = new Set(DRINK_ORDER);

  function menuGroup(category) {
    if (DESSERT_CATEGORIES.has(category)) return "Desserts";
    if (DRINK_CATEGORIES.has(category)) return "Drinks";
    return "Food";
  }

  function initMenu() {
    var tabs = document.querySelector("[data-menu-tabs]");
    var body = document.querySelector("[data-menu-body]");
    if (!tabs || !body) return;

    var items = Array.isArray(window.ORASA_MENU) ? window.ORASA_MENU : [];
    var activeGroup = "Drinks";

    function countFor(group) {
      return items.filter(function (item) {
        return menuGroup(item.category) === group;
      }).length;
    }

    function renderTabs() {
      tabs.innerHTML = "";
      ["Drinks", "Food", "Desserts"].forEach(function (group) {
        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", activeGroup === group ? "true" : "false");
        if (activeGroup === group) button.className = "active";

        var label = document.createElement("span");
        label.textContent = group + " menu";
        var count = document.createElement("small");
        var total = countFor(group);
        count.textContent = total + " item" + (total === 1 ? "" : "s");

        button.appendChild(label);
        button.appendChild(count);
        button.addEventListener("click", function () {
          if (activeGroup === group) return;
          activeGroup = group;
          renderTabs();
          renderBody();
        });

        tabs.appendChild(button);
      });
    }

    function renderBody() {
      body.innerHTML = "";
      body.className = "menu-categories" + (activeGroup === "Desserts" ? " is-dessert" : "");

      var groups = new Map();
      items.forEach(function (item) {
        if (menuGroup(item.category) !== activeGroup) return;
        if (!groups.has(item.category)) groups.set(item.category, []);
        groups.get(item.category).push(item);
      });

      var order = activeGroup === "Drinks" ? DRINK_ORDER : activeGroup === "Food" ? FOOD_ORDER : DESSERT_ORDER;
      var entries = Array.from(groups.entries());
      if (order.length) {
        entries.sort(function (a, b) {
          var ai = order.indexOf(a[0]);
          var bi = order.indexOf(b[0]);
          return (ai === -1 ? order.length : ai) - (bi === -1 ? order.length : bi);
        });
      }

      if (!entries.length) {
        var loading = document.createElement("p");
        loading.className = "menu-loading";
        loading.textContent = "Preparing today's menu…";
        body.appendChild(loading);
      } else {
        entries.forEach(function (entry, index) {
          body.appendChild(buildCategory(entry[0], entry[1], index === 0));
        });
      }

      if (activeGroup === "Drinks") body.appendChild(buildAddOns());
    }

    function buildCategory(name, categoryItems, open) {
      var details = document.createElement("details");
      if (open) details.open = true;

      var summary = document.createElement("summary");
      var title = document.createElement("span");
      title.textContent = name;
      var count = document.createElement("small");
      count.textContent = categoryItems.length + " item" + (categoryItems.length === 1 ? "" : "s");
      var plus = document.createElement("b");
      plus.setAttribute("aria-hidden", "true");
      plus.textContent = "+";

      summary.appendChild(title);
      summary.appendChild(count);
      summary.appendChild(plus);
      details.appendChild(summary);

      var list = document.createElement("div");
      list.className = "category-items";

      categoryItems.forEach(function (item) {
        var article = document.createElement("article");
        var text = document.createElement("div");
        var heading = document.createElement("h3");
        heading.textContent = item.name;
        text.appendChild(heading);
        if (item.description) {
          var description = document.createElement("p");
          description.textContent = item.description;
          text.appendChild(description);
        }
        article.appendChild(text);
        list.appendChild(article);
      });

      details.appendChild(list);
      return details;
    }

    function buildAddOns() {
      var details = document.createElement("details");
      details.className = "menu-add-ons";

      var summary = document.createElement("summary");
      var title = document.createElement("span");
      title.textContent = "Alternative Milk & Syrups";
      var count = document.createElement("small");
      count.textContent = "10 add-ons";
      var plus = document.createElement("b");
      plus.setAttribute("aria-hidden", "true");
      plus.textContent = "+";
      summary.appendChild(title);
      summary.appendChild(count);
      summary.appendChild(plus);

      var kicker = document.createElement("p");
      kicker.className = "category-kicker";
      kicker.textContent = "Available as add-ons to selected drinks.";

      var groups = document.createElement("div");
      groups.className = "add-on-groups";

      groups.appendChild(
        addOnGroup("alternative-milk-title", "Alternative Milk", "Almond Milk · Oat Milk · Coconut Milk")
      );
      groups.appendChild(
        addOnGroup("syrups-title", "Syrups", "Vanilla · Caramel · Chocolate · White Chocolate · Hazelnut · Rose · Irish")
      );

      details.appendChild(summary);
      details.appendChild(kicker);
      details.appendChild(groups);
      return details;
    }

    function addOnGroup(id, heading, text) {
      var section = document.createElement("section");
      section.setAttribute("aria-labelledby", id);
      var h3 = document.createElement("h3");
      h3.id = id;
      h3.textContent = heading;
      var p = document.createElement("p");
      p.textContent = text;
      section.appendChild(h3);
      section.appendChild(p);
      return section;
    }

    renderTabs();
    renderBody();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initCarousel();
      initMenu();
    });
  } else {
    initCarousel();
    initMenu();
  }
})();
