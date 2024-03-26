import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import classes from './MenuList.module.css';
import { TMeal } from '../../types/types';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { useTranslation } from "react-i18next";

const MenuList = () => {
  const [menu, setMenu] = useState<TMeal[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        let list: TMeal[] = [];
        const querySnapshot = await getDocs(collection(db, "meals"));

        if (querySnapshot.empty) {
          throw new Error('Коллекции не существует или она пуста');
        }

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            title: data.title,
            description: data.description,
            price: data.price,
            img: data.img,
            id: doc.id
          })
        });
        setMenu(list);
      } catch (error) {
        setError('Ошибка загрузки');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData()
  }, []);

  if (isLoading && !error) {
    return <p className="alignCenter title">{t('load')}...</p>
  }

  if (!isLoading && menu.length < 1 && error) {
    return <p className="alignCenter title">Ошибка загрузки. Попробуйте снова</p>
  }

  return (
    <>
      {menu.length > 0 && (
        <div className="container">
          <ul className={classes.menu}>
            {menu.map(item => <MenuItem key={item.id} item={item} />)}
          </ul>
        </div>
      )}
    </>
  )
}

export default MenuList