import useCourses from "../../Hooks/useCourses";
import Loader from "../../Utils/Loader/Loader";
import Course from "./Course";
import { toast } from "react-toastify";

const Courses = () => {
  const [courses, loading] = useCourses();

  const handleAddToCart = (id) => {
    const course = courses.find((course) => course.id === id);

    if (!course) return;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const courseInCart = existingCart.find((item) => item.id === course.id);

    if (existingCart.length >= 1 && !courseInCart) {
      // console.log("Cannot add more than one course to the cart.");
      toast.error("Cannot add more than one course to the cart.");
      return;
    }

    if (!courseInCart) {
      const updatedCart = [
        ...existingCart,
        { course, id: course.id, quantity: 1 },
        
      ];
      toast.success("Course added to cart!");
      window.location.reload();
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Course added to cart:", course);
      
    } else {
      const updatedCart = existingCart.map((item) => {
        if (item.id === course.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Increased quantity for course in cart:", course);
      window.location.reload();
      toast.success("Increased quantity for course in cart!");
    }
  };

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Course
              key={course.id}
              course={course}
              handleAddToCart={handleAddToCart}
            ></Course>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
