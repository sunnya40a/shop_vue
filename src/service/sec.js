//Service/sec.js
import CryptoJS from 'crypto-js'

// Function to generate a unique identifier
export function UniqueIdentifier() {
    // Combine properties to create a unique string
    var properties =
        navigator.appName +
        navigator.appCodeName +
        navigator.appVersion +
        navigator.platform +
        navigator.vendor +
        navigator.userAgent +
        navigator.hardwareConcurrency +
        navigator.language +
        navigator.languages +
        navigator.oscpu +
        screen.width +
        screen.height

    // Generate MD5 hash of the combined properties
    return md5(properties + 'Aquickbrownfox@98X')
}

// MD5 hashing function
function md5(input) {
    // Calculate the SHA256 hash of the input string using CryptoJS
    var hash = CryptoJS.SHA256(input).toString()
    return hash
}
