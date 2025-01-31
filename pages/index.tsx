import EventList from '@/components/events/event-list'
import NewsletterRegistration from '@/components/input/newsletter-registration'
import { connectDataBase, getFeaturedEvents } from '@/helpers/db-util'
import Head from 'next/head'

interface Event {
  _id: string
  title: string
  description: string
  location: string
  date: string
  image: string
  isFeatured: boolean
}

export interface HomePageProps {
  events: Event[]
}

export default function HomePage(props: HomePageProps) {
  return (
    <div>
      <Head>
        <title>Awesome Events</title>
        <meta
          name='description'
          content='Find a lot of awesome events that allow you to evolve... '
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps() {
  const client = await connectDataBase()
  const events = await getFeaturedEvents(client)

  return {
    props: {
      events: events
    },
    revalidate: 1800
  }
}
