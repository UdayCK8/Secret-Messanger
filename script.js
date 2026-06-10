let lastOutput = "";

function encoder(message, key) {
    let encrypted = "";

    for (let char of message) {
        encrypted += String.fromCharCode(
            char.charCodeAt(0) + key
        );
    }

    return btoa(encrypted);
}

function decoder(message, key) {
    try {
        let decoded = atob(message);

        let decrypted = "";

        for (let char of decoded) {
            decrypted += String.fromCharCode(
                char.charCodeAt(0) - key
            );
        }

        return decrypted;
    } catch {
        return "❌ Invalid encoded message.";
    }
}

function processMessage() {
    const action = document.getElementById("action").value;
    const message = document.getElementById("message").value.trim();
    const key = parseInt(document.getElementById("key").value);

    const result = document.getElementById("result");

    if (!message || isNaN(key)) {
        result.innerHTML = "❌ Please enter both message and key.";
        lastOutput = "";
        return;
    }

    if (action === "encode") {
        lastOutput = encoder(message, key);

        result.innerHTML = `
            <strong>🔐 Encoded:</strong><br>
            ${lastOutput}
        `;
    } else {
        lastOutput = decoder(message, key);

        result.innerHTML = `
            <strong>🧩 Decoded:</strong><br>
            ${lastOutput}
        `;
    }
}

function copyResult() {
    if (!lastOutput) {
        alert("No result to copy!");
        return;
    }

    navigator.clipboard.writeText(lastOutput)
        .then(() => {
            const btn = document.getElementById("copyBtn");

            btn.textContent = "✅ Copied!";

            setTimeout(() => {
                btn.textContent = "📋 Copy";
            }, 2000);
        })
        .catch(() => {
            alert("Failed to copy text.");
        });
}