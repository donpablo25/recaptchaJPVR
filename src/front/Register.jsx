import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setMessage("Veuillez cocher le reCAPTCHA.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          recaptchaResponse: captchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Inscription réussie !");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Erreur : " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "auto" }}>
      <h2>Créer un compte</h2>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          required
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ReCAPTCHA
          sitekey="6Le2KgwsAAAAAO39NHFRxXmKX2td2lZeK3jRso05"
          onChange={(token) => setCaptchaToken(token)}
        />

        <button type="submit">Créer un compte</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
