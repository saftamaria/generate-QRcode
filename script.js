
  /**
   * Genereaza un QR code STATIC (incorporeaza direct textul/URL-ul).
   * Nu expira, atata timp cat destinatia (ex: URL-ul) ramane valida.
   *
   * @param {Object} opts
   * @param {string} opts.targetId - ID-ul elementului container (ex: "qr")
   * @param {string} opts.value - URL/text de pus in QR
   * @param {number} [opts.size=256] - dimensiune in px
   * @param {"L"|"M"|"Q"|"H"} [opts.ecLevel="M"] - corectie erori
   * @returns {{ downloadPng: (filename?: string) => void }}
   */
  function generateStaticQRCode(opts) {
    const { targetId, value, size = 256, ecLevel = "M" } = opts || {};

    if (!targetId) throw new Error("tar
    function generateStaticQRCode({ targetId, value, size = 256, ecLevel = "M" }) {
      const container = document.getElementById(targetId);
      if (!container) throw new Error("Containerul QR nu exista");

      container.innerHTML = "";

      const qr = new QRCode(container, {
        text: value,
        width: size,
        height: size,
        correctLevel: QRCode.CorrectLevel[ecLevel] || QRCode.CorrectLevel.M
      });

      function downloadPng(filename = "qr-code.png") {
        const img = container.querySelector("img");
        const canvas = container.querySelector("canvas");

        let dataUrl;
        if (img && img.src) {
          dataUrl = img.src;
        } else if (canvas) {
          dataUrl = canvas.toDataURL("image/png");
        } else {
          throw new Error("Nu s-a putut genera imaginea QR");
        }

        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      return { downloadPng };
    }

    const qrApi = generateStaticQRCode({
      targetId: "qr",
      value: "https://exemplu.ro",
      size: 220,
      ecLevel: "H"
    });

    document.getElementById("downloadQr").addEventListener("click", () => {
      qrApi.downloadPng("qr-static.png");
    });getId este obligatoriu.");
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error("value trebuie sa fie un string non-gol (URL/text).");
    }

    const container = document.getElementById(targetId);
    if (!container) throw new Error(`Nu exista element cu id="${targetId}".`);

    // Curata containerul daca regeneram
    container.innerHTML = "";

    // Genereaza QR
    const qr = new QRCode(container, {
      text: value.trim(),
      width: size,
      height: size,
      correctLevel: QRCode.CorrectLevel[ecLevel] ?? QRCode.CorrectLevel.M
    });

    // Helper: descarca PNG-ul generat (daca libraria a creat un <img> sau <canvas>)
    function downloadPng(filename = "qr-code.png") {
      // QRCode.js poate crea fie <img>, fie <canvas>, in functie de browser
      const img = container.querySelector("img");
      const canvas = container.querySelector("canvas");

      let dataUrl = "";
      if (img && img.src) {
        dataUrl = img.src; // deja data:image/png;base64,...
      } else if (canvas) {
        dataUrl = canvas.toDataURL("image/png");
      } else {
        throw new Error("Nu am gasit img/canvas pentru download.");
      }

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    return { downloadPng };
  }

  // EXEMPLU DE UTILIZARE
  const qrApi = generateStaticQRCode({
    targetId: "qr",
    value: "https://exemplu.ro/pagina-mea",
    size: 280,
    ecLevel: "H"
  });

  document.getElementById("downloadQr").addEventListener("click", () => {
    qrApi.downloadPng("qr-static.png");
  });
</script>