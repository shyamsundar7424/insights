export function initDashboard() {
const contentItems = [
  { title: "Insane moments from the latest stream…", date: "Oct 11 · Reel", type: "Reel", dateOrder: 20261011, views: "185", viewCount: 185, viewers: "182", viewerCount: 182, follows: "0", followCount: 0, likes: "0", likeCount: 0, comments: "0", commentCount: 0, shares: "0", shareCount: 0, topViews: "2.2K", image: "assets/insights-item-1.jpg" },
  { title: "One good clip can turn a gaming moment…", date: "Oct 8 · Reel", type: "Reel", dateOrder: 20261008, views: "1.3K", viewCount: 1300, viewers: "1.1K", viewerCount: 1100, follows: "4", followCount: 4, likes: "31", likeCount: 31, comments: "1", commentCount: 1, shares: "0", shareCount: 0, topViews: "2.1K", image: "assets/insights-item-2.jpg" },
  { title: "Find the best moments from the game…", date: "Oct 5 · Reel", type: "Reel", dateOrder: 20261005, views: "2.1K", viewCount: 2100, viewers: "1.9K", viewerCount: 1900, follows: "3", followCount: 3, likes: "34", likeCount: 34, comments: "1", commentCount: 1, shares: "0", shareCount: 0, topViews: "2.1K", image: "assets/insights-item-3.jpg" },
  { title: "Your gameplay can do more than entertain…", date: "Oct 1 · Reel", type: "Reel", dateOrder: 20261001, views: "2.1K", viewCount: 2100, viewers: "1.9K", viewerCount: 1900, follows: "2", followCount: 2, likes: "36", likeCount: 36, comments: "1", commentCount: 1, shares: "0", shareCount: 0, topViews: "1.3K", image: "assets/insights-item-4.jpg" },
  { title: "BRO THOUGHT HE COULD ESCAPE…", date: "Sep 26 · Reel", type: "Reel", dateOrder: 20260926, views: "1.2K", viewCount: 1200, viewers: "890", viewerCount: 890, follows: "1", followCount: 1, likes: "23", likeCount: 23, comments: "1", commentCount: 1, shares: "1", shareCount: 1, topViews: "1.2K", image: "assets/insights-item-5.jpg" },
  { title: "HE REALLY THOUGHT HE WAS SAFE…", date: "Sep 21 · Reel", type: "Reel", dateOrder: 20260921, views: "2K", viewCount: 2000, viewers: "1.6K", viewerCount: 1600, follows: "6", followCount: 6, likes: "33", likeCount: 33, comments: "1", commentCount: 1, shares: "0", shareCount: 0, topViews: "2K", image: "assets/insights-item-6.jpg" }
];
const locationData = {
  Countries: [["India", "51.1%"], ["United States", "6.8%"], ["Indonesia", "6.8%"], ["Uzbekistan", "4.5%"], ["Russia", "3.4%"]],
  Cities: [["Ciudad Guayana", "2.3%"], ["Mesa", "2.3%"], ["Bangalore", "2.3%"], ["Silvassa", "1.1%"], ["Tula", "1.1%"]]
};
const list = document.getElementById("contentList");
const toast = document.querySelector(".toast");
function showToast(message) { toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800); }
let activeContentSort = "Latest";
let activeContentFilter = "All";
let activeDateRange = "Last 30 days";
let activeCustomRange = null;
function renderContent(sort = activeContentSort, filter = activeContentFilter) {
  activeContentSort = sort;
  activeContentFilter = filter;
  let items = [...contentItems];
  if (filter !== "All") { const types = { Reels: "Reel", Posts: "Post", Stories: "Story", Live: "Live" }; items = items.filter(item => item.type === types[filter]); }
  if (activeDateRange === "Last 7 days") items = items.filter(item => item.dateOrder >= 20261004);
  else if (activeDateRange === "Last 30 days") items = items.filter(item => item.dateOrder >= 20260912);
  else if (activeDateRange === "Previous month") items = items.filter(item => item.dateOrder >= 20260901 && item.dateOrder <= 20260930);
  else if (activeDateRange === "Custom range" && activeCustomRange) items = items.filter(item => item.dateOrder >= Number(activeCustomRange.start.replaceAll("-", "")) && item.dateOrder <= Number(activeCustomRange.end.replaceAll("-", "")));
  if (sort === "Latest") items.sort((a, b) => b.dateOrder - a.dateOrder);
  else {
    const sortKeys = { Views: "viewCount", Viewers: "viewerCount", Follows: "followCount", Likes: "likeCount" };
    const numberKey = sortKeys[sort] || "viewCount";
    items.sort((a, b) => b[numberKey] - a[numberKey]);
  }
  list.innerHTML = items.map(item => {
    const count = sort === "Latest" ? item.views : item[({ Views: "views", Viewers: "viewers", Follows: "follows", Likes: "likes" })[sort] || "views"];
    const valueLabel = sort === "Latest" ? "Views" : sort;
    return `<article class="content-item"><img src="${item.image}" alt="Reel thumbnail"><div class="content-copy"><strong>${item.title}</strong><div class="post-stats"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z"/></svg>${item.likes}</span><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8.5 8 8.8 8.8 0 0 1-3.7-.8L4 20l1.2-3.3a7.5 7.5 0 0 1-1.7-4.7 8 8 0 0 1 8-8.2 8 8 0 0 1 8.5 7.7Z"/></svg>${item.comments}</span><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 3-7.2 18-3.4-7.4L3 10.2 21 3Z"/><path d="m10.4 13.6 4-4"/></svg>${item.shares}</span></div></div><span class="content-value">${count}<small>${valueLabel}</small></span></article>`;
  }).join("") || `<p class="empty-state">No ${filter.toLowerCase()} in this period.</p>`;
}
function updateRangeDates(range, custom = null) {
  let dates = ["Sep 13", "Sep 28", "Oct 12"];
  if (range === "Last 7 days") dates = ["Oct 5", "Oct 8", "Oct 12"];
  else if (range === "Last 90 days") dates = ["Jul 14", "Aug 28", "Oct 12"];
  else if (range === "Previous month") dates = ["Sep 1", "Sep 15", "Sep 30"];
  else if (range === "Custom range" && custom) dates = [custom.start, custom.end];
  document.querySelectorAll(".chart-dates").forEach(row => {
    const labels = row.querySelectorAll("span");
    if (range === "Custom range" && labels.length === 3) { labels[0].textContent = dates[0]; labels[1].textContent = ""; labels[2].textContent = dates[1]; }
    else dates.forEach((date, index) => { if (labels[index]) labels[index].textContent = date; });
  });
}
function showPage(page) {
  document.querySelectorAll(".tab").forEach(tab => { const active = tab.dataset.page === page; tab.classList.toggle("active", active); tab.setAttribute("aria-selected", String(active)); });
  document.querySelectorAll(".page").forEach(panel => { const active = panel.id === page; panel.classList.toggle("active", active); panel.hidden = !active; });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll(".tab, [data-page-link]").forEach(button => button.addEventListener("click", () => showPage(button.dataset.page || button.dataset.pageLink)));
renderContent();
document.querySelectorAll(".content-sort-tabs button").forEach(button => button.addEventListener("click", () => { document.querySelectorAll(".content-sort-tabs button").forEach(item => item.classList.toggle("active", item === button)); renderContent(button.textContent.trim(), activeContentFilter); }));
document.querySelectorAll(".content-kind").forEach(button => button.addEventListener("click", () => { document.getElementById("typeModal").hidden = false; }));
document.querySelectorAll("[data-content-filter]").forEach(button => button.addEventListener("click", () => { const filter = button.dataset.contentFilter; const title = filter === "All" ? "All content" : filter === "Live" ? "Live videos" : filter; document.querySelectorAll("[data-content-filter]").forEach(item => { item.classList.toggle("chosen", item === button); item.innerHTML = (item.dataset.contentFilter === "All" ? "All content" : item.dataset.contentFilter === "Live" ? "Live videos" : item.dataset.contentFilter) + (item === button ? " <span>✓</span>" : ""); }); document.querySelectorAll(".content-kind").forEach(item => item.innerHTML = `${title} <span class="title-chevron">⌄</span>`); document.getElementById("typeModal").hidden = true; renderContent(activeContentSort, filter); }));
document.querySelector(".type-cancel").addEventListener("click", () => document.getElementById("typeModal").hidden = true);
document.getElementById("typeModal").addEventListener("click", event => { if (event.target.id === "typeModal") event.currentTarget.hidden = true; });
document.querySelectorAll(".date-select").forEach(button => button.addEventListener("click", () => { document.getElementById("dateModal").hidden = false; }));
document.querySelectorAll("[data-range]").forEach(button => button.addEventListener("click", () => { const range = button.dataset.range; if (range === "Custom range") { document.getElementById("dateModal").hidden = true; document.getElementById("customRangeModal").hidden = false; return; } activeDateRange = range; activeCustomRange = null; document.querySelectorAll("[data-range]").forEach(item => { item.classList.toggle("chosen", item === button); item.innerHTML = item.dataset.range + (item === button ? " <span>✓</span>" : ""); }); document.querySelectorAll(".date-select").forEach(select => select.innerHTML = `${range.replace("Last ", "")} <span>⌄</span>`); updateRangeDates(range); document.getElementById("dateModal").hidden = true; renderContent(); showToast(`${range} selected`); }));
document.querySelector(".apply-range").addEventListener("click", () => { const start = document.getElementById("rangeStart").value; const end = document.getElementById("rangeEnd").value; if (!start || !end || start > end) { showToast("Enter a valid date range"); return; } activeDateRange = "Custom range"; activeCustomRange = { start, end }; document.querySelectorAll("[data-range]").forEach(item => { item.classList.toggle("chosen", item.dataset.range === "Custom range"); item.innerHTML = item.dataset.range + (item.dataset.range === "Custom range" ? " <span>✓</span>" : ""); }); document.querySelectorAll(".date-select").forEach(select => select.innerHTML = `${start.slice(5).replace("-", "/")}–${end.slice(5).replace("-", "/")} <span>⌄</span>`); updateRangeDates(activeDateRange, activeCustomRange); document.getElementById("customRangeModal").hidden = true; renderContent(); showToast("Custom date range applied"); });
document.querySelector(".custom-cancel").addEventListener("click", () => document.getElementById("customRangeModal").hidden = true);
document.getElementById("customRangeModal").addEventListener("click", event => { if (event.target.id === "customRangeModal") event.currentTarget.hidden = true; });
document.querySelector(".sheet-cancel").addEventListener("click", () => document.getElementById("dateModal").hidden = true);
document.getElementById("dateModal").addEventListener("click", event => { if (event.target.id === "dateModal") event.currentTarget.hidden = true; });
document.querySelectorAll(".pills").forEach(group => group.addEventListener("click", event => { const button = event.target.closest(".pill"); if (!button) return; group.querySelectorAll(".pill").forEach(item => item.classList.toggle("active", item === button)); if (group.classList.contains("location-pills")) renderLocations(button.textContent.trim()); if (group.classList.contains("day-pills")) renderActiveTimes([...group.children].indexOf(button)); if (group.classList.contains("growth-pills")) { const paths = { Overall: "M0 52 L60 52 L120 52 L180 52 L228 52 L250 52 L262 70 L274 52 L292 52 L340 52", Follows: "M0 52 L60 52 L120 52 L180 52 L228 52 L250 38 L262 52 L274 52 L292 52 L340 52", Unfollows: "M0 52 L60 52 L120 52 L180 52 L228 52 L250 52 L262 70 L274 52 L292 52 L340 52" }; document.querySelector(".growth-line").setAttribute("d", paths[button.textContent.trim()]); } }));
function renderLocations(type = "Countries") { document.querySelector(".location-list").innerHTML = locationData[type].map(([name, value]) => `<div class="location-row"><span>${name}</span><b>${value}</b><div class="demo-track"><i style="width:${parseFloat(value)}%"></i></div></div>`).join(""); }
const activityPatterns = [[60,82,70,95,72,56,98,77,86,65,100,73,58,80,92,65,85,72,60,94,75,88,69,100], [30,48,62,85,94,100,91,88,76,70,65,60,58,64,75,84,92,88,82,70,60,48,38,30], [38,55,70,96,100,85,72,68,74,86,94,91,80,69,61,57,66,78,92,100,88,72,60,45], [72,65,60,78,88,100,96,82,70,65,72,84,91,86,75,68,62,70,82,95,100,86,72,60], [58,70,86,98,90,78,70,74,86,100,96,82,70,66,72,84,96,90,80,72,64,70,82,90], [45,56,75,90,100,92,84,80,86,94,100,90,80,72,68,74,82,90,96,88,75,65,55,48], [50,62,78,92,100,90,82,75,80,88,96,100,90,78,70,68,74,86,98,94,82,72,62,55]];
function renderActiveTimes(day = 0) { document.querySelector(".active-chart").innerHTML = activityPatterns[day].map((height, i) => `<i title="${Math.round(height * 0.12)} active followers" style="height:${height}%"></i>`).join(""); }
renderLocations(); renderActiveTimes();
document.querySelectorAll(".interaction-pills [data-interaction]").forEach(button => button.addEventListener("click", () => { const totals = { All: 204, Likes: 185, Comments: 13, Reposts: 5, Saves: 31, Shares: 4 }; document.querySelectorAll(".interaction-pills [data-interaction]").forEach(item => item.classList.toggle("active", item === button)); const amount = totals[button.dataset.interaction]; document.querySelector(".interaction-total").textContent = amount; document.querySelector(".interaction-fill").style.width = `${amount / 204 * 100}%`; }));
document.querySelectorAll(".metric-card").forEach(card => card.addEventListener("click", () => { document.querySelectorAll(".metric-card").forEach(item => item.classList.toggle("selected", item === card)); const metric = card.dataset.metric; const chart = document.querySelector(".line-chart"); const line = document.querySelector(".views-line"); const point = document.querySelector(".chart-point"); const labels = { Views: ["7.9K", "3.9K", "0"], "Net followers": ["2", "0", "-2"], Interactions: ["300", "150", "0"] }; const paths = { Views: "M0 90 L8 89 L16 90 L24 90 L34 89 L44 80 L50 62 L55 30 L59 0 L71 88 L80 90 L87 88 L95 90 L110 90 L185 90 L240 90 L290 90 L340 90", "Net followers": "M0 45 L28 45 L48 45 L60 45 L70 45 L82 45 L92 45 L106 45 L120 45 L132 45 L185 45 L240 45 L274 45 L290 67 L302 45 L340 45", Interactions: "M0 89 L28 84 L48 86 L60 80 L70 65 L82 24 L92 73 L106 83 L120 68 L132 77 L185 70 L240 82 L290 58 L340 78" }; line.setAttribute("d", paths[metric]); document.querySelectorAll(".chart-labels span").forEach((item, index) => item.textContent = labels[metric][index]); chart.setAttribute("aria-label", `${metric} over time`); point.style.display = metric === "Views" ? "" : "none"; document.querySelector(".secondary-line").style.display = metric === "Views" ? "" : "none"; document.querySelector(".split-legend").style.display = metric === "Views" ? "" : "none"; }));
document.querySelectorAll(".thumb").forEach(button => button.addEventListener("click", () => showToast(`Content insights · ${contentItems[Number(button.dataset.item)].topViews} views`)));
document.getElementById("backButton").addEventListener("click", () => { if (history.length > 1) history.back(); else showToast("You're viewing Insights"); });
document.getElementById("shareButton").addEventListener("click", async () => { try { await navigator.clipboard.writeText(location.href); showToast("Insights link copied"); } catch { showToast("Share insights from your browser menu"); } });
document.getElementById("infoButton").addEventListener("click", () => showToast("Insights show how your content is performing"));
}
