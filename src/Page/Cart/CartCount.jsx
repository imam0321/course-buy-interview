import { RiDeleteBin5Line } from "react-icons/ri";
import { CartContext } from "../../ContextAPIs/CartProvider";
import { useContext } from "react";

const CartCount = () => {
  const {
    cart,
    quantity,
    totalCost,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useContext(CartContext);
  const { course_name, photo, discount_price } = cart[0].course;
  return (
    <>
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
                  <div className="flex text-center justify-center items-center py-2  w-[80%]">
                    <div className="mask">
                      <img
                        className="h-[40px] w-[70px]"
                        src={photo}
                        alt="Course"
                      />
                    </div>
                    <p className="text-[14.4px] px-[7px] text-center flex ">
                      {course_name}{" "}
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
                      value={quantity}
                      readOnly
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
    </>
  );
};

export default CartCount;
