import CryptoJS from 'crypto-js'

export function UniqueIdentifier() {
    // Combine properties
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

    //Generate MD5 hash
    return md5(properties + 'Aquickbrownfox@98X')
    //return properties + 'Aquickbrownfox@98X'
}

// MD5 hashing function (You can use any other hashing library)
function md5(input) {
    var hash = CryptoJS.SHA256(input).toString()
    //CryptoJS.MD5
    return hash
}
