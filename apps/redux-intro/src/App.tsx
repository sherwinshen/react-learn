import { Provider, useSelector } from "react-redux";
import store from "./store";
import CreateCustomer from "./customers/CreateCustomer";
import Customer from "./customers/Customer";
import AccountOperations from "./accounts/AccountOperations";
import BalanceDisplay from "./accounts/BalanceDisplay";

function ReduxIntro() {
  const fullName = useSelector((state: any) => state.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank </h1>
      {!fullName ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ReduxIntro />
    </Provider>
  );
}

export default App;
