function encoder(message, key) {
    let encrypted = "";

    for (let char of message) {
        encrypted += String.fromCharCode(
            (char.charCodeAt(0) + key)
        );
    }

    return btoa(encrypted);
}

function decoder(message, key) {
    let decoded = atob(message);

    let decrypted = "";

    for (let char of decoded) {
        decrypted += String.fromCharCode(
            (char.charCodeAt(0) - key)
        );
    }

    return decrypted;
}

function processMessage() {
    const action = document.getElementById("action").value;
    const message = document.getElementById("message").value;
    const key = parseInt(document.getElementById("key").value);

    const result = document.getElementById("result");

    if (!message || isNaN(key)) {
        result.innerHTML = "❌ Please enter both message and key.";
        return;
    }

    let output;

    if (action === "encode") {
        output = encoder(message, key);
        result.innerHTML = `🔐 Encoded Message:<br>${output}`;
    } else {
        output = decoder(message, key);
        result.innerHTML = `🧩 Decoded Message:<br>${output}`;
    }
}