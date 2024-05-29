exports.tokenRemover = (payload) => {
  if (Array.isArray(payload)) {
    return payload?.map((user) => {
      user = user.toObject();
      delete user.token;
      return user;
    });
  } else {
    let payloadObject = payload.toObject();
    delete payloadObject.token;
    return payloadObject;
  }
};
