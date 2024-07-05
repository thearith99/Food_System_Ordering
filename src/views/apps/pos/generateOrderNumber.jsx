// Function to generate a unique order number
const generateOrderNumber = () => {
  const timestamp = new Date().getTime(); // Get current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generate random number (adjust as needed)
  const orderNumber = `ORDER-${timestamp}-${randomNum}`; // Construct order number format

  return orderNumber;
};

export default generateOrderNumber;
