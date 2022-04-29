import { fetchCatPics } from './services/fetch';
import { useState, useEffect } from 'react';

export default function App() {
  const [catPics, setCatPics] = useState([]);
  useEffect(() => {
    const getCatPics = async () => {
      const data = await fetchCatPics();
      setCatPics(data);
    };
    getCatPics();
  }, []);

  return (
    <>
      <h1>The Cat Pic Compendium</h1>

      <div className="list-container">
        {catPics.map((catPic) => (
          <img key={catPic.id} src={`${catPic.url}`} alt={`cat image`} />
        ))}
      </div>
    </>
  );
}
