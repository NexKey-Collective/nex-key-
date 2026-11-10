const userService = require("../services/userService");
const buyBoxService = require("../services/buyBoxService");

const userSetup = async (firebaseUser) => {
  const { uid, email, name } = firebaseUser;

  // Check by firebaseUid first
  let user = await userService.findByFirebaseUid(uid);

  // Fallback: check by email
  if (!user && email && firebaseUser.email_verified) {
    const candidate = await userService.findByEmail(email);
    if (
      candidate &&
      (!candidate.firebaseUid || candidate.firebaseUid === uid)
    ) {
      user = candidate;
      if (!candidate.firebaseUid)
        user = await userService.updateUser(candidate.id, { firebaseUid: uid });
    }
  }

  // Create if doesn't exist
  if (!user) {
    user = await userService.createUser({ uid, email, name });
  }

  // Check if there's an existing BuyBox submission for this email
  // If so, link it to the user
  let hasBuyBox = false;

  if (email && firebaseUser.email_verified) {
    const buyBox = await buyBoxService.findByEmail(email);
    if (buyBox && (!buyBox.userId || buyBox.userId === user.id)) {
      await buyBoxService.linkUser(buyBox.id, uid);
      hasBuyBox = true;
    } else if (buyBox && buyBox.userId === uid) {
      hasBuyBox = true;
    }
  }

  const owned = await require("../services/userBuyBoxService").findByUserId(
    uid,
  );
  hasBuyBox = Boolean(owned) || hasBuyBox;

  return {
    id: user.id,
    firebaseUid: user.firebaseUid,
    email: user.email,
    name: user.name,
    role: user.role,
    hasBuyBox,
  };
};

const pending = new Map();
module.exports = function syncOnce(firebaseUser) {
  const key = `${firebaseUser.uid}:${Boolean(firebaseUser.email_verified)}`;
  if (!pending.has(key))
    pending.set(
      key,
      userSetup(firebaseUser).finally(() => pending.delete(key)),
    );
  return pending.get(key);
};
