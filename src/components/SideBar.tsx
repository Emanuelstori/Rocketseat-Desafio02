import { Button } from "./Button";
import { api } from '../services/api';
import '../styles/sidebar.scss';
import '../styles/global.scss';
import { useEffect, useState } from "react";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SidebarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ selectedGenreId, handleClickButton }: SidebarProps) {
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}