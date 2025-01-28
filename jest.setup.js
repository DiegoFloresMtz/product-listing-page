// Suppress the punycode warning
const originalWarn = console.warn;
console.warn = (...args) => {
    if (args[0]?.includes('punycode')) return;
    originalWarn(...args);
}; 