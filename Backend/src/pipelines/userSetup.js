const userService = require("../services/userService");
const buyBoxService = require("../services/buyBoxService");

const userSetup = async (firebaseUser) => {
  const { uid, email, name } = firebaseUser;

  // Check by firebaseUid first
  let user = await userService.findByFirebaseUid(uid);

  // Fallback: check by email
  if (!user && email) {
    user = await userService.findByEmail(email);
  }

  // Create if doesn't exist
  if (!user) {
    user = await userService.createUser({ uid, email, name });
  }

  // Check if there's an existing BuyBox submission for this email
  // If so, link it to the user
  let hasBuyBox = false;

  if (email) {
    const buyBox = await buyBoxService.findByEmail(email);
    if (buyBox && !buyBox.userId) {
      await buyBoxService.linkUser(buyBox.id, user.id);
      hasBuyBox = true;
    } else if (buyBox && buyBox.userId) {
      hasBuyBox = true;
    }
  }

  return {
    id: user.id,
    firebaseUid: user.firebaseUid,
    email: user.email,
    name: user.name,
    role: user.role,
    hasBuyBox,
  };
};

module.exports = userSetup;