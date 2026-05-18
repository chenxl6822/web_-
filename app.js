const data = window.TOURISM_DATA;

const CHINA_BOUNDS = {
  lonMin: 73,
  lonMax: 135,
  latMin: 18,
  latMax: 54,
};

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function getFavoriteSlugs() {
  try {
    return JSON.parse(localStorage.getItem("shanhai-favorites") || "[]");
  } catch {
    return [];
  }
}

function setFavoriteSlugs(slugs) {
  localStorage.setItem("shanhai-favorites", JSON.stringify(slugs));
}

function getStoredComments() {
  try {
    return JSON.parse(localStorage.getItem("shanhai-comments") || "[]");
  } catch {
    return [];
  }
}

function setStoredComments(comments) {
  localStorage.setItem("shanhai-comments", JSON.stringify(comments));
}

function getSlugFromQuery() {
  const params = new URLSearchParams(location.search);
  return params.get("slug") || data.destinations[0].slug;
}

function getDestinationBySlug(slug) {
  return data.destinations.find((item) => item.slug === slug) || data.destinations[0];
}

function iconSvg(name) {
  const icons = {
    "map-pinned":
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.2 2.1 9 3 4 21l5.2-1 5-17.9Z"/><path d="m8.5 16.5 6 4.4 5-18.9-6-4.4"/><path d="m7.7 6.4 8 5.8"/></svg>',
    "map-pin":
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    menu:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    "arrow-right":
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>',
    heart:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    bookmark:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/></svg>',
    "bookmark-check":
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/><path d="m9 12 2 2 4-5"/></svg>',
    compass:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m14.5 9.5-2 5-5 2 2-5 5-2Z"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4 10-10"/></svg>',
    "rotate-ccw":
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v6h6"/></svg>',
    "external-link":
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v7H3V3h7"/></svg>',
    sparkles:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.7 4.5L18 9l-4.3 1.5L12 15l-1.7-4.5L6 9l4.3-1.5L12 3Z"/><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z"/></svg>',
    route:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h4a4 4 0 0 1 4 4v4"/><path d="M8 18h4a4 4 0 0 0 4-4v-2"/></svg>',
    "check-square":
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 3 3 5-6"/></svg>',
    send:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="m22 2-11 11"/></svg>',
    "trash-2":
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>',
  };
  return icons[name] || icons["map-pin"];
}

function renderLucide() {
  $$("[data-lucide]").forEach((node) => {
    const name = node.getAttribute("data-lucide");
    node.outerHTML = iconSvg(name);
  });
}

function updateFavoriteCount() {
  const el = $("[data-favorite-count]");
  if (el) el.textContent = String(getFavoriteSlugs().length);
}

function toggleFavorite(slug) {
  const favorites = getFavoriteSlugs();
  const index = favorites.indexOf(slug);
  if (index >= 0) favorites.splice(index, 1);
  else favorites.push(slug);
  setFavoriteSlugs(favorites);
}

function refreshFavoriteButtons() {
  $$("[data-favorite-slug]").forEach((btn) => {
    const slug = btn.getAttribute("data-favorite-slug");
    const active = getFavoriteSlugs().includes(slug);
    btn.innerHTML = `<i data-lucide="${active ? "bookmark-check" : "bookmark"}"></i>${active ? "已收藏" : "收藏"}`;
  });
  renderLucide();
}

function initNav() {
  const toggle = $("[data-nav-toggle]");
  const nav = $("[data-site-nav]");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function initHome() {
  const featuredGrid = $("[data-featured-grid]");
  const routeGrid = $("[data-route-grid]");
  const tagWrap = $("[data-home-tags]");

  if (featuredGrid) {
    const featured = data.destinations.filter((item) => item.featured).slice(0, 6);
    featuredGrid.innerHTML = featured
      .map(
        (item) => `
          <article class="destination-card">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            <div class="destination-card-body">
              <div class="card-topline">
                <span class="badge">${item.region}</span>
                <span class="pill"><i data-lucide="map-pin"></i>${item.city}</span>
              </div>
              <h3>${item.name}</h3>
              <p>${item.overview}</p>
              <div class="card-meta">
                <span class="chip">${item.season}</span>
                <span class="chip">${item.budget}</span>
              </div>
              <div class="card-actions">
                <a class="btn btn-primary" href="destination.html?slug=${item.slug}"><i data-lucide="arrow-right"></i>查看详情</a>
                <button class="btn btn-ghost" type="button" data-favorite-slug="${item.slug}"><i data-lucide="bookmark"></i>收藏</button>
              </div>
            </div>
          </article>`
      )
      .join("");
  }

  if (routeGrid) {
    routeGrid.innerHTML = data.routes
      .map(
        (route) => `
          <article class="route-card">
            <div class="route-card-body">
              <div class="card-topline">
                <span class="badge">${route.days}</span>
                <span class="pill">${route.type}</span>
              </div>
              <h3>${route.title}</h3>
              <p>${route.summary}</p>
              <div class="card-meta">${route.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
              <div class="card-actions">
                <a class="btn btn-ghost" href="guide.html"><i data-lucide="compass"></i>查看攻略</a>
                <a class="btn btn-primary" href="destinations.html?q=${encodeURIComponent(
                  (route.slugs[0] && getDestinationBySlug(route.slugs[0]).name) || route.summary
                )}"><i data-lucide="search"></i>找地点</a>
              </div>
            </div>
          </article>`
      )
      .join("");
  }

  if (tagWrap) {
    tagWrap.innerHTML = data.guideTags.map((tag) => `<span class="chip">${tag}</span>`).join("");
  }

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-favorite-slug]");
    if (!btn) return;
    toggleFavorite(btn.getAttribute("data-favorite-slug"));
    refreshFavoriteButtons();
    updateFavoriteCount();
  });

  renderLucide();
}

function buildCard(item) {
  const isFavorite = getFavoriteSlugs().includes(item.slug);
  return `
    <article class="destination-card">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="destination-card-body">
        <div class="card-topline">
          <span class="badge">${item.region}</span>
          <span class="pill">${item.tag}</span>
        </div>
        <h3>${item.name}</h3>
        <p>${item.overview}</p>
        <div class="card-meta">
          <span class="chip">${item.season}</span>
          <span class="chip">${item.duration}</span>
          <span class="chip">${item.budget}</span>
        </div>
        <div class="card-actions">
          <a class="btn btn-primary" href="destination.html?slug=${item.slug}"><i data-lucide="arrow-right"></i>看详情</a>
          <button class="btn btn-ghost" type="button" data-favorite-slug="${item.slug}">
            <i data-lucide="${isFavorite ? "bookmark-check" : "bookmark"}"></i>
            ${isFavorite ? "已收藏" : "收藏"}
          </button>
        </div>
      </div>
    </article>`;
}

function initDestinations() {
  const grid = $("[data-destination-grid]");
  const count = $("[data-destination-count]");
  const search = $("[data-search]");
  const region = $("[data-region]");
  const sort = $("[data-sort]");
  const reset = $("[data-reset-filters]");
  const tagGroup = $("[data-tag-filters]");
  const params = new URLSearchParams(location.search);

  const state = {
    q: (params.get("q") || search?.value || "").trim(),
    region: "all",
    sort: "featured",
    tag: "全部",
  };

  if (search) search.value = state.q;

  if (tagGroup) {
    const tags = ["全部", ...new Set(data.destinations.map((item) => item.tag))];
    tagGroup.innerHTML = tags
      .map((tag) => `<button class="chip ${tag === "全部" ? "active" : ""}" type="button" data-tag="${tag}">${tag}</button>`)
      .join("");
  }

  function applyFilters() {
    let items = data.destinations.slice();
    const q = state.q.toLowerCase();

    if (q) {
      items = items.filter((item) => {
        const haystack = [
          item.name,
          item.city,
          item.province,
          item.region,
          item.tag,
          item.overview,
          item.highlights.map((h) => h.name).join(" "),
          item.foods.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    if (state.region !== "all") {
      items = items.filter((item) => item.region === state.region);
    }

    if (state.tag !== "全部") {
      items = items.filter((item) => item.tag === state.tag);
    }

    if (state.sort === "popular") {
      items.sort((a, b) => b.popularity - a.popularity);
    } else if (state.sort === "budget") {
      items.sort((a, b) => parseInt(a.budget, 10) - parseInt(b.budget, 10));
    } else if (state.sort === "alphabet") {
      items.sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));
    } else {
      items.sort((a, b) => Number(b.featured) - Number(a.featured) || b.popularity - a.popularity);
    }

    if (grid) {
      grid.innerHTML = items.map(buildCard).join("");
      renderLucide();
      updateFavoriteCount();
    }
    if (count) count.textContent = String(items.length);
  }

  search?.addEventListener("input", (event) => {
    state.q = event.target.value;
    applyFilters();
  });
  region?.addEventListener("change", (event) => {
    state.region = event.target.value;
    applyFilters();
  });
  sort?.addEventListener("change", (event) => {
    state.sort = event.target.value;
    applyFilters();
  });
  reset?.addEventListener("click", () => {
    state.q = "";
    state.region = "all";
    state.sort = "featured";
    state.tag = "全部";
    if (search) search.value = "";
    if (region) region.value = "all";
    if (sort) sort.value = "featured";
    $$(".chip[data-tag]").forEach((chip) => chip.classList.toggle("active", chip.dataset.tag === "全部"));
    applyFilters();
  });

  tagGroup?.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-tag]");
    if (!chip) return;
    state.tag = chip.dataset.tag;
    $$(".chip[data-tag]").forEach((item) => item.classList.toggle("active", item === chip));
    applyFilters();
  });

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-favorite-slug]");
    if (!btn) return;
    toggleFavorite(btn.getAttribute("data-favorite-slug"));
    refreshFavoriteButtons();
    applyFilters();
  });

  applyFilters();
}

function initDestinationDetail() {
  const hero = $("[data-destination-hero]");
  const facts = $("[data-facts]");
  const highlights = $("[data-highlights]");
  const logistics = $("[data-logistics]");
  const nearby = $("[data-nearby]");
  const openMap = $("[data-open-map]");
  const favoriteToggle = $("[data-favorite-toggle]");
  const mapPanel = $("#spot-map");
  const destination = getDestinationBySlug(getSlugFromQuery());

  if (hero) {
    hero.innerHTML = `
      <img class="detail-hero-image" src="${destination.image}" alt="${destination.name}" />
      <div class="detail-hero-copy">
        <span class="badge">${destination.region}</span>
        <h1>${destination.name}</h1>
        <p>${destination.overview}</p>
        <div class="card-meta">
          <span class="chip">${destination.city} · ${destination.province}</span>
          <span class="chip">${destination.season}</span>
          <span class="chip">${destination.duration}</span>
          <span class="chip">${destination.budget}</span>
        </div>
      </div>`;
  }

  if (facts) {
    const entries = [
      ["地理坐标", `${destination.coordinates.lat.toFixed(6)}, ${destination.coordinates.lng.toFixed(6)}`],
      ["旅行风格", destination.tag],
      ["建议时长", destination.duration],
      ["预算参考", destination.budget],
      ["季节推荐", destination.season],
      ["人气指数", `${destination.popularity}/100`],
    ];
    facts.innerHTML = entries
      .map(
        ([label, value]) => `
          <div class="fact">
            <small>${label}</small>
            <strong>${value}</strong>
          </div>`
      )
      .join("");
  }

  if (highlights) {
    highlights.innerHTML = destination.highlights
      .map(
        (item) => `
          <div class="spot-item">
            <i data-lucide="sparkles"></i>
            <div>
              <strong>${item.name}</strong>
              <span>${item.desc}</span>
            </div>
          </div>`
      )
      .join("");
  }

  if (logistics) {
    logistics.innerHTML = `
      <div class="logistics-card">
        <h3>吃什么</h3>
        <p>${destination.foods.join(" · ")}</p>
      </div>
      <div class="logistics-card">
        <h3>怎么去</h3>
        <p>${destination.transport.join("；")}</p>
      </div>
      <div class="logistics-card">
        <h3>小贴士</h3>
        <p>${destination.tips.join("；")}</p>
      </div>`;
  }

  if (nearby) {
    nearby.innerHTML = destination.nearby
      .map(
        (spot) => `
          <div class="nearby-item">
            <i data-lucide="map-pin"></i>
            <div>
              <strong>${spot}</strong>
              <span>建议和 ${destination.name} 同行程安排</span>
            </div>
          </div>`
      )
      .join("");
  }

  if (openMap) {
    openMap.href = `https://www.openstreetmap.org/?mlat=${destination.coordinates.lat}&mlon=${destination.coordinates.lng}#map=13/${destination.coordinates.lat}/${destination.coordinates.lng}`;
  }

  if (favoriteToggle) {
    const updateLabel = () => {
      const active = getFavoriteSlugs().includes(destination.slug);
      favoriteToggle.innerHTML = `<i data-lucide="${active ? "bookmark-check" : "bookmark"}"></i>${active ? "取消收藏" : "收藏"}`;
      renderLucide();
    };
    updateLabel();
    favoriteToggle.addEventListener("click", () => {
      toggleFavorite(destination.slug);
      updateLabel();
      updateFavoriteCount();
    });
  }

  if (mapPanel) {
    const project = (coord) => {
      const x = ((coord.lng - CHINA_BOUNDS.lonMin) / (CHINA_BOUNDS.lonMax - CHINA_BOUNDS.lonMin)) * 100;
      const y = 100 - ((coord.lat - CHINA_BOUNDS.latMin) / (CHINA_BOUNDS.latMax - CHINA_BOUNDS.latMin)) * 100;
      return {
        x: Math.max(4, Math.min(96, x)),
        y: Math.max(4, Math.min(96, y)),
      };
    };

    const dots = data.destinations
      .map((item) => {
        const pos = project(item.coordinates);
        const active = item.slug === destination.slug;
        return `
          <button class="map-dot ${active ? "active" : ""}" style="left:${pos.x}%;top:${pos.y}%" type="button" title="${item.name}" aria-label="${item.name}">
            <span></span>
          </button>`;
      })
      .join("");

    const activePos = project(destination.coordinates);
    mapPanel.innerHTML = `
      <div class="map-head">
        <div>
          <strong>${destination.name}</strong>
          <span>${destination.coordinates.lat.toFixed(4)}, ${destination.coordinates.lng.toFixed(4)}</span>
        </div>
        <div class="map-legend">
          <span><i></i> 当前目的地</span>
          <span><i class="all"></i> 其他目的地</span>
        </div>
      </div>
      <div class="map-canvas">
        <div class="map-grid"></div>
        <div class="map-shape"></div>
        ${dots}
        <div class="map-note" style="left:${activePos.x}%;top:${Math.max(4, activePos.y - 18)}%">坐标点</div>
      </div>`;
  }

  renderLucide();
}

function initGuide() {
  const itinerary = $("[data-itinerary]");
  const packing = $("[data-packing]");
  const guideTags = $("[data-guide-tags]");
  const count = $("[data-guide-count]");
  const filters = $$("[data-guide-filter]");
  let activeFilter = "all";

  function renderGuide() {
    const routes = data.routes.filter((route) => activeFilter === "all" || route.type === activeFilter);
    if (count) count.textContent = String(routes.length);

    if (itinerary) {
      itinerary.innerHTML = routes
        .map(
          (route, index) => `
            <div class="timeline-item">
              <i data-lucide="route"></i>
              <div>
                <strong>${index + 1}. ${route.title}</strong>
                <div class="card-meta">${route.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
                <p>${route.summary}</p>
              </div>
            </div>`
        )
        .join("");
    }

    if (packing) {
      packing.innerHTML = data.packing
        .map(
          (item) => `
            <div class="timeline-item">
              <i data-lucide="check-square"></i>
              <div><strong>${item}</strong></div>
            </div>`
        )
        .join("");
    }

    if (guideTags) {
      guideTags.innerHTML = data.guideTags.map((tag) => `<span class="chip">${tag}</span>`).join("");
    }

    renderLucide();
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.guideFilter;
      filters.forEach((item) => item.classList.toggle("active", item === btn));
      renderGuide();
    });
  });

  renderGuide();
}

function initComments() {
  const count = $("[data-comment-count]");
  const list = $("[data-comment-list]");
  const form = $("[data-comment-form]");
  const destinationSelect = $("[data-comment-destination]");
  const clearButton = $("[data-clear-comments]");
  const stored = getStoredComments();

  if (destinationSelect) {
    destinationSelect.innerHTML = data.destinations
      .map((item) => `<option value="${item.slug}">${item.name}</option>`)
      .join("");
  }

  function allComments() {
    return [...data.comments, ...stored].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }

  function renderComments() {
    const comments = allComments();
    if (count) count.textContent = String(comments.length);
    if (list) {
      list.innerHTML = comments
        .map((item) => {
          const destination = getDestinationBySlug(item.destination);
          return `
            <article class="comment">
              <div class="comment-head">
                <strong>${item.name}</strong>
                <span class="stars" aria-label="${item.rating} 星">${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}</span>
              </div>
              <div class="meta">${item.date} · ${destination.name}</div>
              <h3>${item.title || "旅行记录"}</h3>
              <p>${item.content}</p>
            </article>`;
        })
        .join("");
    }
    renderLucide();
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const next = {
      id: Date.now(),
      name: String(formData.get("name") || "旅行者"),
      destination: String(formData.get("destination") || data.destinations[0].slug),
      rating: Number(formData.get("rating") || 5),
      title: "用户新评论",
      content: String(formData.get("content") || ""),
      date: new Date().toISOString().slice(0, 10),
    };
    stored.unshift(next);
    setStoredComments(stored);
    form.reset();
    if (destinationSelect) destinationSelect.selectedIndex = 0;
    renderComments();
  });

  clearButton?.addEventListener("click", () => {
    localStorage.removeItem("shanhai-comments");
    stored.length = 0;
    renderComments();
  });

  renderComments();
}

function initAbout() {
  const list = $("[data-source-list]");
  if (!list) return;

  list.innerHTML = data.destinations
    .map(
      (item) => `
        <article class="source-card">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="source-card-body">
            <div class="card-topline">
              <span class="badge">${item.city}</span>
              <span class="pill">${item.region}</span>
            </div>
            <h3>${item.name}</h3>
            <p>${item.sources.join("；")}</p>
            <ul>
              <li>坐标：${item.coordinates.lat.toFixed(6)}, ${item.coordinates.lng.toFixed(6)}</li>
              <li>标签：${item.tag} · ${item.season}</li>
              <li>用途：详情页、地图和攻略页共用同一份数据。</li>
            </ul>
          </div>
        </article>`
    )
    .join("");
}

function initCommonCollections() {
  updateFavoriteCount();
  refreshFavoriteButtons();
  renderLucide();
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCommonCollections();

  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "destinations") initDestinations();
  if (page === "destination") initDestinationDetail();
  if (page === "guide") initGuide();
  if (page === "comments") initComments();
  if (page === "about") initAbout();

  renderLucide();
});
