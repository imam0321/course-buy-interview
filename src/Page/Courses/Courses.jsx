import useCourses from "../../Hooks/useCourses";
import Loader from "../../Utils/Loader/Loader";
import Course from "./Course";
import { toast } from "react-toastify";
import { useContext } from 'react';
import { CartContext } from "../../ContextAPIs/CartProvider";

const Courses = () => {
  const [courses, loading] = useCourses();
  const { setCart } = useContext(CartContext);

  const handleAddToCart = (id) => {
    const course = courses.find((course) => course.id === id);

    if (!course) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const courseInCart = cart.find((item) => item.id === course.id);

    if (cart.length >= 1 && !courseInCart) {
      // console.log("Cannot add more than one course to the cart.");
      toast.error("Cannot add more than one course to the cart.");
      return;
    }

    if (!courseInCart) {
      const updatedCart = [
        ...cart,
        { course, id: course.id, quantity: 1 },
        
      ];
      setCart(updatedCart);
      toast.success("Course added to cart!");
      // window.location.reload();
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Course added to cart:", course);
      
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === course.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      console.log("Increased quantity for course in cart:", course);
      // window.location.reload();
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
