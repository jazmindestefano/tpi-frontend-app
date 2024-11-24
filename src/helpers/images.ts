export const getRandomImage = () => {
  const images = ['avatar/horse-avatar.png', 'avatar/lion-avatar.png', 'avatar/rabbit-avatar.png']
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}
