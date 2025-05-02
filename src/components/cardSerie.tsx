import React, { useState } from 'react'
import { EyeOpenIcon,ReaderIcon } from '@radix-ui/react-icons'

interface TimeType{
    pastDate: Date ;
}
function TimeDifference({pastDate}:TimeType) {
    const currentDate = new Date();
    if (!(pastDate instanceof Date) || !(currentDate instanceof Date)) {
        throw new Error('Los argumentos deben ser instancias de Date');
      }
      const timeDiffInMs = currentDate.getTime() - pastDate.getTime();

  const seconds = Math.floor(timeDiffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours   
 / 24);

  let timeAgo;
  if (days > 0) {
    timeAgo = `${days}   
 día${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    timeAgo = `${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    timeAgo = `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else {
    timeAgo = 'ahora mismo';
  }

  return <>Hace {timeAgo}</>;
}
interface Manga{
    name:string,
    pathSerie:string,
    pathImage:string,
    author:string,
    primaryChapter:{
        chapter:string,
        date:Date,
        url:string,
    },
    secondaryChapter:{
        chapter:string,
        date:Date,
        url:string,
    },
}
interface CardSerieProps{
    manga:Manga
}
export default function CardSerie(props:CardSerieProps) {
    const {manga} = props;
    return ( 
        <>
            
                <figure className="article UpdatedTitle-module_title block" data-glow>
                    <a href="" className='imagenSerieTitulo'>
                        <img src="/comics/spy-for-family/spy-for-family.webp" alt="" style={{borderRadius:'5px'}}/>
                        <div className="descripccionSerie">
                            <p className="descripccionSerieTitulo">{manga.name}</p>
                            <p className="descripccionSerieAutor">
                                {manga.author}
                            </p>
                        </div>
                    </a>
                    {manga.primaryChapter && 
                    <a className="capituloNuevo grid" href={manga.primaryChapter.url}>
                        <div className="numeroCapViews">
                            <p className="NCapitulo">#{manga.primaryChapter.chapter}</p>
                            <p className="NViews">
                                <span className='Nviews-text'><TimeDifference pastDate={manga.primaryChapter.date} /></span>
                            </p>
                        </div>
                        {/* <p className="textNcapitulo">Capitulo 59</p>
                            <div className="contenedorIdioma">
                                <span className="Idioma" title="Read in English">EN</span>
                            </div> 
                        */}
                    </a>
                    }    
                        
                        {manga.secondaryChapter && 
                    <a className="capituloNuevo grid" href={manga.secondaryChapter.url}>
                        <div className="numeroCapViews">
                            <p className="NCapitulo">#{manga.secondaryChapter.chapter}</p>
                            <p className="NViews">
                                <span className='Nviews-text'><TimeDifference pastDate={manga.secondaryChapter.date} /></span>
                            </p>
                        </div>
                        {/* <p className="textNcapitulo">Capitulo 59</p>
                            <div className="contenedorIdioma">
                                <span className="Idioma" title="Read in English">EN</span>
                            </div> 
                        */}
                    </a>
                    }
                    <div data-glow></div>
                </figure>
            
        </>
    )
}
