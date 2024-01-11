let uuid = 0
export default function generateId() {
  uuid++
  return uuid.toString();
}