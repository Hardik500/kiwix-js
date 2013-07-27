/* 
 * Utility functions
 */
define(function(require) {

    /**
     * Utility function : return true if the given string ends with the suffix
     * @param str
     * @param suffix
     * @returns {Boolean}
     */
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
        /**
     * Read an integer encoded in 4 bytes
     * @param {type} byteArray
     * @param {type} firstIndex
     * @returns {Number}
     */
    function readIntegerFrom4Bytes(byteArray, firstIndex) {
        return byteArray[firstIndex] + byteArray[firstIndex + 1] * 256 + byteArray[firstIndex + 2] * 65536 + byteArray[firstIndex + 3] * 16777216;
    }

    /**
     * Read an integer encoded in 2 bytes
     * @param {type} byteArray
     * @param {type} firstIndex
     * @returns {Number}
     */
    function readIntegerFrom2Bytes(byteArray, firstIndex) {
        return byteArray[firstIndex] + byteArray[firstIndex + 1] * 256;
    }

    /**
     * Convert a Uint8Array to a lowercase hex string
     * @param {type} byteArray
     * @returns {String}
     */
    function uint8ArrayToHex(byteArray) {
        var s = '';
        var hexDigits = '0123456789abcdef';
        for (var i = 0; i < byteArray.length; i++) {
            var v = byteArray[i];
            s += hexDigits[(v & 0xff) >> 4];
            s += hexDigits[v & 0xf];
        }
        return s;
    }

    /**
     * Convert a Uint8Array to base64
     * @param {type} byteArray
     * @returns {String}
     */
    function uint8ArrayToBase64(byteArray) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var bits, h1, h2, h3, h4, i = 0;
        var enc = "";

        for (var i = 0; i < byteArray.length; ) {
            bits = byteArray[i++] << 16;
            bits |= byteArray[i++] << 8;
            bits |= byteArray[i++];

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            enc += b64[h1] + b64[h2] + b64[h3] + b64[h4];
        }

        var r = byteArray.length % 3;

        return (r > 0 ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    }

    
    /**
     * Functions and classes exposed by this module
     */
    return {
        endsWith: endsWith,
        readIntegerFrom4Bytes: readIntegerFrom4Bytes,
        readIntegerFrom2Bytes : readIntegerFrom2Bytes,
        uint8ArrayToHex : uint8ArrayToHex,
        uint8ArrayToBase64 : uint8ArrayToBase64
    };
});