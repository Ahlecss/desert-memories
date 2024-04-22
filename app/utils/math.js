export function lerp(a, b, alpha) {
    return a + alpha * (b - a)
}

export function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

export function easeInCubic(x) {
    return x * x * x;
}

export const normalize = (value, min, max) => {
    return (value - min) / (max - min);
}

export const normalizeMinus1 = (value, min, max) => {
    return ((value - min) / (max - min) * 2 - 1);
}