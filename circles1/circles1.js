const CANVAS = document.querySelector('#canvas')
const CTX = CANVAS.getContext('2d')

// Offset of canvas element
let offset = {
	x: 0,
	y: 0
}

const COLORS = [
	[252, 186, 3],
	[30, 235, 68],
	[24, 240, 240],
	[132, 24, 240],
	[230, 18, 124],
	[235, 64, 52],
	[52, 235, 156]
]

const getMousePos = function (evt) {
    var rect = CANVAS.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    }
}

const stringifyRGBA = function (r, g, b, a) {
	return 'rgba('+r.toString()+','+g.toString()+','+b.toString()+','+a.toString()+')';
}

let Circle = function (x, y) {
	this.x = x
	this.y = y
	this.r = 1
	this.opacity = 1
	// Pick random color
	this.color = COLORS[Math.floor(Math.random() * COLORS.length) % COLORS.length]

	this.render = function () {
		CTX.beginPath()
		CTX.fillStyle = stringifyRGBA(this.color[0], this.color[1], this.color[2], this.opacity)
		CTX.arc(this.x + offset.x + 10, this.y + offset.y + 10, this.r, 0, 2 * Math.PI)
		CTX.fill()
	}

	this.update = function () {
		this.r += 1
		this.opacity -= 0.008
		this.render()
	}

	this.isVisible = function () {
		return this.opacity > 0
	}

	return this
}

let circles = []

const createCircle = function (evt) {
	let pos = getMousePos(evt)
	let circle = new Circle(pos.x, pos.y)
	circle.render()
	circles.push(circle)
}

const init = function () {
	CANVAS.width = innerWidth
	CANVAS.height = innerHeight

	window.requestAnimationFrame(draw)
}


const draw = function () {
	// Setting background
	CTX.fillStyle = 'rgb(175, 206, 227)'
	CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

	for (let i in circles) {
		circles[i].update()

		// Delete circles which are not visible
		if (!circles[i].isVisible()) {
			circles.splice(i, 1)
		}
	}

	window.requestAnimationFrame(draw)
}

init()


CANVAS.addEventListener('mousemove', function (e) {
	createCircle(e)
})

window.addEventListener('resize', function (e) {
	CANVAS.width = innerWidth
	CANVAS.height = innerHeight
});