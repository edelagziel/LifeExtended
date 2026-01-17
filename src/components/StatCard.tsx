import "./StatCard.css";

type StatCardProps = {
  title: string;
  value: number;
  description: string;
};

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="stat-card">
      <h2>{title}</h2>
      <h3>{value}</h3>
      <p>{description}</p>
    </div>
  );
}

export default StatCard;
