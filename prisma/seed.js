const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // =============================================
  // USUARIOS Y AUTENTICACIÓN
  // =============================================
  console.log('👥 [1/12] Creando usuarios de prueba...')
  
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

  console.log('🔑 [2/12] Creando cuentas, sesiones y autenticadores de prueba...')
  // Accounts
  const accounts = []
  for (const user of users) {
    const acc = await prisma.account.upsert({
      where: { provider_providerAccountId: { provider: 'test', providerAccountId: user.id } },
      update: {},
      create: {
        userId: user.id,
        type: 'oauth',
        provider: 'test',
        providerAccountId: user.id,
        access_token: 'token_' + user.id,
        refresh_token: 'refresh_' + user.id,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'Bearer',
        scope: 'read',
        id_token: 'idtoken_' + user.id,
        session_state: 'active',
      },
    })
    accounts.push(acc)
  }
  // Sessions
  const sessions = []
  for (const user of users) {
    const sess = await prisma.session.upsert({
      where: { sessionToken: 'session_' + user.id },
      update: {},
      create: {
        sessionToken: 'session_' + user.id,
        userId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
    sessions.push(sess)
  }
  // Authenticators
  const authenticators = []
  for (const user of users) {
    const auth = await prisma.authenticator.upsert({
      where: { credentialID: 'cred_' + user.id },
      update: {},
      create: {
        credentialID: 'cred_' + user.id,
        userId: user.id,
        providerAccountId: user.id,
        credentialPublicKey: 'publickey_' + user.id,
        counter: 1,
        credentialDeviceType: 'singleDevice',
        credentialBackedUp: false,
        transports: 'usb',
      },
    })
    authenticators.push(auth)
  }
  // VerificationTokens
  const verificationTokens = []
  for (let i = 0; i < 3; i++) {
    const vt = await prisma.verificationToken.upsert({
      where: { identifier_token: { identifier: 'user' + i, token: 'token' + i } },
      update: {},
      create: {
        identifier: 'user' + i,
        token: 'token' + i,
        expires: new Date(Date.now() + 1000 * 60 * 60),
      },
    })
    verificationTokens.push(vt)
  }

  // =============================================
  // CATÁLOGO DE MANGA
  // =============================================
  console.log('📊 [3/10] Creando estados de manga...')
  
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

  console.log('📚 [4/10] Creando tipos de manga...')
  
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

  console.log('✍️ [5/10] Creando autores...')
  
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

  console.log('🔍 [6/10] Creando grupos de scan...')
  
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

  console.log('🏷️ [7/10] Creando géneros...')
  
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

  console.log('📖 [8/10] Creando mangas de prueba...')
  
  const mangas = []
  const mangaTitles = [
    'One Piece', 'Naruto', 'Bleach', 'Dragon Ball', 'Hunter x Hunter',
    'Attack on Titan', 'My Hero Academia', 'Demon Slayer', 'Jujutsu Kaisen',
    'Chainsaw Man', 'One Punch Man', 'Tokyo Ghoul',
    'Death Note', 'Fullmetal Alchemist', 'Fairy Tail', 'Black Clover',
    'The Promised Neverland', 'Dr. Stone', 'Fire Force'
  ]
  
  for (let i = 0; i < mangaTitles.length; i++) {
    const title = `${mangaTitles[i]+ i}`;
    const manga = await prisma.manga.upsert({
      where: { title },
      update: {},
      create: {
        path: `/manga/${i+mangaTitles[i].toLowerCase().replace(/\s+/g, '-')+ i}`,
        cap: Math.floor(Math.random() * 500) + 1,
        title,
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

  console.log('🏷️ [9/10] Asignando géneros a mangas...')
  
  for (const manga of mangas) {
    // Asignar 2-4 géneros aleatorios a cada manga
    const numGenres = Math.floor(Math.random() * 3) + 2
    const selectedGenres = genres.sort(() => 0.5 - Math.random()).slice(0, numGenres)
    
    for (const genre of selectedGenres) {
      const exists = await prisma.genreManga.findUnique({
        where: {
          mangaId_genreId: {
            mangaId: manga.id,
            genreId: genre.id,
          },
        },
      })
      if (!exists) {
        await prisma.genreManga.create({
          data: {
            mangaId: manga.id,
            genreId: genre.id,
          },
        })
      }
    }
  }

  // =============================================
  // INTERACCIONES Y ANALÍTICA DE MANGA
  // =============================================
  console.log('⭐ [10/10] Creando ratings, likes, favoritos y "ver más tarde"...')
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.7) { // 30% de probabilidad de que un usuario califique un manga
        const exists = await prisma.ratingManga.findUnique({
          where: {
            userId_mangaId: {
              userId: user.id,
              mangaId: manga.id,
            },
          },
        })
        if (!exists) {
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
  }

  // =============================================
  // CREAR LIKES
  // =============================================
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.6) { // 40% de probabilidad de like
        const exists = await prisma.mangaLike.findUnique({
          where: {
            userId_mangaId: {
              userId: user.id,
              mangaId: manga.id,
            },
          },
        })
        if (!exists) {
          await prisma.mangaLike.create({
            data: {
              userId: user.id,
              mangaId: manga.id,
            },
          })
        }
      }
    }
  }

  // =============================================
  // CREAR FAVORITOS
  // =============================================
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.7) { // 30% de probabilidad de favorito
        const exists = await prisma.mangaFavorite.findUnique({
          where: {
            userId_mangaId: {
              userId: user.id,
              mangaId: manga.id,
            },
          },
        })
        if (!exists) {
          await prisma.mangaFavorite.create({
            data: {
              userId: user.id,
              mangaId: manga.id,
            },
          })
        }
      }
    }
  }

  // =============================================
  // CREAR VER MÁS TARDE
  // =============================================
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.8) { // 20% de probabilidad de ver más tarde
        const exists = await prisma.mangaSeeLater.findUnique({
          where: {
            userId_mangaId: {
              userId: user.id,
              mangaId: manga.id,
            },
          },
        })
        if (!exists) {
          await prisma.mangaSeeLater.create({
            data: {
              userId: user.id,
              mangaId: manga.id,
            },
          })
        }
      }
    }
  }

  // =============================================
  // SCRAPING Y MÉTRICAS AVANZADAS
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

  console.log('📈 Creando métricas y analítica avanzada...')

  // Crear sesiones de usuario
  const sesiones = []
  for (const user of users) {
    const sesion = await prisma.sesion.create({
      data: {
        usuarioId: user.id,
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        inicio: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
        fin: new Date(),
      },
    })
    sesiones.push(sesion)
  }

  // Crear páginas vistas para cada sesión
  const paginasVista = []
  for (const sesion of sesiones) {
    for (let i = 0; i < 3; i++) {
      const pagina = await prisma.paginaVista.create({
        data: {
          sesionId: sesion.id,
          url: `/manga/${Math.floor(Math.random() * mangas.length)}`,
          referrer: i === 0 ? null : '/inicio',
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000)),
        },
      })
      paginasVista.push(pagina)
    }
  }

  // Crear eventos para cada página vista
  for (const pagina of paginasVista) {
    await prisma.evento.create({
      data: {
        paginaVistaId: pagina.id,
        tipo: 'click',
        descripcion: 'Click en botón de prueba',
        timestamp: new Date(),
      },
    })
    await prisma.evento.create({
      data: {
        paginaVistaId: pagina.id,
        tipo: 'scroll',
        descripcion: 'Scroll hasta el final',
        timestamp: new Date(),
      },
    })
  }

  // Crear errores técnicos
  for (const user of users) {
    if (Math.random() > 0.7) {
      await prisma.errorTecnico.create({
        data: {
          usuarioId: user.id,
          mensaje: 'Error de prueba en la aplicación',
          url: '/manga/1',
          stack: 'Error: Prueba\n    at main (seed.js:1:1)',
          timestamp: new Date(),
        },
      })
    }
  }

  // Crear tiempos de carga
  for (const user of users) {
    await prisma.tiempoCarga.create({
      data: {
        usuarioId: user.id,
        url: '/manga/1',
        duracionMs: Math.floor(Math.random() * 2000) + 500,
        timestamp: new Date(),
      },
    })
  }

  // =============================================
  // CREAR MangaRating (analítica avanzada)
  // =============================================
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.8) {
        const exists = await prisma.mangaRating.findUnique({
          where: {
            mangaId_usuarioId: {
              mangaId: manga.id,
              usuarioId: user.id,
            },
          },
        })
        if (!exists) {
          await prisma.mangaRating.create({
            data: {
              mangaId: manga.id,
              usuarioId: user.id,
              puntuacion: Math.floor(Math.random() * 5) + 1,
              timestamp: new Date(),
            },
          })
        }
      }
    }
  }

  // =============================================
  // CREAR MangaFavorito (analítica avanzada)
  // =============================================
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.9) {
        const exists = await prisma.mangaFavorito.findUnique({
          where: {
            mangaId_usuarioId: {
              mangaId: manga.id,
              usuarioId: user.id,
            },
          },
        })
        if (!exists) {
          await prisma.mangaFavorito.create({
            data: {
              mangaId: manga.id,
              usuarioId: user.id,
              timestamp: new Date(),
            },
          })
        }
      }
    }
  }

  // Crear comentarios de manga (pueden repetirse)
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.85) {
        await prisma.mangaComentario.create({
          data: {
            mangaId: manga.id,
            usuarioId: user.id,
            comentario: '¡Gran manga! Me encanta.',
            timestamp: new Date(),
          },
        })
      }
    }
  }

  // Crear compartidos de manga (MangaCompartido)
  const plataformas = ['twitter', 'facebook', 'whatsapp', 'telegram']
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.95) {
        await prisma.mangaCompartido.create({ // No hay restricción única, se puede repetir
          data: {
            mangaId: manga.id,
            usuarioId: user.id,
            plataforma: plataformas[Math.floor(Math.random() * plataformas.length)],
            timestamp: new Date(),
          },
        })
      }
    }
  }

  // Crear vistas de manga (pueden repetirse)
  for (const manga of mangas) {
    for (const user of users) {
      if (Math.random() > 0.5) {
        await prisma.mangaView.create({
          data: {
            mangaId: manga.id,
            usuarioId: user.id,
            timestamp: new Date(),
          },
        })
      }
    }
  }

  // =============================================
  // PAGE STATS
  // =============================================
  console.log('📊 Creando métricas de página (PageStats)...')
  const pageStats = []
  for (let i = 0; i < 5; i++) {
    const ps = await prisma.pageStats.upsert({
      where: { date: new Date(Date.now() - i * 1000 * 60 * 60 * 24) },
      update: {},
      create: {
        date: new Date(Date.now() - i * 1000 * 60 * 60 * 24),
        totalRevenue: Math.random() * 1000,
        newCustomers: Math.floor(Math.random() * 100),
        activeAccounts: Math.floor(Math.random() * 100),
        growthRate: Math.random(),
      },
    })
    pageStats.push(ps)
  }

  // =============================================
  // RESUMEN FINAL
  // =============================================
  console.log('✅ ¡Seed completado exitosamente!')
  console.log('📊 Resumen:')
  console.log(`   - Usuarios: ${users.length}`)
  console.log(`   - Estados de manga: ${statuses.length}`)
  console.log(`   - Tipos de manga: ${types.length}`)
  console.log(`   - Autores: ${authors.length}`)
  console.log(`   - Grupos de scan: ${scans.length}`)
  console.log(`   - Géneros: ${genres.length}`)
  console.log(`   - Mangas: ${mangas.length}`)
  // Contar relaciones
  const genreMangaCount = await prisma.genreManga.count()
  const ratingMangaCount = await prisma.ratingManga.count()
  const mangaLikeCount = await prisma.mangaLike.count()
  const mangaFavoriteCount = await prisma.mangaFavorite.count()
  const mangaSeeLaterCount = await prisma.mangaSeeLater.count()
  const mangaRatingCount = await prisma.mangaRating.count()
  const mangaFavoritoCount = await prisma.mangaFavorito.count()
  const mangaComentarioCount = await prisma.mangaComentario.count()
  const mangaCompartidoCount = await prisma.mangaCompartido.count()
  const mangaViewCount = await prisma.mangaView.count()
  const scrapingCount = await prisma.mangaScraping.count()
  const sesionCount = await prisma.sesion.count()
  const paginaVistaCount = await prisma.paginaVista.count()
  const eventoCount = await prisma.evento.count()
  const errorTecnicoCount = await prisma.errorTecnico.count()
  const tiempoCargaCount = await prisma.tiempoCarga.count()
  const accountCount = await prisma.account.count()
  const sessionCount = await prisma.session.count()
  const authenticatorCount = await prisma.authenticator.count()
  const verificationTokenCount = await prisma.verificationToken.count()
  const pageStatsCount = await prisma.pageStats.count()
  console.log(`   - Relaciones Manga-Género: ${genreMangaCount}`)
  console.log(`   - Ratings de manga: ${ratingMangaCount}`)
  console.log(`   - Likes de manga: ${mangaLikeCount}`)
  console.log(`   - Favoritos de manga: ${mangaFavoriteCount}`)
  console.log(`   - Ver más tarde: ${mangaSeeLaterCount}`)
  console.log(`   - Ratings avanzados: ${mangaRatingCount}`)
  console.log(`   - Favoritos avanzados: ${mangaFavoritoCount}`)
  console.log(`   - Comentarios: ${mangaComentarioCount}`)
  console.log(`   - Compartidos: ${mangaCompartidoCount}`)
  console.log(`   - Vistas de manga: ${mangaViewCount}`)
  console.log(`   - Configuraciones de scraping: ${scrapingCount}`)
  console.log(`   - Sesiones: ${sesionCount}`)
  console.log(`   - Páginas vistas: ${paginaVistaCount}`)
  console.log(`   - Eventos: ${eventoCount}`)
  console.log(`   - Errores técnicos: ${errorTecnicoCount}`)
  console.log(`   - Tiempos de carga: ${tiempoCargaCount}`)
  console.log(`   - Cuentas (Account): ${accountCount}`)
  console.log(`   - Sesiones (Session): ${sessionCount}`)
  console.log(`   - Autenticadores (Authenticator): ${authenticatorCount}`)
  console.log(`   - Tokens de verificación: ${verificationTokenCount}`)
  console.log(`   - Métricas de página (PageStats): ${pageStatsCount}`)
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 