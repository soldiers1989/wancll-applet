
function valiTelephone(telephone) {
  return /^1\d{10}$/.test(telephone);
}

function valiPassword(password) {
  return /^[A-Za-z0-9]{6,20}$/.test(password)
}

module.exports={
  valiTelephone,
  valiPassword
}