export function navigateReloading(path: string) {
    window.location.hash = path;
    window.location.reload();
}