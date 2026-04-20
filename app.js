const CAT_FACTS = [
  "Cats spend 70% of their lives sleeping.",
  "A group of cats is called a clowder.",
  "Cats have 32 muscles in each ear.",
  "A cat's nose print is as unique as a human fingerprint.",
  "Cats can make over 100 different vocalizations, while dogs can only make about 10.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
  "Cats can jump up to six times their body length.",
  "A cat's purr vibrates at a frequency of 25–150 Hz, which can promote healing.",
  "Indoor cats live on average 12–18 years, twice as long as outdoor cats.",
  "Cats walk like camels and giraffes — moving both right feet first, then both left.",
  "A cat's field of view is about 200 degrees.",
  "Cats sweat only through their paw pads.",
  "The first cat in space was a French cat named Félicette in 1963.",
  "Cats have a specialized collarbone that lets them always land on their feet.",
  "A cat's heart beats 140–220 times per minute — nearly twice as fast as a human's.",
  "Cats can recognize their owner's voice but choose to ignore it.",
  "White cats with blue eyes are often born deaf.",
  "Isaac Newton invented the cat flap door.",
  "Cats have a third eyelid called a nictitating membrane.",
  "The average cat has 244 bones in its body.",
];

const CAT_NAMES = [
  { name: "Whiskers", meaning: "For the cat with magnificent facial hair" },
  { name: "Luna", meaning: "Moon goddess — perfect for a mysterious cat" },
  { name: "Mochi", meaning: "Sweet and squishy, just like the treat" },
  { name: "Shadow", meaning: "Always lurking, never quite visible" },
  { name: "Biscuit", meaning: "Loves to knead and make bread" },
  { name: "Nimbus", meaning: "Fluffy as a cloud" },
  { name: "Pumpkin", meaning: "Round, orange, and full of personality" },
  { name: "Cleo", meaning: "Regal, commanding, worthy of pyramids" },
  { name: "Noodle", meaning: "Boneless wonder who melts on laps" },
  { name: "Cosmo", meaning: "A cat with universe-sized curiosity" },
  { name: "Duchess", meaning: "Expects only the finest things in life" },
  { name: "Patches", meaning: "A masterpiece of random colouring" },
  { name: "Tater Tot", meaning: "Small, golden, and impossible not to love" },
  { name: "Oreo", meaning: "Perfectly black and white" },
  { name: "Sir Fluffington", meaning: "Nobility incarnate" },
  { name: "Pickles", meaning: "Unexpectedly tangy character" },
  { name: "Mittens", meaning: "Born with extra-cosy paws" },
  { name: "Stormy", meaning: "Arrives without warning, leaves destruction" },
  { name: "Jellybean", meaning: "Tiny, colourful, and slightly odd" },
  { name: "Cheddar", meaning: "Sharp wit, warm personality" },
];

const BREEDS = [
  { emoji: "🐱", name: "Persian", trait: "Calm & fluffy" },
  { emoji: "🐈", name: "Siamese", trait: "Vocal & elegant" },
  { emoji: "🐾", name: "Maine Coon", trait: "Gentle giant" },
  { emoji: "😺", name: "Bengal", trait: "Wild & playful" },
  { emoji: "🐈‍⬛", name: "Bombay", trait: "All black beauty" },
  { emoji: "😸", name: "Ragdoll", trait: "Floppy & affectionate" },
  { emoji: "🐱", name: "Scottish Fold", trait: "Quirky folded ears" },
  { emoji: "🐾", name: "Sphynx", trait: "Hairless & warm" },
];

// ─── Cat Image ───────────────────────────────────────────────────────────────

async function fetchCatImage() {
  const img = document.getElementById("cat-image");
  const loading = document.getElementById("cat-image-loading");

  img.classList.remove("loaded");
  loading.style.display = "block";

  try {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    if (!res.ok) throw new Error("API error");
    const [data] = await res.json();
    img.src = data.url;
    img.onload = () => {
      loading.style.display = "none";
      img.classList.add("loaded");
    };
  } catch {
    loading.textContent = "🐾 Could not fetch cat image. Try again!";
  }
}

// ─── Cat Fact ─────────────────────────────────────────────────────────────────

function showRandomFact() {
  const el = document.getElementById("cat-fact");
  const fact = CAT_FACTS[Math.floor(Math.random() * CAT_FACTS.length)];
  el.style.opacity = "0";
  setTimeout(() => {
    el.textContent = fact;
    el.style.transition = "opacity 0.3s ease";
    el.style.opacity = "1";
  }, 150);
}

// ─── Name Generator ───────────────────────────────────────────────────────────

function generateName() {
  const nameEl = document.getElementById("generated-name");
  const meaningEl = document.getElementById("name-meaning");
  const entry = CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)];

  nameEl.style.transform = "scale(0.8)";
  nameEl.style.opacity = "0";
  setTimeout(() => {
    nameEl.textContent = entry.name;
    meaningEl.textContent = entry.meaning;
    nameEl.style.transition = "transform 0.25s ease, opacity 0.25s ease";
    nameEl.style.transform = "scale(1)";
    nameEl.style.opacity = "1";
  }, 150);
}

// ─── Breeds ───────────────────────────────────────────────────────────────────

function renderBreeds() {
  const grid = document.getElementById("breeds-grid");
  grid.innerHTML = BREEDS.map(
    (b) => `
    <div class="breed-card">
      <span class="breed-emoji">${b.emoji}</span>
      <div class="breed-name">${b.name}</div>
      <div class="breed-trait">${b.trait}</div>
    </div>`
  ).join("");
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.getElementById("new-cat-btn").addEventListener("click", fetchCatImage);
document.getElementById("new-fact-btn").addEventListener("click", showRandomFact);
document.getElementById("gen-name-btn").addEventListener("click", generateName);

fetchCatImage();
showRandomFact();
generateName();
renderBreeds();
