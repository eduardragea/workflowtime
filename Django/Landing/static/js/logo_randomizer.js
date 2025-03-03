document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".logo-cloud");
    const logos = document.querySelectorAll(".logo-wrapper");
    const positions = new Set(); // Use a Set to ensure uniqueness

    const minPadding = 50; // Minimum padding between logos
    const containerRect = container.getBoundingClientRect();

    // Ensure the container has a fixed height (avoid height-based shifts)
    container.style.height = `${Math.max(450, logos.length * 100)}px`;

    function getLogoDimensions(logo) {
        if (logo.classList.contains("large-logo")) {
            return { width: 130, height: 130 };
        } else if (logo.classList.contains("large-logo-sferal")) {
            return { width: 160, height: 160 };
        } else if (logo.classList.contains("small-logo")) {
            return { width: 70, height: 70 };
        }
        return { width: 100, height: 100 }; // Default logo size
    }

    function isOverlapping(x, y, width, height) {
        for (let pos of positions) {
            if (
                x < pos.x + pos.width + minPadding &&
                x + width + minPadding > pos.x &&
                y < pos.y + pos.height + minPadding &&
                y + height + minPadding > pos.y
            ) {
                return true;
            }
        }
        return false;
    }

    logos.forEach(logo => {
        const { width, height } = getLogoDimensions(logo);
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 200) {
            let x = Math.random() * (containerRect.width - width - minPadding * 2) + minPadding;
            let y = Math.random() * (containerRect.height - height - minPadding * 2) + minPadding;

            if (!isOverlapping(x, y, width, height)) {
                positions.add({ x, y, width, height });
                logo.style.position = "absolute";
                logo.style.left = `${x}px`;
                logo.style.top = `${y}px`;
                placed = true;
            }
            attempts++;
        }

        // Fallback to force placement if no valid position is found
        if (!placed) {
            for (let i = 0; i < containerRect.width; i += 10) {
                for (let j = 0; j < containerRect.height; j += 10) {
                    if (!isOverlapping(i, j, width, height)) {
                        logo.style.position = "absolute";
                        logo.style.left = `${i}px`;
                        logo.style.top = `${j}px`;
                        positions.add({ x: i, y: j, width, height });
                        return;
                    }
                }
            }
        }
    });

    // Lock positions after the initial placement
    window.addEventListener("scroll", () => {
        logos.forEach(logo => {
            logo.style.transform = "translate(0, 0)"; // Prevent any shifts
        });
    });
});
