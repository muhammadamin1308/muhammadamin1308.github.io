import { useState } from "react";

const ContactMe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [gotcha, setGotcha] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // basic validations + minimum message length to reduce spam-like submissions
    if (
      !name.trim() ||
      !isValidEmail(email) ||
      !message.trim() ||
      message.trim().length < 8
    ) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/mkonjnzl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _gotcha: gotcha,
          _replyto: email,
          _subject: `Contact from ${name}`,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        setGotcha("");
        // clear success after a while
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" data-section className="bg-black w-screen py-16">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-xl md:text-5xl text-center text-white font-medium tracking-wide mb-16 neon-text">
          Contact Me
        </h2>
        <p className="text-slate-300 mb-8">
          Have a project idea or want to work together? Send me a message — I
          usually reply within a few days.
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* honeypot field for bots */}
          <input
            type="text"
            name="_gotcha"
            value={gotcha}
            onChange={(e) => setGotcha(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-white/10  border border-white/15  rounded-md px-4 py-3 text-white"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="bg-white/10  border border-white/15  rounded-md px-4 py-3 text-white"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>

          <textarea
            className="bg-white/10  border border-white/15  rounded-md px-4 py-3 text-white min-h-[120px]"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="flex items-center justify-center gap-4">
            <button
              type="submit"
              className="inset-shadow inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4254bd] text-white font-medium transition-colors"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
            <a
              className="text-sm text-[#4254bd] underline"
              href="mailto:sharifjanovmukhammadamin@gmail.com"
            >
              Or email directly
            </a>
          </div>

          <div aria-live="polite">
            {status === "sent" && (
              <p className="text-green-400 mt-3">
                Thanks! Message sent. I'll reply you soon
              </p>
            )}
            {status === "error" && (
              <p className="text-rose-400 mt-3">
                There was an error sending your message. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
