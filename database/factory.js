'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.name({ nationality: 'it' }),
    email: faker.email(),
    password: '123456',
  }
})

Factory.blueprint('App/Models/Event', (faker) => {
  const now = new Date()
  const thisYear = now.getFullYear()
  const month = Math.random() * (11 - 0) + 0
  const day = Math.random() * (27 - 1) + 1
  const date = new Date(thisYear, month, day)

  return {
    owner: faker.name({ nationality: 'it' }),
    email: faker.email({ domain: 'gmail.com' }),
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    date,
  }
})

Factory.blueprint('App/Models/Schedule', (faker) => {
  const hour = Math.ceil(Math.random() * (20 - 8) + 8)
  return { value: `${hour}:00:00` }
})

Factory.blueprint('App/Models/Equipment', (faker) => {
  return {
    name: faker.word(),
  }
})

Factory.blueprint('App/Models/DisableDay', async (faker) => {
  const now = new Date()
  const thisYear = now.getFullYear()
  const month = Math.random() * (11 - 0) + 0
  const day = Math.random() * (27 - 1) + 1
  const date = new Date(thisYear, month, day)

  const user = await Factory.model('App/Models/User').create()

  return {
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    date,
    user_id: user.id,
  }
})

Factory.blueprint('event_schedule', async (faker) => {
  const schedule = await Factory.model('App/Models/Schedule').create()
  const event = await Factory.model('App/Models/Event').create()

  return {
    schedule_id: schedule.id,
    event_id: event.id,
  }
})

Factory.blueprint('equipment_event', async (faker, i, data) => {
  return {
    event_id: data[i],
    equipment_id: data[i],
  }
})
