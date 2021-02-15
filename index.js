const request = require("@gazetisto/promised-https-request")
const aws4 = require('aws4')


const send = async (message, queuePath, region, credentials = null) => {
    let payload = "Action=SendMessage&MessageBody=" + encodeURIComponent(JSON.stringify(message))
    var opts = {
        host: 'sqs.' + region + '.amazonaws.com',
        path: queuePath,
        service: 'sqs',
        region: region,
        body: payload
    }
    if (credentials) {
        aws4.sign(opts, credentials)
    } else {
        aws4.sign(opts)
    }
    //console.log(opts)
    return await request(opts, payload)
}


module.exports = {
    send
}