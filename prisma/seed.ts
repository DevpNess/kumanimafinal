import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // =============================================
  // CREAR USUARIOS DE PRUEBA
  // =============================================
  console.log('👥 Creando usuarios de prueba...')
  
  const users = []
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.upsert({
      where: { email: `usuario${i}@kumanima.com` },
      update: {},
      create: {
        email: `usuario${i}@kumanima.com`,
        name: `Usuario`,
        lastName: `${i}`,
        nickName: `user${i}`,
        password: '123456', // ¡Cámbialo por un hash seguro en producción!
        avatar: `https://picsum.photos/seed/avatar${i}/200/200`,
        emailVerified: new Date(),
      },
    })
    users.push(user)
  }

  // Usuario admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@kumanima.com' },
    update: {},
    create: {
      email: 'admin@kumanima.com',
      name: 'Admin',
      lastName: 'Principal',
      nickName: 'admin',
      password: '123456', // ¡Cámbialo por un hash seguro en producción!
      avatar: null,
      emailVerified: new Date(),
    },
  })
  users.push(adminUser)

  // =============================================
  // CREAR STATUS MANGA
  // =============================================
  console.log('📊 Creando estados de manga...')
  
  const statuses = []
  const statusNames = ['En emisión', 'Finalizado', 'Pausado', 'Cancelado']
  
  for (const name of statusNames) {
    const status = await prisma.statusManga.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    statuses.push(status)
  }

  // =============================================
  // CREAR TIPOS MANGA
  // =============================================
  console.log('📚 Creando tipos de manga...')
  
  const types = []
  const typeNames = ['Shonen', 'Shoujo', 'Seinen', 'Josei', 'Kodomo', 'Yaoi', 'Yuri', 'Harem']
  
  for (const name of typeNames) {
    const type = await prisma.typeManga.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    types.push(type)
  }

  // =============================================
  // CREAR AUTORES
  // =============================================
  console.log('✍️ Creando autores...')
  
  const authors = []
  const authorNames = [
    'Eiichiro Oda', 'Masashi Kishimoto', 'Tite Kubo', 'Hirohiko Araki',
    'Yoshihiro Togashi', 'Akira Toriyama', 'Kentaro Miura', 'Takehiko Inoue',
    'Naoki Urasawa', 'Makoto Yukimura', 'Yusuke Murata', 'ONE'
  ]
  
  for (const name of authorNames) {
    const author = await prisma.authorManga.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    authors.push(author)
  }

  // =============================================
  // CREAR SCANS
  // =============================================
  console.log('🔍 Creando grupos de scan...')
  
  const scans = []
  const scanNames = [
    'MangaDex', 'MangaPlus', 'Viz Media', 'Kodansha Comics',
    'Yen Press', 'Seven Seas Entertainment', 'Dark Horse Comics',
    'Vertical Comics', 'Square Enix Manga', 'J-Novel Club'
  ]
  
  for (const name of scanNames) {
    const scan = await prisma.scanManga.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    scans.push(scan)
  }

  // =============================================
  // CREAR GÉNEROS
  // =============================================
  console.log('🏷️ Creando géneros...')
  
  const genres = []
  const genreNames = [
    'Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía', 'Horror',
    'Misterio', 'Romance', 'Ciencia Ficción', 'Slice of Life', 'Deportes',
    'Psicológico', 'Thriller', 'Supernatural', 'Mecha', 'Histórico',
    'Musical', 'Parodia', 'Gore', 'Ecchi', 'Harem', 'Isekai'
  ]
  
  for (const name of genreNames) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    genres.push(genre)
  }

  // =============================================
  // CREAR MANGAS
  // =============================================
  console.log('📖 Creando mangas de prueba...')
  
  const mangas = []
  const mangaTitles = [
    'One Piece', 'Naruto', 'Bleach', 'Dragon Ball', 'Hunter x Hunter',
    'Attack on Titan', 'My Hero Academia', 'Demon Slayer', 'Jujutsu Kaisen',
    'Chainsaw Man', 'Spy x Family', 'One Punch Man', 'Tokyo Ghoul',
    'Death Note', 'Fullmetal Alchemist', 'Fairy Tail', 'Black Clover',
    'The Promised Neverland', 'Dr. Stone', 'Fire Force'
  ]
  
  for (let i = 0; i < 20; i++) {
    const manga = await prisma.manga.create({
      data: {
        path: `/manga/${mangaTitles[i].toLowerCase().replace(/\s+/g, '-')}`,
        cap: Math.floor(Math.random() * 500) + 1,
        title: `Manga de prueba ${i + 1}`,
        description: `Descripción detallada de ${mangaTitles[i]}. Un manga increíble lleno de acción, aventura y personajes memorables.`,
        statusId: statuses[Math.floor(Math.random() * statuses.length)].id,
        typeId: types[Math.floor(Math.random() * types.length)].id,
        authorId: authors[Math.floor(Math.random() * authors.length)].id,
        scan: scans[Math.floor(Math.random() * scans.length)].id,
        banner: `https://picsum.photos/seed/${mangaTitles[i]}/400/600`,
        views: Math.floor(Math.random() * 100000),
        dayViews: Math.floor(Math.random() * 10000),
        weekViews: Math.floor(Math.random() * 50000),
        monthViews: Math.floor(Math.random() * 200000),
        likesCount: Math.floor(Math.random() * 5000),
        favoritesCount: Math.floor(Math.random() * 2000),
        seeLaterCount: Math.floor(Math.random() * 1000),
        releaseDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        updateLast: new Date(),
        updateNext: new Date(Date.now() + Math.floor(Math.random() * 100000000)),
      },
    })
    mangas.push(manga)
  }

  // =============================================
  // ASIGNAR GÉNEROS A MANGAS
  // =============================================
  console.log('🏷️ Asignando géneros a mangas...')
  
  for (const manga of mangas) {
    // Asignar 2-4 géneros aleatorios a cada manga
    const numGenres = Math.floor(Math.random() * 3) + 2
    const selectedGenres = genres.sort(() => 0.5 - Math.random()).slice(0, numGenres)
    
    for (const genre of selectedGenres) {
      await prisma.genreManga.create({
        data: {
          mangaId: manga.id,
          genreId: genre.id,
        },
      })
    }
  }

  // =============================================
  // CREAR RATINGS
  // =============================================
  console.log('⭐ Creando ratings...')
  
  for (const manga of mangas) {
    // Cada usuario califica algunos mangas aleatoriamente
    for (const user of users) {
      if (Math.random() > 0.7) { // 30% de probabilidad de que un usuario califique un manga
        await prisma.ratingManga.create({
          data: {
            userId: user.id,
            mangaId: manga.id,
            score: Math.floor(Math.random() * 5) + 1, // 1-5 estrellas
          },
        })
      }
    }
  }

  // =============================================
  // CREAR LIKES
  // =============================================
  console.log('❤️ Creando likes...')
  
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.6) { // 40% de probabilidad de like
        await prisma.mangaLike.create({
          data: {
            userId: user.id,
            mangaId: manga.id,
          },
        })
      }
    }
  }

  // =============================================
  // CREAR FAVORITOS
  // =============================================
  console.log('⭐ Creando favoritos...')
  
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.7) { // 30% de probabilidad de favorito
        await prisma.mangaFavorite.create({
          data: {
            userId: user.id,
            mangaId: manga.id,
          },
        })
      }
    }
  }

  // =============================================
  // CREAR VER MÁS TARDE
  // =============================================
  console.log('📋 Creando "Ver más tarde"...')
  
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.8) { // 20% de probabilidad de ver más tarde
        await prisma.mangaSeeLater.create({
          data: {
            userId: user.id,
            mangaId: manga.id,
          },
        })
      }
    }
  }

  // =============================================
  // CREAR MANGASCRAPING
  // =============================================
  console.log('🕷️ Creando configuraciones de scraping...')
  
  const scrapingConfigs = [
    {
      name: 'MangaDex Scraper',
      domain: 'https://mangadex.org',
      SelectorName: '.manga-title',
      SelectorDescription: '.manga-description',
      SelectorStatus: '.manga-status',
      SelectorType: '.manga-type',
      SelectorAuthor: '.manga-author',
      SelectorScan: '.manga-scan',
      SelectorGenres: '.manga-genres',
      SelectorBanner: '.manga-banner',
      SelectorNumberChapters: '.manga-chapters',
      SelectorImageChapter: '.chapter-image',
    },
    {
      name: 'MangaPlus Scraper',
      domain: 'https://mangaplus.shueisha.co.jp',
      SelectorName: '.title',
      SelectorDescription: '.description',
      SelectorStatus: '.status',
      SelectorType: '.type',
      SelectorAuthor: '.author',
      SelectorScan: '.scan',
      SelectorGenres: '.genres',
      SelectorBanner: '.banner',
      SelectorNumberChapters: '.chapters',
      SelectorImageChapter: '.image',
    },
    {
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
    }
  ]
  
  for (const config of scrapingConfigs) {
    await prisma.mangaScraping.upsert({
      where: { name: config.name },
      update: {},
      create: config,
    })
  }

  // =============================================
  // CREAR SESIONES DE PRUEBA
  // =============================================
  console.log('🕒 Creando sesiones de prueba...')
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const inicio = new Date(Date.now() - Math.floor(Math.random() * 100000000));
      const fin = new Date(inicio.getTime() + Math.floor(Math.random() * 2 * 60 * 60 * 1000)); // hasta 2h después
      await prisma.sesion.create({
        data: {
          usuarioId: user.id,
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${90 + Math.floor(Math.random() * 10)}.0.0.0 Safari/537.36`,
          inicio,
          fin,
          sessionToken: `token-${user.id}-${i}`,
          expires: new Date(fin.getTime() + 60 * 60 * 1000),
        },
      });
    }
  }

  await prisma.pageStats.createMany({
    data: [
      { date: new Date('2024-04-05'), totalRevenue: 1250, newCustomers: 1234, activeAccounts: 45678, growthRate: 4.5 },
      { date: new Date('2024-04-17'), totalRevenue: 1300, newCustomers: 1200, activeAccounts: 46000, growthRate: 4.7 },
      { date: new Date('2024-04-23'), totalRevenue: 1400, newCustomers: 1100, activeAccounts: 47000, growthRate: 4.8 },
      { date: new Date('2024-04-29'), totalRevenue: 1500, newCustomers: 1150, activeAccounts: 48000, growthRate: 5.0 },
      { date: new Date('2024-05-05'), totalRevenue: 1600, newCustomers: 1250, activeAccounts: 49000, growthRate: 5.2 },
      { date: new Date('2024-05-11'), totalRevenue: 1700, newCustomers: 1300, activeAccounts: 50000, growthRate: 5.3 },
      { date: new Date('2024-05-17'), totalRevenue: 1800, newCustomers: 1350, activeAccounts: 51000, growthRate: 5.5 },
      { date: new Date('2024-05-23'), totalRevenue: 1900, newCustomers: 1400, activeAccounts: 52000, growthRate: 5.7 },
      { date: new Date('2024-05-29'), totalRevenue: 2000, newCustomers: 1450, activeAccounts: 53000, growthRate: 5.8 },
      { date: new Date('2024-06-04'), totalRevenue: 2100, newCustomers: 1500, activeAccounts: 54000, growthRate: 6.0 },
      { date: new Date('2024-06-10'), totalRevenue: 2200, newCustomers: 1550, activeAccounts: 55000, growthRate: 6.2 },
      { date: new Date('2024-06-16'), totalRevenue: 2300, newCustomers: 1600, activeAccounts: 56000, growthRate: 6.3 },
      { date: new Date('2024-06-22'), totalRevenue: 2400, newCustomers: 1650, activeAccounts: 57000, growthRate: 6.5 },
      { date: new Date('2024-06-29'), totalRevenue: 2500, newCustomers: 1700, activeAccounts: 58000, growthRate: 6.7 },
    ],
    skipDuplicates: true,
  });

  console.log('✅ ¡Seed completado exitosamente!')
  console.log(`📊 Resumen:`)
  console.log(`   - ${users.length} usuarios creados`)
  console.log(`   - ${statuses.length} estados de manga`)
  console.log(`   - ${types.length} tipos de manga`)
  console.log(`   - ${authors.length} autores`)
  console.log(`   - ${scans.length} grupos de scan`)
  console.log(`   - ${genres.length} géneros`)
  console.log(`   - ${mangas.length} mangas`)
  console.log(`   - ${scrapingConfigs.length} configuraciones de scraping`)
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })