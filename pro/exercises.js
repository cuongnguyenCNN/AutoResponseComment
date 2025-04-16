const exercises = [
  "Đứng lên và vươn vai 10 giây",
  "Xoay cổ tay 20 lần",
  "Lắc vai 10 lần mỗi bên",
  "Ngồi xuống rồi đứng lên 5 lần",
  "Xoay hông nhẹ nhàng 15 lần",
  "Hít sâu và thở ra 3 lần",
  "Xoay cổ trái - phải 10 lần",
  "Đứng vươn tay cao rồi cúi xuống chạm mũi chân",
];

function getRandomExercise() {
  return exercises[Math.floor(Math.random() * exercises.length)];
}
window.getRandomExercise = getRandomExercise;
