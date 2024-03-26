import { useTranslation } from 'react-i18next';
import { TMeal, TMealText, TOrder } from '../types/types';

const useTranslationItem = (item: TMeal | TOrder) => {
  const { i18n } = useTranslation();

  const getTranslatedText = (text: TMealText) => {
    if (i18n.language === 'ru' && text.ru) {
      return text.ru;
    } else if (i18n.language === 'en' && text.en) {
      return text.en;
    }
    return '';
  };

  return {
    getTranslatedText
  };
};

export default useTranslationItem;