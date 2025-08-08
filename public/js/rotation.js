export function rotateShapeClockwise(shape) {
    if (shape.length === 0)
        return shape;
    const rows = shape.length;
    const cols = shape[0].length;
    const out = Array.from({ length: cols }, () => Array(rows).fill(0));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            out[c][rows - 1 - r] = shape[r][c];
        }
    }
    return out;
}
export function rotateShapeTimes(shape, times) {
    const k = ((times % 4) + 4) % 4;
    let out = shape;
    for (let i = 0; i < k; i++) {
        out = rotateShapeClockwise(out);
    }
    return out;
}
//# sourceMappingURL=rotation.js.map