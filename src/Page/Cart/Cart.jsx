/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RiDeleteBin5Line } from "react-icons/ri";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const { course_name, photo, trainer_data, discount_price } = cart[0].course;
  const [quantity, setQuantity] = useState(cart[0]?.quantity || 1);
  const totalCost = discount_price * quantity;

  useEffect(() => {
    // Update localStorage whenever cart changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    // Update the cart state
    const updatedCart = cart.map((item) =>
      item.id === cart[0].id ? { ...item, quantity: quantity + 1 } : item
    );
    setCart(updatedCart);
    window.location.reload();
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      // Update the cart state
      const updatedCart = cart.map((item) =>
        item.id === cart[0].id ? { ...item, quantity: quantity - 1 } : item
      );
      setCart(updatedCart);
      window.location.reload();
    }
  };

  return (
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
        Cart
      </h1>
      <div className="pt-p_16px">
        <div className="lg:flex items-start gap-3">
          <div className="w-full lg:w-[58%] bg-white border-2">
            <table className=" overflow-x-auto  w-full">
              <thead>
                <tr className="border-b-4 border-gray-300">
                  <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                    Course
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Price
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Quantity
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Sub Total
                  </th>
                </tr>
              </thead>

              <tbody className="overflow-x-auto ">
                <tr className="border-b border-gray-300 overflow-x-auto">
                  <td>
                    <div className="flex items-center justify-center ">
                      <div className="w-[20%] text-center flex items-center justify-center ">
                        <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
                      </div>
                      <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
                        <div className="mask">
                          <img
                            className="h-[40px] w-[70px]"
                            src={photo}
                            alt="Course"
                          />
                        </div>
                        <p className="text-[14.4px] px-[7px] text-center flex ">
                          {course_name}{" "}
                          <span className="hidden lg:flex ">
                            - {trainer_data.name}
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                      {discount_price}
                    </p>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <div className="border">
                        <button
                          onClick={() => handleDecreaseQuantity()}
                          className="px-4 w-[30px] font-bold font_standard my-1.5"
                        >
                          -
                        </button>
                      </div>
                      <div className="border-y">
                        <input
                          type="number"
                          className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                          defaultValue={quantity}
                        />
                      </div>
                      <div className="border">
                        <button
                          onClick={() => handleIncreaseQuantity()}
                          className="px-4 w-[30px] font-bold font_standard my-1.5"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                      {totalCost}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="lg:w-[41%] bg-white border-2 ">
            <div className="px-[30px]">
              <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                Cart Summary
              </h2>
              <div className="py-3 flex justify-between border-b border-gray-300">
                <p className="text-black font-bold">Total Price: {totalCost}</p>
                <p className="text-black font-bold"></p>
              </div>

              <Link
                to={`/checkout`}
                state={"bdt"}
                className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
