const express = require("express");
const qr = require("qrcode");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home Route
app.get("/", (req, res) => {
    res.render("qr", { qrImage: null, error: null });
});

// Generate QR Code
app.post("/generate", async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.render("qr", { qrImage: null, error: "Enter a valid text or URL" });
    }

    try {
        const qrImage = await qr.toDataURL(text);
        res.render("qr", { qrImage, error: null });
    } catch (err) {
        res.render("qr", { qrImage: null, error: "Failed to generate QR Code" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
