export const _uuid = {
  value: "",
  characters: {
    numbers: "0123456789",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    // special: "?/~^{}[]!@#$%&*()_-+=.,:;",
  },
  generate(chars, length) {
    if (!length) {
      length = 15;
    }
    let pwd = "";
    length = length < 15 || length > 50 ? 15 : length;
    chars = chars || Object.values(this.characters).join().replace(/,/g, "");

    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    this.value = pwd;
    return pwd;
  },
};
