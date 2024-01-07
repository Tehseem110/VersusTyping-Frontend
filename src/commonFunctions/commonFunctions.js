const soundPlay = (sound) => {
  const audio = new Audio(sound);
  audio.play();
};

export { soundPlay };
