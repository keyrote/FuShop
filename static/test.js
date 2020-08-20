const categorys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const max = 3
const arr = []
const { categorys } = this
let smallArr = []
categorys.forEach((c, index) => {
    if (smallArr.length === 0) {
        arr.push(smallArr)
    }
    smallArr.push(c) if (smallArr.length === max) {
        smallArr = []
    }
})
console.log(arr)