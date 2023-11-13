/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr, param = 'asc') {
    let copyArr = arr.slice()
    let rez = copyArr.sort(function (a, b) {
        return a.localeCompare(b, undefined, { sensitivity: 'case', caseFirst: 'upper' });
    })
    if (param == 'desc') {
        return rez.reverse();
    }
    return rez
}