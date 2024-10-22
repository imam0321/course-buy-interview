import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const { state } = useLocation();
  const { formData, cartInfo } = state || {};
  console.log(cartInfo?.name);

  return (
    <div className=" m-mt_16px">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
        <div className="bg-white lg:p-p_30px w-full  ">
          <div className="text-center  flex flex-col justify-center items-center ">
            <p className="text-xl font-bold">Order Information</p>
            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
              Order Id:
              <span className="font-semibold">{formData?.formNo}</span>
            </p>
          </div>
          <div className="w-full border flex flex-col md:flex-row md:items-start   md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4  ">
            <div className="md:text-base text-sm flex-1  font-semibold   md:border-r-2 md:border-black md:pr-10">
              <p className="font-bold md:mb-4 w-full">
                Checkout page information{" "}
              </p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Full Name :</p>
                  <p className="text-start">{cartInfo?.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Email :</p>
                  <p>{formData?.email}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Phone :</p>
                  <p className="text-start">{formData?.mobile}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>School :</p>
                  <p className="text-start">{formData?.school}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>gender :</p>
                  <p className="text-start">{formData?.gender}</p>
                </div>
                <div className="flex flex-col">
                  <p>Present Address :</p>
                  <p className="text-end">{formData?.presentAddress}</p>
                </div>
                <div className="flex flex-col">
                  <p>Permanent Address :</p>
                  <p className="text-end">{formData?.permanentAddress}</p>
                </div>
              </div>
            </div>

            <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
              <div className="space-y-1 mt-7 w-full">
                <div className="flex items-center justify-between">
                  <p>Father Name :</p>
                  <p className="text-start">{formData?.parentName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Father Phone :</p>
                  <p className="text-start">{formData?.parentNumber}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Nid :</p>
                  <p className="text-start">{formData?.nid}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Date of Birth :</p>
                  <p>{formData?.dob}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>BloodGroup :</p>
                  <p className="text-start">{cartInfo?.blood_group}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Guardian Name :</p>
                  <p>{formData?.guardianName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Guardian Number :</p>
                  <p>{formData?.guardianPhone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:my-8 md:my-6 my-8 px-p_4px">
            <p className=" md:my-2 font-semibold">Courses:</p>
            <table className="overflow-x-auto border w-full">
              <thead className="b w-full">
                <tr className="text-sm ">
                  <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border ">
                    Image
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Course Name
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Student Name
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
                    Quantity
                  </th>
                  <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                    Price
                  </th>
                  <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="md:text-base text-sm font-semibold">
                <tr>
                  <td className="border text-center w-10 h-12 px-2">
                    <img
                      className=" w-full h-full object-cover mx-auto"
                      src={cartInfo?.photo}
                      alt=""
                    />
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {cartInfo?.courseName}
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {cartInfo?.name}
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {cartInfo?.course_qty}
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {cartInfo?.course_fee}
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {cartInfo?.total_course_fee}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
