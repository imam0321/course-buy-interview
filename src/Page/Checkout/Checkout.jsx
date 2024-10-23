import { useNavigate } from "react-router-dom";
import CartCount from "../Cart/CartCount";
import { CartContext } from "../../ContextAPIs/CartProvider";
import { useContext, useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, totalCost } = useContext(CartContext);
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    formNo: "",
    parentName: "",
    parentNumber: "",
    school: "",
    jobInfo: "",
    email: "",
    gender: "",
    presentAddress: "",
    permanentAddress: "",
    nid: "",
    mobile: "",
    guardianName: "",
    guardianPhone: "",
    dob: "",
    bloodGroup: "",
    photo: null, 
  });

  const { photo, discount_price } = cart[0]?.course || {};

  useEffect(() => {
    const generatedFormNo = Math.floor(100000 + Math.random() * 900000);
    setFormData((prevData) => ({
      ...prevData,
      formNo: generatedFormNo.toString(),
    }));
  }, []);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
    const cartInfo = {
      course_id: cart[0]?.id,
      admission_date: new Date(),
      name: formData.fullName,
      father_name: formData.parentName,
      father_phone_no: formData.parentNumber,
      school_collage_name: formData.school,
      job_title: formData.jobInfo,
      email: formData.email,
      gender: formData.gender,
      present_address: formData.presentAddress,
      permanent_address: formData.permanentAddress,
      nid_no: formData.nid,
      phone_no: formData.mobile,
      local_guardian_name: formData.guardianName,
      local_guardian_phone_no: formData.guardianPhone,
      date_of_birth: formData.dob,
      blood_group: formData.bloodGroup,
      course_fee: discount_price,
      course_qty: cart[0].quantity,
      total_course_fee: totalCost,
      discount_course_fee: discount_price * cart.length,
      sub_total_course_fee: totalCost - discount_price,
      photo,
      courseName: cart[0].course.course_name,
      user_id: 1,
      form_no: formData.formNo,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      id: 48,
    };
    Object.entries(cartInfo).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });
      try {
        await axiosInstance.post("/api/course-purchase", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/order-details", { state: { formData, cartInfo } });
        localStorage.removeItem("cart");
        toast.success("Admission added!");
      } catch (error) {
        console.error("Error submitting form", error);
        toast.error("Admission not added! Please try again!");
      }
  };

  return (
    <div className="  mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Trainee Information Section */}
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullName"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="formNo"
                className="block font-semibold text-base mb-2"
              >
                Form no:
              </label>
              <input
                type="text"
                id="formNo"
                required
                value={formData.formNo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2"
              >
                Father Name:
              </label>
              <input
                type="text"
                id="parentName"
                required
                value={formData.father_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2"
              >
                Father Phone:
              </label>
              <input
                type="text"
                id="parentNumber"
                required
                value={formData.parentNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2"
              >
                School/College:
              </label>
              <input
                type="text"
                id="school"
                required
                value={formData.school}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="jobInfo"
                className="block font-semibold text-base mb-2"
              >
                Job Information:
              </label>
              <input
                type="text"
                id="jobInfo"
                required
                value={formData.jobInfo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                id="gender"
                required
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2"
              >
                Present Address:
              </label>
              <textarea
                id="presentAddress"
                required
                value={formData.presentAddress}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <textarea
                id="permanentAddress"
                required
                value={formData.permanentAddress}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                type="text"
                id="nid"
                required
                value={formData.nid}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold text-base mb-2"
              >
                Mobile No:
              </label>
              <input
                type="text"
                id="mobile"
                required
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="guardianName"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian’s Name:
              </label>
              <input
                type="text"
                id="guardianName"
                required
                value={formData.guardianName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Guardian’s Phone:
              </label>
              <input
                type="text"
                id="guardianPhone"
                required
                value={formData.guardianPhone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                required
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>

              <select
                id="bloodGroup"
                required
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled selected>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
          <div>
              <label
                htmlFor="photo"
                className="block font-semibold text-base mb-2"
              >
                Student Photo:
              </label>
              <input
                type="file"
                id="photo"
                required
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
        </div>

        <div className="m-mt_16px">
          <div className="pt-p_16px">
            <div className="lg:flex items-start gap-3">
              <CartCount />
              <div className="lg:w-[41%] bg-white border-2 ">
                <div className="px-[30px]">
                  <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                    Cart Summary
                  </h2>
                  <div className="py-3 flex justify-between border-b border-gray-300">
                    <p className="text-black font-bold">
                      Total Price: {totalCost}
                    </p>
                    <p className="text-black font-bold"></p>
                  </div>

                  <button
                    type="submit"
                    className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
