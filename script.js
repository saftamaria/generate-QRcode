let qrInstance = null

function generateStaticQRCode(value) {
  const container = document.getElementById('qr')
  container.innerHTML = ''

  qrInstance = new QRCode(container, {
    text: value,
    width: 220,
    height: 220,
    correctLevel: QRCode.CorrectLevel.H,
  })

  document.getElementById('downloadBtn').style.display = 'block'
}

function downloadQR(filename = 'qr-static.png') {
  const container = document.getElementById('qr')
  const img = container.querySelector('img')
  const canvas = container.querySelector('canvas')

  let dataUrl
  if (img && img.src) {
    dataUrl = img.src
  } else if (canvas) {
    dataUrl = canvas.toDataURL('image/png')
  } else {
    return
  }

  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

document.getElementById('generateBtn').addEventListener('click', () => {
  const value = document.getElementById('qrInput').value.trim()

  if (!value) {
    alert('Introdu un link valid')
    return
  }

  try {
    new URL(value) // validare URL nativa
  } catch {
    alert('URL invalid')
    return
  }

  generateStaticQRCode(value)
})

document.getElementById('downloadBtn').addEventListener('click', () => {
  downloadQR()
})
