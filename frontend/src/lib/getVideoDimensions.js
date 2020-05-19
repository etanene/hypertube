export default function getVideoDimensions(height, width) {
  if (height > 900 && width > 1500) {
    return { width: 1280, height: 720 };
  }
  if (height > 750 && width > 1250) {
    return { width: 1024, height: 576 };
  }
  if (height > 600 && width > 1100) {
    return { width: 896, height: 504 };
  }
  if (height > 600 && width > 1000) {
    return { width: 768, height: 432 };
  }
  if (height > 550 && width > 800) {
    return { width: 640, height: 360 };
  }
  if (height > 530 && width > 600) {
    return { width: 576, height: 324 };
  }
  if (height > 530 && width > 500) {
    return { width: 480, height: 270 };
  }
  if (height > 530 && width > 420) {
    return { width: 384, height: 216 };
  }
  if (height > 530 && width > 360) {
    return { width: 320, height: 180 };
  }
  return { width: 256, height: 144 };
}
