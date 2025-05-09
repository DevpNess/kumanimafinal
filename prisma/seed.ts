import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Crear usuario predeterminado (si no existe)
  await prisma.user.upsert({
    where: { email: 'admin@kumanima.com' },
    update: {},
    create: {
      email: 'admin@kumanima.com',
      name: 'Admin',
      lastName: 'Principal',
      nickName: 'admin',
      password: '123456', // ¡Cámbialo por un hash seguro en producción!
      avatar: null,
      emailVerified: null,
    },
  })

  // Crear MangaScraping predeterminado (si no existe)
  await prisma.mangaScraping.upsert({
    where: { name: 'EjemploScraper' },
    update: {},
    create: {
      name: 'EjemploScraper',
      domain: 'https://ejemplo.com',
      SelectorName: '.nombre-manga',
      SelectorDescription: '.descripcion-manga',
      SelectorStatus: '.estado-manga',
      SelectorType: '.tipo-manga',
      SelectorAuthor: '.autor-manga',
      SelectorScan: '.scan-manga',
      SelectorGenres: '.generos-manga',
      SelectorBanner: '.banner-manga',
      SelectorNumberChapters: '.capitulos-manga',
      SelectorImageChapter: '.imagen-capitulo',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })