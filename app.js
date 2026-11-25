// Configure with the project's public Supabase URL and publishable key.
// The public key is safe in the browser only because the database tables use RLS.
const SUPABASE_URL = "https://xqtuabseumufpzctvyii.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ud_Xy5KdlekqOxxWze7jZw_rh03bk3Q";
const db = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "☰";
}));

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.getElementById("contact-status");
  const submit = contactForm.querySelector("button[type=submit]");
  if (!db) { status.textContent = "The message service is not configured yet. Please try again later."; return; }
  const data = Object.fromEntries(new FormData(contactForm).entries());
  submit.disabled = true; submit.textContent = "Sending…"; status.textContent = "";
  const { error } = await db.from("contact_messages").insert(data);
  submit.disabled = false; submit.textContent = "Send your message ↗";
  if (error) { status.textContent = "We couldn't send that just now. Please try again in a moment."; console.error(error); }
  else { contactForm.reset(); status.textContent = "Thank you. Your message has been received with care."; }
});

const newsletterForm = document.getElementById("newsletter-form");
newsletterForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.getElementById("newsletter-status");
  const button = newsletterForm.querySelector("button");
  if (!db) { status.textContent = "The subscription service is not configured yet."; return; }
  const email = document.getElementById("newsletter-email").value.trim().toLowerCase();
  button.disabled = true; button.textContent = "Joining…";
  const { error } = await db.from("newsletter_subscribers").insert({ email });
  button.disabled = false; button.textContent = "Join the list ↗";
  if (error?.code === "23505") status.textContent = "You're already on the list. Thank you for being here.";
  else if (error) { status.textContent = "We couldn't add you just now. Please try again."; console.error(error); }
  else { newsletterForm.reset(); status.textContent = "You're on the list. Thank you for growing with us."; }
});


// Reader stories are private by default and require editorial review before publication.
const storyForm = document.getElementById("story-form");
storyForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.getElementById("story-status");
  const button = storyForm.querySelector("button[type=submit]");
  if (!db) { status.textContent = "The story submission service is not configured yet."; return; }
  const form = new FormData(storyForm);
  const payload = {
    display_name: String(form.get("display_name") || "").trim() || null,
    email: String(form.get("email") || "").trim() || null,
    story: String(form.get("story") || "").trim(),
    permission_to_share: form.get("permission_to_share") === "yes",
    publication_status: "pending"
  };
  button.disabled = true; button.textContent = "Submitting…"; status.textContent = "";
  const { error } = await db.from("reader_stories").insert(payload);
  button.disabled = false; button.textContent = "Submit your story ↗";
  if (error) { status.textContent = "We couldn't receive your story just now. Please try again."; console.error(error); }
  else { storyForm.reset(); status.textContent = "Thank you for trusting us with your words. Your submission is awaiting review."; }
});
