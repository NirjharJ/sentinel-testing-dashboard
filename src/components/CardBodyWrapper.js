export default function CardBodyWrapper({
  title = "card body title",
  children,
}) {
  return (
    <div className="card-body">
      <h4 class="card-title">{title}</h4>
      {children}
    </div>
  );
}
