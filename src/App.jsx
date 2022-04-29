import { fetchCatPics } from './services/fetch';
import { useState, useEffect } from 'react';

export default function App() {
  const [catPics, setCatPics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getCatPics = async () => {
      const data = await fetchCatPics();
      setCatPics(data);
      // loop through cat pics, if it has one or more types, add it to a type set. When complete convert set to an array
      const catSet = new Set();
      for (const catPic of data) {
        if (catPic.categories) {
          for (const category of catPic.categories) {
            catSet.add(category.name);
          }
        }
      }
      setCategories(['all', ...Array.from(catSet)]);
    };
    getCatPics();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFiltered(catPics);
    } else {
      setFiltered(
        catPics.filter(
          (catPic) =>
            catPic.categories &&
            catPic.categories.some(
              (category) => category.name === selectedCategory
            )
        )
      );
    }
  }, [selectedCategory, catPics]);

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <>
      <h1>The Cat Pic Compendium</h1>
      <div className={'controls-container'}>
        <select
          name={'type-select'}
          id="type-select"
          value={selectedCategory}
          onChange={handleSelect}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="list-container">
        {filtered.map((catPic) => (
          <img
            key={catPic.id}
            width={250}
            src={`${catPic.url}`}
            alt={`cat image`}
          />
        ))}
      </div>
    </>
  );
}
