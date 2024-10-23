const Course = ({ course, handleAddToCart }) => {
  const {
    id,
    course_name,
    trainer_data,
    photo,
    regular_price,
    discount_price,
  } = course;
  const discountPercentage = Math.round(
    ((regular_price - discount_price) / regular_price) * 100
  );

  return (
    <div className="m-mt_16px">
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden h-[100%]">
        <div className="relative">
          <img
            src={photo}
            alt={course_name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-gray-800 text-lg font-semibold mb-2">
            {course_name}
          </h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-md font-bold">
              {trainer_data.name}
            </span>
          </div>
          <hr />
          <p className="line-through text-gray-400 text-sm mt-2">
            Price: {regular_price}
          </p>
          <div className="mt-1 flex justify-between items-center">
            <span className="text-green-600 text-md font-bold">
              Discount: {discountPercentage}%
            </span>
            <span className="text-black text-md font-bold ml-2">
              Discount price: {discount_price}
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleAddToCart(id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
