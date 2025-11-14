const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.signup = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Méthode invalide" });
    }

    const { email, password, captchaToken } = req.body;

    if (!captchaToken) {
      return res.status(400).json({ message: "Captcha manquant" });
    }

    const secret = "6Le2KgwsAAAAAKUseMBpnPh237d2Z6wh1hFuaN8t";

    try {
      const googleRes = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`
      );

      if (!googleRes.data.success) {
        return res.status(401).json({ message: "Captcha invalide" });
      }

      await admin.auth().createUser({ email, password });
      return res.status(200).json({ message: "Utilisateur créé !" });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  });
});
