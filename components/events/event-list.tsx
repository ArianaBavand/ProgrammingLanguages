import classes from './event-list.module.css'
import EventItem from './event-item'
import type { HomePageProps } from '@/pages'

export default function EventList(props: { items: HomePageProps['events'] }) {
  const { items } = props

  return (
    <ul className={classes.list}>
      {items.map(event => (
        <EventItem
          key={event._id}
          id={event._id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  )
}
