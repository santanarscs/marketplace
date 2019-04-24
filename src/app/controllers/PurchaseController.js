const Ad = require("../models/Ad");
const User = require("../models/User");
const Mail = require("../services/Mail");
class PurcheseController {
  async store(req, res) {
    const { ad, content } = req.body;
    const purchaseAd = await Ad.findById(ad).populate("author");
    const user = await User.findById(req.userId);

    await Mail.sendMail({
      from: "Raphael Santana <raphaelstn@gmail.com>",
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      html: `<p>Teste: ${content} </p>`
    });
    return res.send();
  }
}

module.exports = new PurcheseController();
