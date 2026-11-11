const pages = ["platform", "solutions", "ecosystems"];
const isStandalone = window.location.protocol === "file:";
const previewPage = new URLSearchParams(window.location.search).get("page");
const requestedPage = isStandalone ? previewPage : document.documentElement.dataset.page;

export const currentPage = pages.includes(requestedPage) ? requestedPage : "home";

const rootPath = currentPage === "home" ? "./" : "../";

export function pageHref(page, anchor) {
  if (page === currentPage && anchor) return `#${anchor}`;

  const fragment = anchor ? `#${anchor}` : "";
  if (isStandalone) {
    const query = page === "home" ? "" : `?page=${page}`;
    return `./OPEN_WEBSITE.html${query}${fragment}`;
  }

  const directory = page === "home" ? "" : `${page}/`;
  return `${rootPath}${directory}${fragment}`;
}

export function imageSrc(filename) {
  const assetRoot = isStandalone ? "./dist/" : rootPath;
  return `${assetRoot}images/${filename}`;
}

if (isStandalone && currentPage !== "home") {
  document.title = `${currentPage[0].toUpperCase()}${currentPage.slice(1)} | PartneRizer`;
}
