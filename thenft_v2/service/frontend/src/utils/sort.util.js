export function text(a, b) {
    if(a < b) return -1;
    if(a > b) return 1;
    if(a === b) return 0;
    else return -1;
}