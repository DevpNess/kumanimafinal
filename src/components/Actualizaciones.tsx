import CardSerie from "@/components/cardSerie";
import { MangaDB } from "@/types/manga";

interface ActualizacionesProps {
  mangas: MangaDB[];
}

export default function Actualizaciones({ mangas }: ActualizacionesProps) {
  return (
    <div className="gap-1 sm:col-span-12 md:col-span-8  lg:col-span-9 xl:col-span-9 col-span-12" >
      <div className="row" style={{ height: 80, marginBottom: 24, background: "linear-gradient(338deg, transparent, #420404)", display: 'flex', justifyContent: 'space-between' }}>
        <div className="col-6 heading style-1 titulo">Actualizaciones</div>
        <div className="col-6 v">
          <div className="vermas">Ver más</div>
        </div>
      </div>
      <div className='CardContent'>
        {mangas.map((manga) => (
          <CardSerie key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  );
} 