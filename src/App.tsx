import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { Cart } from "./components/Cart/Cart";
import { Header } from "./components/Layout/Header";
import { Meals } from "./components/Meals/Meals";
import { store } from "./store/store";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Provider store={store}>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Provider>
  );
}

export default App;
