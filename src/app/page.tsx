import HomeClient from "@/components/HomeClient";
import { MangaDB, MangaApiResponse } from "@/types/manga";

export default async function Home() {
  try {
    // Usar URL absoluta directa
    const res = await fetch("http://localhost:3000/api/series/manga", { 
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      // Devolver datos de ejemplo si la API falla
      const fallbackMangas: MangaDB[] = [
        {
          id: 1,
          path: "/manga/one-piece",
          cap: 1000,
          title: "One Piece",
          name: "One Piece",
          description: "Un manga épico de piratas",
          statusId: 1,
          typeId: 1,
          authorId: 1,
          scan: 1,
          banner: "/media/manga/manga-img-1.png",
          pathImage: "/media/manga/manga-img-1.png",
          pathSerie: "/manga/1",
          author: "Eiichiro Oda",
          views: 100000,
          dayViews: 10000,
          weekViews: 50000,
          monthViews: 200000,
          likesCount: 5000,
          favoritesCount: 2000,
          seeLaterCount: 1000,
          releaseDate: new Date().toISOString(),
          updateLast: new Date().toISOString(),
          primaryChapter: {
            chapter: "1000",
            date: new Date(),
            url: "/manga/1/capitulo/1000"
          },
          secondaryChapter: {
            chapter: "999",
            date: new Date(Date.now() - 24 * 60 * 60 * 1000),
            url: "/manga/1/capitulo/999"
          }
        }
      ];
      return <HomeClient mangas={fallbackMangas} />;
    }
    
    const { mangas }: MangaApiResponse = await res.json();
    return <HomeClient mangas={mangas} />;
  } catch (error) {
    console.error('Error fetching mangas:', error);
    // Devolver datos de ejemplo si hay error
    const fallbackMangas: MangaDB[] = [
      {
        id: 1,
        path: "/manga/one-piece",
        cap: 1000,
        title: "One Piece",
        name: "One Piece",
        description: "Un manga épico de piratas",
        statusId: 1,
        typeId: 1,
        authorId: 1,
        scan: 1,
        banner: "/media/manga/manga-img-1.png",
        pathImage: "/media/manga/manga-img-1.png",
        pathSerie: "/manga/1",
        author: "Eiichiro Oda",
        views: 100000,
        dayViews: 10000,
        weekViews: 50000,
        monthViews: 200000,
        likesCount: 5000,
        favoritesCount: 2000,
        seeLaterCount: 1000,
        releaseDate: new Date().toISOString(),
        updateLast: new Date().toISOString(),
        primaryChapter: {
          chapter: "1000",
          date: new Date(),
          url: "/manga/1/capitulo/1000"
        },
        secondaryChapter: {
          chapter: "999",
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          url: "/manga/1/capitulo/999"
        }
      }
    ];
    return <HomeClient mangas={fallbackMangas} />;
  }
}