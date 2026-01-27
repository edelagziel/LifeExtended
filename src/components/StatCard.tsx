import "./StatCard.css";

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  layoutMode?: "compact" | "regular";
  helpText?: string;
};

function StatCard({ title, value, description, helpText }: StatCardProps) {
  return (
    <div className="stat-card">
      <h2>{title}</h2>
      <h3>{value}</h3>
      <p>{description}</p>
      {helpText ? <small>{helpText}</small> : null}
    </div>
  );
}

export default StatCard;
