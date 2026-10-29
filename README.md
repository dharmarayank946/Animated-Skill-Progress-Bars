# Animated Skill & Progress Bars

A clean, modern, and accessible animated skill and progress bar showcase engineered with pure **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. The project features viewport-triggered animations via the native `IntersectionObserver` API, decoupled configuration with HTML5 `data-*` attributes, synchronized numeric counters, and full compliance with WCAG 2.1 AA accessibility and `prefers-reduced-motion` user preferences.

---

## 🌟 Key Features

1. **Five Core Technical Competencies**:
   - **HTML** (95% - Semantic Markup & Accessibility)
   - **CSS** (90% - Modern Flexbox, Grid & Keyframes)
   - **JavaScript** (85% - ES6+, DOM & Async Programming)
   - **Python** (80% - Scripting, Automation & Logic)
   - **UI/UX Design** (88% - Wireframing, Aesthetics & Design Systems)

2. **Decoupled Data Configuration**:
   - Target percentages are defined via semantic `data-percentage` and `data-target` attributes directly in the HTML markup.
   - Modifying a target percentage in HTML automatically updates the CSS width expansion and the synchronized JavaScript numeric counter.

3. **Viewport-Triggered `IntersectionObserver`**:
   - Animations trigger automatically when elements scroll into the active viewport or on initial load if already in view.
   - Employs a custom `threshold: 0.2` and unobserves targets immediately upon first trigger (`observer.unobserve(target)`), ensuring animations run strictly once per page visit.

4. **Synchronized Dual Animation**:
   - **CSS3 Hardware-Accelerated Width Expansion**: Uses `cubic-bezier(0.22, 1, 0.36, 1)` easing over `1.4s` for GPU-accelerated progress bar expansion.
   - **JavaScript `requestAnimationFrame` Counter**: Uses mathematical cubic ease-out calculation to increment numeric text labels in real-time synchronization with the bar fill.

5. **Accessibility & Reduced-Motion Support**:
   - Full ARIA semantics: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label`, and `aria-live="polite"`.
   - Native respect for `prefers-reduced-motion`: When detected via CSS media queries and JavaScript `window.matchMedia()`, animations and transitions are bypassed, rendering final percentages and widths immediately without movement or flicker.

6. **Clean Light Theme with Pastel Accents**:
   - Minimalist, distraction-free aesthetic with a crisp white card surface (`#ffffff`), subtle background (`#f8fafc`), and soft pastel green (`#10b981`, `#34d399`) and pastel blue (`#0284c7`, `#38bdf8`) accents.
   - Fully responsive across mobile, tablet, and desktop viewports.

---

## 📁 File Structure

```text
Animated-Skill-Progress-Bars/
│
├── index.html                           # Semantic HTML5 layout and accessibility markup
├── style.css                            # Modern CSS3 styling, pastel palette & animations
├── script.js                            # Vanilla JavaScript (ES6+), IntersectionObserver & counter
├── README.md                            # Comprehensive technical documentation
└── Animated-Skill-Progress-Bars-Report.pdf # Professional verification & test report
```

---

## ⚙️ Architecture & Implementation Details

### 1. HTML Configuration (`index.html`)

Skill items are decoupled from JavaScript logic using HTML5 data attributes:

```html
<article class="skill-item" data-skill="html" data-percentage="95">
  <div class="skill-meta">
    <div class="skill-info">
      <!-- Icon & Name -->
      <h3 class="skill-name">HTML</h3>
      <span class="skill-tag">Semantic Markup & Accessibility</span>
    </div>
    <!-- Numeric Counter Label Beside Bar -->
    <span class="skill-percentage" id="percent-html" aria-live="polite">0%</span>
  </div>
  <!-- Rounded Progress Bar Track & Fill -->
  <div class="progress-track" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="HTML proficiency: 95%">
    <div class="progress-fill fill-html" data-target="95"></div>
  </div>
</article>
```

### 2. CSS Styling & Smooth Animation (`style.css`)

Tracks feature smooth rounded pill contours (`border-radius: 9999px`) with subtle interior shading. Fills initialize at `width: 0%` and transition using custom cubic bezier timing:

```css
.progress-track {
  width: 100%;
  height: 12px;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.progress-fill {
  height: 100%;
  width: 0%;
  border-radius: 9999px;
  transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: width;
}
```

### 3. JavaScript & `IntersectionObserver` (`script.js`)

The observer monitors when skill items enter the viewport. Once visible, it unobserves the item and initiates both the width transition and the mathematical counter:

```javascript
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains('is-animated')) {
      animateSkillItem(entry.target);
      obs.unobserve(entry.target); // Runs strictly once per page visit
    }
  });
}, { threshold: 0.2 });
```

The mathematical easing function mirrors the CSS timing curve:

```javascript
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
```

### 4. Reduced-Motion Handling

Both CSS and JavaScript handle accessibility preferences gracefully:

```css
@media (prefers-reduced-motion: reduce) {
  .progress-fill {
    transition: none !important;
  }
}
```

```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  fill.style.width = `${target}%`;
  percentLabel.textContent = `${target}%`;
  item.classList.add('is-animated');
  return;
}
```

---

## 🧪 Testing and Verification

The following verification suite was executed:
- **Five Required Skills**: HTML (95%), CSS (90%), JavaScript (85%), Python (80%), and UI/UX Design (88%) verified.
- **Data Attribute Coupling**: Modifying `data-percentage` dynamically controls target values.
- **IntersectionObserver Trigger**: Observes elements with a threshold of 0.2 and detaches upon activation.
- **Single Execution per Visit**: Unobserve pattern prevents secondary triggers on re-scrolling.
- **Percentage Labels**: Values displayed beside each bar synchronize with track fill widths.
- **Reduced Motion Support**: Bypasses transitions and counters when user preference is set to reduce.
- **Responsiveness**: Verified fluid rendering across 320px, 375px, 768px, 1024px, and 1440px viewport widths.

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari).
2. No build tools, package managers, servers, or external internet connections are required.

