const slider = document.querySelector(".slider");
const slider_value = document.querySelector(".slider-value");
const grid = document.querySelector(".sketch-grid");
const grid_btn = document.querySelector(".apply-grid");
const color = document.querySelector(".color-picker");
const clear = document.querySelector(".clear-button");
const eraser = document.querySelector(".eraser-button");
const rainbow = document.querySelector(".rainbow-button");
const darken = document.querySelector(".darken-button");

slider.addEventListener("input", (event) => {
  const val = event.target.value;
  slider_value.textContent = `${val} x ${val}`;
});

grid_btn.addEventListener("click", (event) => {
  clear_grid();
  generate_grid(slider.value);
});

const generate_grid = (size) => {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let i = 0; i < size; i++) {
      const pixel = document.createElement("pixel");
      pixel.classList.add("pixel");
      row.appendChild(pixel);
    }

    grid.appendChild(row);
  }
  grid_color(color.value);
};

const clear_grid = () => {
  grid.textContent = "";
};

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

const grid_color = (color_val = "#000", rainbowColor = false, dark = false) => {
  const pixels = document.querySelectorAll(".pixel");

  pixels.forEach((pixel) => {
    pixel.style.opacity = 1;
    if (dark == true) {
      pixel.style.opacity = 0.1;
    }

    pixel.addEventListener("mouseenter", () => {
      if (rainbowColor) {
        color_val = `#${genRanHex(6)}`;
      }

      if (dark) {
        let op = Number(pixel.style.opacity);
        if (op < 1) {
          pixel.style.opacity = `${op + 0.1}`;
        }
      }

      pixel.style.backgroundColor = color_val;
    });
  });
};

color.addEventListener("input", (e) => {
  grid_color(e.target.value);
});
color.addEventListener("click", (e) => {
  grid_color(e.target.value);
});

rainbow.addEventListener("mouseenter", (e) => {
  e.target.style.backgroundColor = `#${genRanHex(6)}`;
  e.target.style.color = "#fff";
});

rainbow.addEventListener("mouseleave", (e) => {
  e.target.style.backgroundColor = "#fff";
  e.target.style.color = "#000";
});

rainbow.addEventListener("click", (e) => {
  grid_color("#fff", true);
});

eraser.addEventListener("click", (e) => {
  grid_color("#fff");
});

darken.addEventListener("click", (e) => {
  clear_grid();
  generate_grid(slider.value);
  grid_color("#000", false, true);
});

clear.addEventListener("click", (e) => {
  clear_grid();
  generate_grid(slider.value);
});

slider.value = 2;
slider_value.textContent = `${slider.value} x ${slider.value}`;
generate_grid(slider.value);

grid_color(color.value);
