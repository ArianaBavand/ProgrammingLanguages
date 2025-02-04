import classes from './event-summary.module.css';
type EventSummaryProps = {
  title: string;
};

export default function EventSummary(props: EventSummaryProps) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}
