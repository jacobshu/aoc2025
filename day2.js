import fs from 'node:fs'

const path = './data/day2.txt'
const data = fs.readFileSync(path, { encoding: 'utf8' })

function partOne(data) {
  const ranges = data.split(',')
    .map(r => r.split('-').map(n => n.trim())) // start/end pair
    .filter(r => !(r[0].length % 2 === 1 && r[0].length === r[1].length)) // odd length nums can't repeat
    .map(r => r.map(s => parseInt(s)))

  let invalid = {} 
  let intvalid = 0
  ranges.forEach(range => {
    const [start, end] = range
    const key = `${start}-${end}`
    invalid[key] = []
    for (let i = start; i <= end; i++) {
      if (isDoubled(i)) {
        invalid[key].push(i)
        intvalid += i
      }
    }
  })
  console.log(ranges)
  console.log(invalid)
  console.log(intvalid)
}

function isEven(n) {
  return n % 2 === 0
}

function isDoubled(int) {
  const s = int.toString()
  if (!isEven(s.length)) return false
  if (s.substring(0, s.length / 2) === s.substring(s.length / 2)) return true
  return false
}

console.log('12', isDoubled(12))
console.log('123', isDoubled(123))
console.log('8888', isDoubled(8888))
console.log('33', isDoubled(33))

partOne(data)

