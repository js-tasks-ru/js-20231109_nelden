/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */


function getASCArr(arr) {
    return arr.sort(function(a, b) {
       return a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' })});
}

function getDESCArr(arr) {
    return arr.sort(function(a, b) {
        return b.localeCompare(a, ['ru', 'en'], { caseFirst: 'upper' })});
}

export function sortStrings(arr, param = 'asc') {
    const copyArr = arr.slice()
    if (param == 'desc') {
        return getDESCArr(copyArr)}
    else {
        return getASCArr(copyArr)
    }
}
