import { useTranslation } from "react-i18next";
import MenuList from "../components/Menu/MenuList"

const MenuPage = () => {
  const { t } = useTranslation();
  return (
    <>
    <h2 className="alignCenter title">{t('menu.title')}</h2>
    <MenuList />
    </>
  )
}

export default MenuPage