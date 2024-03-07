// Service/helpers.js
// Import the CryptoJS library for encryption and decryption
import CryptoJS from 'crypto-js'
import { UniqueIdentifier } from '@/service/sec.js'

// Define the encryption key
const EncKey = UniqueIdentifier()

// Define the cryptoService object, which contains methods for encryption, decryption, saving data, and retrieving data
export const cryptoService = {
    // Method to encrypt data using AES encryption
    encryptData(data) {
        try {
            // Encrypt the data using AES encryption with the encryption key
            const encryptedData = CryptoJS.AES.encrypt(data, EncKey)
            // Convert the encrypted data to a string and return it
            return encryptedData.toString()
        } catch (error) {
            // Log error if encryption fails
            console.error('Encryption failed:', error)
            // Return null to indicate encryption failure
            return null
        }
    },

    // Method to decrypt encrypted data using AES decryption
    decryptData(encryptedData) {
        try {
            // Decrypt the encrypted data using AES decryption with the encryption key
            const decryptedData = CryptoJS.AES.decrypt(encryptedData, EncKey)
            // Convert the decrypted data to a string using UTF-8 encoding and return it
            return decryptedData.toString(CryptoJS.enc.Utf8)
        } catch (error) {
            // Log error if decryption fails
            console.error('Decryption failed:', error)
            // Return null to indicate decryption failure
            return null
        }
    },

    // Method to save data to localStorage after encrypting it
    saveData(data, store) {
        try {
            // Encrypt the data by converting it to a JSON string, then encrypting it using AES encryption
            const encryptedData = this.encryptData(JSON.stringify(data))
            // Check if encryption was successful
            if (encryptedData) {
                // Store the encrypted data in localStorage under the specified store name
                localStorage.setItem(store, encryptedData)
            } else {
                // Log error if encryption fails and data is not saved
                console.error('Encryption failed. Data not saved.')
            }
        } catch (error) {
            // Log error if saving operation fails
            console.error('Save operation failed:', error)
        }
    },

    // Method to retrieve data from localStorage and decrypt it
    retrieveData(store) {
        try {
            // Retrieve the encrypted data from localStorage using the specified store name
            const storedData = localStorage.getItem(store)
            // Check if encrypted data is found in localStorage
            if (storedData) {
                // Decrypt the encrypted data using AES decryption
                const decryptedData = this.decryptData(storedData)
                // Check if decryption was successful
                if (decryptedData) {
                    // Parse the decrypted data from JSON format to a JavaScript object and return it
                    return JSON.parse(decryptedData)
                }
            }

            // If no data is found in localStorage or decryption fails, return null
            return null
        } catch (error) {
            // Log error if retrieval operation fails
            console.error('Retrieve operation failed:', error)
            // Return null to indicate retrieval failure
            return null
        }
    },
    getUser() {
        const authindex = cryptoService.retrieveData('userindex')
        if (authindex) {
            // Declare variables outside of the if blocks
            let user = null
            let authorized = false
            let token = null
            let ctoken = null
            let refreshToken = null
            let refreshTime = 0

            // Check if `authindex` has `user` property
            if (authindex.user !== undefined) {
                user = authindex.user
            }
            // Check if `authindex` has `authorized` property
            if (authindex.authorized !== undefined) {
                authorized = authindex.authorized
            }
            // Check if `authindex` has `token` property
            if (authindex.token !== undefined) {
                token = authindex.token
            }
            if (authindex.ctoken !== undefined) {
                ctoken = authindex.ctoken
            }
            // Check if `authindex` has `refreshToken` property
            if (authindex.refreshToken !== undefined) {
                refreshToken = authindex.refreshToken
            }
            if (authindex.refreshTime !== undefined) {
                refreshTime = authindex.refreshTime
            }

            // Return an object containing user, authorized, token, and refreshToken
            return {
                user,
                authorized,
                token,
                ctoken,
                refreshToken,
                refreshTime
            }
        }

        // Return null if no data is found
        return null
    }
}
