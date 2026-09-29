# ⚡ Scroll-Driven Hero Section Animation

> A high-performance, responsive, and visually stunning scroll-driven hero section animation built with clean, understandable vanilla HTML5, CSS3, JavaScript, and GSAP ScrollTrigger. Inspired by the live reference demo.

---

## 🌟 Assignment Requirements & Solution Mapping

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **1. Hero Section Layout** | Occupies the first screen (`100vh` sticky track in `300vh` scroll container). Displays the letter-spaced headline `W E L C O M E   I T Z F I Z Z` and 4 milestone impact statistics cards. | ✅ Complete |
| **2. Initial Load Animation** | Smooth staggered entrance for the headline letters (`ease: 'back.out'`), header reveal, and animated statistics numbers count-up. | ✅ Complete |
| **3. Scroll-Based Animation (Core)** | Hypercar moves smoothly along the highway track based on scroll position (`scrub: 1.0`). Exact vehicle coordinate dynamically triggers the **Laser Letter Reveal** and expands the green energy trail. | ✅ Complete |
| **4. Motion & Performance** | GPU-accelerated transforms (`translate3d`, `scale`, `opacity`) with zero layout thrashing for fluid 60/120 FPS performance. | ✅ Complete |
| **5. Clean & Understandable Code** | Minimal, structured, and well-commented code across `index.html`, `style.css`, and `main.js`. | ✅ Complete |

---

## 🎨 Design & Visual Features

- **Dynamic Laser Letter Reveal**: Each letter of `W E L C O M E   I T Z F I Z Z` illuminates brightly with neon glow as the vehicle drives across the track.
- **Glowing Energy Trail**: A vibrant green/cyan aerodynamic wake trail expands behind the vehicle in sync with scroll progress.
- **Exact Reference Metric Boxes**:
  - `Box 1 (Yellow)`: `58% Increase in pick up point use`
  - `Box 2 (Cyan)`: `23% Decreased in customer phone calls`
  - `Box 3 (Dark)`: `27% Increase in pick up point use`
  - `Box 4 (Orange)`: `40% Decreased in customer phone calls`
- **Audio Synthesizer (Optional)**: Built-in Web Audio API engine simulating electric hypercar acceleration sound on scroll.

---

## 📁 Project Structure

```plaintext
hero/
├── assets/
│   ├── car-titan.jpg         # High-resolution Sports Car (Top View)
│   ├── car-orange.jpg        # Volcanic Orange Model
│   └── car-vector.svg        # Vector SVG Car
├── index.html                # Semantic HTML layout
├── style.css                 # Clean CSS styles, Glassmorphism & GPU animations
├── main.js                   # Concise GSAP ScrollTrigger logic (~150 lines)
└── README.md                 # Project documentation
```

---

## 🚀 How to Run & Deploy

### Run Locally
Simply open [index.html](file:///d:/interview/hero/index.html) in any modern browser.

### Deploy to GitHub Pages (Free)
1. Push the code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: scroll-driven hero section animation"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to **Settings** ➔ **Pages** in your GitHub repository.
3. Select **Deploy from a branch** (`main` / `/ root`), and save.
