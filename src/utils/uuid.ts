export default function generateId() {
  const randomString: string = Math.random().toString(36).substring(2, 12);
  return randomString;
}