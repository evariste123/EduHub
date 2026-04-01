
        const facts = [
            '1. The Earth formed about 4.54 billion years ago through planetary accretion. ',
            '2. Earth rotates once every 24 hours and revolves around the Sun once every 365.25 days.',
            '3. The Moon likely formed after a giant impact with a body called Theia.',
            '4. The greenhouse effect keeps Earth warm enough to support liquid water and life.',
            '5. Forest ecosystems produce oxygen and support most terrestrial life on Earth.'
        ];

        const factButton = document.getElementById('factButton');
        const factOutput = document.getElementById('factOutput');

        if (factButton) {
            factButton.addEventListener('click', () => {
                const i = Math.floor(Math.random() * facts.length);
                factOutput.textContent = facts[i];
            });
        }

        // Scroll buttons
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        const scrollBottomBtn = document.getElementById('scrollBottomBtn');

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        if (scrollBottomBtn) {
            scrollBottomBtn.addEventListener('click', () => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
        }