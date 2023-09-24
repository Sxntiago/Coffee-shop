import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

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

  useEffect(() => {
    const newTotal = order.reduce(
      (acc, product) => product.price * product.qty + acc,
      0
    );
    setTotal(newTotal);
  }, [order]);

  const handleClickCategory = (id) => {
    const category = categories.filter((gory) => gory.id === id);
    setCurrentCategory(category[0]);
    router.push("/");
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleSetModal = () => {
    setModal(!modal);
  };

  const handleOrder = ({ categoryId, ...product }) => {
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

  const handleEditOrder = (id) => {
    const updateOrder = order.filter((productId) => productId.id === id);
    setProduct(updateOrder[0]);
    setModal(!modal);
  };

  const handleDeleteOrder = (id) => {
    const updateDeleteOrder = order.filter((productId) => productId.id !== id);
    setOrder(updateDeleteOrder);
  };

  const pushOrder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/orders", {
        order,
        total,
        name,
        date: Date.now().toString(),
      });
      setCurrentCategory(categories[0]);
      setOrder([]);
      setName("");
      setTotal(0);

      toast.success("Good Job, your order have been taken");

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        currentCategory,
        product,
        modal,
        order,
        name,
        total,
        pushOrder,
        setName,
        handleEditOrder,
        handleDeleteOrder,
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
