const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: "/usr/bin/google-chrome",
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();
    await browser.close();

    res.send(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Puppeteer API running on port 3000");
});
