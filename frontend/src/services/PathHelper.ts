export function updateURL(newUrl: string, title: string) {
    window.history.pushState({'pageTitle': title}, '', newUrl);
}
