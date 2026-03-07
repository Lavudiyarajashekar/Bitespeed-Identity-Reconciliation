import prisma from "../database/prisma"

const identifyService = async (email?: string, phoneNumber?: string) => {

  // find matching contacts
  const contacts = await prisma.contact.findMany({
  where: {
    OR: [
      ...(email ? [{ email }] : []),
      ...(phoneNumber ? [{ phoneNumber }] : [])
    ]
  },
  orderBy: {
    createdAt: "asc"
  }
})

  // CASE 1 — No contacts exist
  if (contacts.length === 0) {

   const newContact = await prisma.contact.create({
  data: {
    email: email ?? null,
    phoneNumber: phoneNumber ?? null,
    linkPrecedence: "primary"
  }
})

    return {
      contact: {
        primaryContactId: newContact.id,
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: []
      }
    }
  }

  // find primary contact
  const primary =
  contacts.find(c => c.linkPrecedence === "primary") ??
  contacts[0]

  if (!primary) {
  throw new Error("Primary contact not found")
}

  // check if new data exists
  const emailExists = contacts.some(c => c.email === email)
  const phoneExists = contacts.some(c => c.phoneNumber === phoneNumber)

  let newSecondary = null

  if (!emailExists || !phoneExists) {

    newSecondary = await prisma.contact.create({
  data: {
    email: email ?? null,
    phoneNumber: phoneNumber ?? null,
    linkedId: primary.id,
    linkPrecedence: "secondary"
  }
})

    contacts.push(newSecondary)
  }

  const allEmails = [...new Set(contacts.map(c => c.email).filter(Boolean))]
  const allPhones = [...new Set(contacts.map(c => c.phoneNumber).filter(Boolean))]
  const secondaryIds = contacts
    .filter(c => c.linkPrecedence === "secondary")
    .map(c => c.id)

  return {
    contact: {
      primaryContactId: primary.id,
      emails: allEmails,
      phoneNumbers: allPhones,
      secondaryContactIds: secondaryIds
    }
  }
}

export default identifyService