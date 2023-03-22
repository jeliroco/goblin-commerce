import AWS from "aws-sdk"

// Instantiate SES client
const ses = new AWS.SES({
  region: "ca-central-1", // Change this to your desired AWS region
})

// Export SES client
export default ses
