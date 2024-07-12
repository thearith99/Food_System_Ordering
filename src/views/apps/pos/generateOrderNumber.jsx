// Function to generate a unique order number
const generateOrderNumber = () => {
  const randomNum = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100
  const orderNumber = `ORDER-${randomNum}`; // Construct order number format

  return orderNumber;
};

export default generateOrderNumber;
