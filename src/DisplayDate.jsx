export default function DisplayDate() {
  const today = new Date();

  const optionsWeekday = { weekday: "long" };
  const optionsDay = { day: "numeric" };
  const optionsMonth = { month: "long" };

  const weekday = today.toLocaleDateString("en-GB", optionsWeekday);
  const day = today.toLocaleDateString("en-GB", optionsDay);
  const month = today.toLocaleDateString("en-GB", optionsMonth);

  const formattedDate = `${weekday}, ${day} ${month}`;

  return <p className="text-primary text-sm">{formattedDate}</p>;
}
