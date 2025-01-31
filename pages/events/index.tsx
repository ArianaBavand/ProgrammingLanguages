import Head from 'next/head'
import EventList from '@/components/events/event-list'
import EventSearch from '@/components/events/events-search'
import { useRouter } from 'next/router'
import { connectDataBase, getAllEvents } from '@/helpers/db-util'

interface Event {
  _id: string
  title: string
  description: string
  location: string
  date: string
  image: string
  isFeatured: boolean
}

interface AllEventPageProps {
  events: Event[]
}

export default function AllEventsPage(props: AllEventPageProps) {
  const router = useRouter()
  const { events } = props

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name='description' content='You can browse all of the events here... ' />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  )
}

export async function getStaticProps() {
  const client = await connectDataBase()
  const events = await getAllEvents(client)

  return {
    props: {
      events: events
    },
    revalidate: 60
  }
}
