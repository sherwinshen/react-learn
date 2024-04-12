const initialCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerReducer = (state = initialCustomer, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload?.fullName,
        nationalID: action.payload?.nationalID,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
};

export default customerReducer;

export const createCustomer = (fullName: string, nationalID: string) => {
  return { type: "customer/createCustomer", payload: { fullName, nationalID } };
};

export function updateName(fullName: string) {
  return { type: "customer/updateName", payload: fullName };
}
