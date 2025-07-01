const { PrismaClient } = require('@prisma/client')
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
    'Chainsaw Man', 'One Punch Man', 'Tokyo Ghoul',
    'Death Note', 'Fullmetal Alchemist', 'Fairy Tail', 'Black Clover',
    'The Promised Neverland', 'Dr. Stone', 'Fire Force'
  ]
  
  for (let i = 0; i < 20; i++) {
    const manga = await prisma.manga.create({
      data: {
        path: `/manga/${i+mangaTitles[i].toLowerCase().replace(/\s+/g, '-')+ i}`,
        cap: Math.floor(Math.random() * 500) + 1,
        title: `${mangaTitles[i]+ i}`,
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