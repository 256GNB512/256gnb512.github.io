self.onmessage = (event) => {
    let { current, target, animSpeed } = event.data;

    function update() {
        let done = true;

        for (let i = 0; i < current.length; i++) {
            let diff = target[i] - current[i];
            if (Math.abs(diff) > 0.01) { // Stop when close enough
                current[i] += diff * animSpeed;
                done = false;
            }
        }

        self.postMessage(current);

        if (!done) {
            setTimeout(update, 16); // Approximate 60 FPS
        }
    }

    update();
};