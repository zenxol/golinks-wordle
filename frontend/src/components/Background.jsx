import { useEffect, useRef } from "react"

function Background({ theme = "dark" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const ctx = canvas.getContext("2d")
    const backgroundColor = theme === "dark" ? "#0a0a0a" : "#f5f5f5"
    const colors = theme === "dark"
      ? ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#5f27cd"]
      : ["#ff7f50", "#ffb347", "#00d2ff", "#76e4f7", "#ff85a2"]

    let particles = []

    const spawnParticles = (x, y) => {
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 0.5
        particles.push({
          x, y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const handleMouseMove = (e) => spawnParticles(e.clientX, e.clientY)

    let animId
    const animate = () => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles = particles.filter(p => {
        p.x += p.dx
        p.y += p.dy
        p.dx *= 0.92
        p.dy *= 0.92
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
        ctx.fill()
        return Math.abs(p.dx) >= 0.05 || Math.abs(p.dy) >= 0.05
      })

      animId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1, pointerEvents: "none" }}
    />
  )
}

export default Background