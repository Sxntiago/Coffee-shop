import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { Toast, toast } from "react-toastify";
const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);

  const getCategories = async () => {
    const { data } = await axios("/api/categories");
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCurrentCategory(categories[0]);
  }, [categories]);

  const handleClickCategory = (id) => {
    const category = categories.filter((gory) => gory.id === id);
    setCurrentCategory(category[0]);
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleSetModal = () => {
    setModal(!modal);
  };

  const handleOrder = ({ categoryId, image, ...product }) => {
    if (order.some((productState) => productState.id === product.id)) {
      const updateOrder = order.map((productState) =>
        productState.id === product.id ? product : productState
      );
      setOrder(updateOrder);
      toast.success("Changes Saved");
    } else {
      setOrder([...order, product]);
      toast.success("Added to Bag");
    }

    setModal(false);
  };

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        currentCategory,
        product,
        modal,
        order,
        handleOrder,
        handleSetModal,
        handleSetProduct,
        handleClickCategory,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
