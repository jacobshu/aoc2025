import fs from 'node:fs'

const datapath = './data/day1.txt'
const WINDOW = 100

const data = fs.readFileSync(datapath, { encoding: 'utf-8' })
const dataops = data.split('\n').filter(r => r !== '')
const ops = dataops.map(d => {
  let dir = d[0] === 'L' ? -1 : 1
  let n = parseInt(d.substring(1))
  return n * dir
})

let key = 0
let current = 50
ops.forEach(o => {
  let n = o % WINDOW
  let str = `curr: ${current}; ${o} => ${n}; `
  if (n + current >= WINDOW || n + current < 0) {
    n = n < 0 ? n + WINDOW : n - WINDOW
    str += `adj => ${n}; ` 
  }
  current += n
  str += `final: ${current}`
  if (current === 0) {
    key++
    str += ` MATCH`
  }
})

console.log(key)

