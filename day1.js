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

let one = {
  key: 0, curr: 50,
  process: function(op) {
    let n = op % WINDOW
    if (n + this.curr >= WINDOW || n + this.curr < 0) {
      n = n < 0 ? n + WINDOW : n - WINDOW
    }
    this.curr += n
    if (this.curr === 0) {
      this.key++
    }
  }
}

let two = {
  key: 0, curr: 50,
  process: function(op) {
    this.key += Math.floor(Math.abs(op) / WINDOW)
    let n = op % WINDOW
    if (n + this.curr >= WINDOW || n + this.curr < 0) {
      n = n < 0 ? n + WINDOW : n - WINDOW
      if (this.curr !== 0 && this.curr + n !== 0) this.key++
    }
    this.curr += n
    if (this.curr === 0) {
      this.key++
    }
  }
}

ops.forEach(o => {
  one.process(o)
  two.process(o)
})


console.log(one)
console.log(two)

