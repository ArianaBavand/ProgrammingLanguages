import { MongoClient, ObjectId } from 'mongodb'

const mongoUri = process.env.MONGODB_URI as string

async function connectToDatabase() {
  const client = await MongoClient.connect(mongoUri)
  const db = client.db()
  return { client, db }
}

export async function getAllEvents() {
  const { client, db } = await connectToDatabase()
  const eventsCollection = db.collection('events')
  const eventsData = await eventsCollection.find({}).toArray()
  client.close()
  return eventsData
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()
  return allEvents.filter(event => event.isFeatured)
}

export async function getEventById(id: string) {
  const { client, db } = await connectToDatabase()
  const event = await db.collection('events').findOne({ _id: id as unknown as ObjectId })
  await client.close()
  return event
}

interface DateFilter {
  year: number
  month: number
}

export async function getFilteredEvents(dateFilter: DateFilter) {
  const { year, month } = dateFilter
  const allEvents = await getAllEvents()

  return allEvents.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
  })
}
