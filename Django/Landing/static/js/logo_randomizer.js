document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".logo-cloud");
    const logos = document.querySelectorAll(".logo-wrapper");
    const positions = [];

    const minPadding = 50; // Minimum padding between logos

    // Dynamically adjust the height of the container for better fit
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
        return positions.some(pos => 
            (x < pos.x + pos.width + minPadding && x + width + minPadding > pos.x &&
             y < pos.y + pos.height + minPadding && y + height + minPadding > pos.y)
        );
    }

    logos.forEach(logo => {
        const { width, height } = getLogoDimensions(logo);
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 200) { // Increased attempts to improve positioning
            let x = Math.random() * (container.clientWidth - width - minPadding * 2) + minPadding;
            let y = Math.random() * (container.clientHeight - height - minPadding * 2) + minPadding;

            if (!isOverlapping(x, y, width, height)) {
                positions.push({ x, y, width, height });
                logo.style.position = "absolute";
                logo.style.left = `${x}px`;
                logo.style.top = `${y}px`;
                placed = true;
            }
            attempts++;
        }

        // Fallback to force placement if no valid position is found
        if (!placed) {
            for (let i = 0; i < container.clientWidth; i += 10) {
                for (let j = 0; j < container.clientHeight; j += 10) {
                    if (!isOverlapping(i, j, width, height)) {
                        logo.style.position = "absolute";
                        logo.style.left = `${i}px`;
                        logo.style.top = `${j}px`;
                        positions.push({ x: i, y: j, width, height });
                        return;
                    }
                }
            }
        }
    });
});
