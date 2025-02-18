const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const app = express();
const port = 7000;

const DB =
  "mongodb+srv://jakkavignesh2002:VigneshJakka@productpricetracker.6u0wkqb.mongodb.net/";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

let registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  products: [
    {
      productPlatform: {
        type: String,
      },
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: String,
        required: true,
      },
      productMrp: {
        type: String,
        required: true,
      },
      productURL: {
        type: String,
      },
      dateTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

app.use(cors());
app.use(express.json());

const sendEmail = async (email, scrapedData, url) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "b15productpricetracker@gmail.com",
        pass: "nucvokqwzbgmkogp",
      },
    });
    const mailOptions = {
      from: {
        name: "B15 Product Pricetracker",
        address: "b15productpricetracker@gmail.com",
      },
      to: `${email}`,
      subject: "Flipkart Product Information",
      html: `
        <p><strong>Product Name:</strong> ${scrapedData.productName}</p>
        <p><strong>Product Price:</strong> ${scrapedData.productPrice}</p>
        <p><strong>Product MRP:</strong> ${scrapedData.productMrp}</p>
        <p><strong>Discount:</strong> ${scrapedData.discount}%</p>
        <p><strong>Product Rating:</strong> ${scrapedData.productRating}</p>
        <a href= ${url}>Purchase</a>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

app.post("/scrapeFlipkart", async (req, res) => {
  try {
    const { url, email } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    console.log(email);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.goto(url);

    const scrapedData = await page.evaluate(() => {
      const getTextContent = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : "N/A";
      };

      let productName = getTextContent(".VU-ZEz");
      let productPriceStr = getTextContent(".Nx9bqj");
      let productMrpStr = getTextContent(".yRaY8j6");
      let productRating = getTextContent(".XQDdHH");

      const productPrice =
        parseFloat(productPriceStr.replace(/[^\d.]/g, ""), 10) || "N/A";
      const productMrp =
        parseFloat(productMrpStr.replace(/[^\d.]/g, ""), 10) || productPrice;

      const discount = Math.round(
        ((productMrp - productPrice) / productMrp) * 100
      );

      console.log(
        productName,
        productPrice,
        productMrp,
        discount,
        productRating
      );
      return { productName, productPrice, productMrp, discount, productRating };
    });
    await sendEmail(email, scrapedData, url);
    res.json({ data: scrapedData });

    const database = mongoose.model("userDetails", registerSchema);
    const userExists = await database.findOne({ email: email });
    if (userExists) {
      userExists.products.push({
        productPlatform: "Flipkart",
        productName: scrapedData.productName,
        productPrice: scrapedData.productPrice,
        productMrp: scrapedData.productMrp,
        productURL: url,
      });
      await userExists.save();
    } else {
      console.error(`User with email ${email} not found`);
    }

    await browser.close();
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const database = mongoose.model("userDetails", registerSchema);
app.get("/api/products", async (req, res) => {
  // let database = req.app.get('database');
  try {
    const products = await database.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
