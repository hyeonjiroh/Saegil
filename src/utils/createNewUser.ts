export function createNewUser() {
  const time = new Date();
  const userID =
    "" +
    time.getFullYear() +
    time.getMonth() +
    time.getDate() +
    time.getHours() +
    time.getMinutes() +
    time.getSeconds() +
    time.getMilliseconds() +
    Math.floor(Math.random() * 1000);

  localStorage.setItem("USID", userID);
  localStorage.setItem("onboardingAnswers", JSON.stringify(Array(7).fill("")));
  localStorage.setItem("todayMoodAnswers", JSON.stringify(Array(2).fill("")));
}
